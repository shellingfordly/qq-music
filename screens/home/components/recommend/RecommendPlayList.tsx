import { useContext, useState } from "react";
import { Button, Space } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SearchContext } from "../../hooks/useContext";
import useFetch from "./hooks/usefetch";
import Banner from "./components/Banner";
import PlayList from "./components/PlayList";
import { navList } from "./constants";
import { themeColor } from "../../../../utils/style";
import { RootStackParamList } from "../../../../types";

export default function RecommendPlayList({}) {
  const navigation = useNavigation();
  const { setIsShowSearch } = useContext(SearchContext);
  const { playListData } = useFetch();

  async function itemTouchEnd(item: any) {
    try {
      navigation.navigate("SongListPage", {
        id: item.tid || item.content_id,
        title: item.title,
        imgUrl: item.cover || item.cover_url_big,
        subTitle: item.username || item.creator_info?.nick,
        message: "播放量：" + (item.access_num || item.listen_num),
      } as any);
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
