import { useContext, useState } from "react";
import { getSongListDetails } from "../../../../server/api";
import { Button, Space } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import { useLocalStore } from "mobx-react";
import { songStore } from "../../../../store/modules/songList";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SearchContext } from "../../hooks/useContext";
import { handleSingerName } from "../../../../utils/song";
import useFetch from "./hooks/usefetch";
import Banner from "./components/Banner";
import PlayList from "./components/PlayList";
import { navList } from "./constants";
import { themeColor } from "../../../../utils/style";
import { RootStackParamList } from "../../../../types";

export default function RecommendPlayList({}) {
  const store = useLocalStore(() => songStore);
  const navigation = useNavigation();
  const { setIsShowSearch } = useContext(SearchContext);
  const { playListData } = useFetch();

  async function itemTouchEnd(item: any) {
    try {
      const { data: song } = await getSongListDetails({
        id: item.content_id || item.tid,
      });
      store.setTheSongListInfo({
        ...item,
        isRank: false,
        imgUrl: item.cover || item.cover_url_big,
        textOne: item.title,
        textTwo: song.nickname,
        textThree: `播放量：${item.listen_num || item.access_num}`,
        textTotal: `歌单 共${song.songnum}首`,
        list: song.songlist.map((v: any) => ({
          ...v,
          id: v.albumid,
          title: v.songname,
          singerName: handleSingerName(v.singer),
        })),
      });
      navigation.navigate("SongList");
    } catch (error) {}
  }

  function goSearch() {
    setIsShowSearch(true);
  }

  function onGoSortSongList(pathName: keyof RootStackParamList) {
    navigation.navigate(pathName);
  }

  return (
    <>
      <View
        style={{
          padding: 20,
        }}
      >
        <Button shape="rounded" onClick={goSearch}>
          <Space>
            <SearchOutline />
            <span>搜索</span>
          </Space>
        </Button>
      </View>
      <Banner />
      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {navList.map((nav, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onGoSortSongList(nav.pathName)}
            >
              <nav.icon style={{ fill: themeColor.primary }} />
              <Text style={{ textAlign: "center" }}>{nav.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {playListData.map((data) => (
          <PlayList key={data.title} data={data} itemTouchEnd={itemTouchEnd} />
        ))}
      </View>
    </>
  );
}
