import { useContext, useEffect, useState } from "react";
import { ApiUrl, getPlayList, getSongListDetails } from "../../../server/api";
import PlayList from "../../../components/PlayList";
import type { PlayListProps } from "../../../components/PlayList";
import { Button, Space } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import { useLocalStore } from "mobx-react";
import { songStore } from "../../../store/modules/songList";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { SearchContext } from "../hooks/useContext";

export default function RecommendPlayList({}) {
  const [playListData, setPlayListData] = useState<PlayListProps[]>([]);
  const store = useLocalStore(() => songStore);
  const navigation = useNavigation();

  const { setIsShowSearch } = useContext(SearchContext);

  useEffect(() => {
    Promise.all([
      getPlayList(ApiUrl.CategoryRecommend),
      getPlayList(ApiUrl.ForYouRecommend),
    ]).then((res) => {
      setPlayListData([
        {
          title: "官方歌单",
          playList: res[0].data.list,
        },
        {
          title: "达人歌单",
          playList: res[1].data.list,
        },
      ]);
    });
  }, []);

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
          id: v.albumid,
          title: v.songname,
          singerName: v.singer.reduce((p: any, n: any) => p + n.name + " ", ""),
        })),
      });
      navigation.navigate("SongPage");
    } catch (error) {}
  }

  function goSearch() {
    setIsShowSearch(true);
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
      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        {playListData.map((data) => (
          <PlayList key={data.title} data={data} itemTouchEnd={itemTouchEnd} />
        ))}
      </View>
    </>
  );
}
