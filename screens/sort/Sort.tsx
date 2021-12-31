import { Tabs } from "antd-mobile";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import API from "../../server/api";
import { navlist } from "./constants";
import { Image } from "antd-mobile";
import { useNavigation } from "@react-navigation/native";

export default function Sort() {
  const [songListId, setSongListId] = useState(133);
  const [songLists, setSongLists] = useState([]);
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const itemWidth = (width - 54) / 3;

  const getSongListApi = async (id = songListId) => {
    const res = await API.GetSongList({ category: id });
    const list = res.data.list;
    list.length -= list.length % 3;
    setSongLists(list);
  };

  useEffect(() => {
    getSongListApi();
  }, []);

  function onChangeTab(id: string) {
    setSongListId(Number(id));
    getSongListApi(Number(id));
  }

  function onGoSongList(item: any) {
    navigation.navigate("SongListPage", {
      id: item.dissid,
      title: item.dissname,
      imgUrl: item.imgurl,
      subTitle: item.creator.name,
      message: "播放量：" + item.listennum,
    } as any);
  }

  return (
    <Tabs
      style={{
        "--title-font-size": "13px",
        backgroundColor: "#fff",
      }}
      onChange={onChangeTab}
    >
      {navlist.map((nav) => (
        <Tabs.Tab title={nav.title} key={nav.id}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {songLists.map((item: any) => (
              <TouchableOpacity
                onPress={() => onGoSongList(item)}
                style={{ width: itemWidth }}
                key={item.dissid}
              >
                <Image
                  src={item.imgurl}
                  width={itemWidth}
                  height={itemWidth}
                  style={{ borderRadius: 10 }}
                ></Image>
                <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 10 }}>
                  {item.dissname}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}
