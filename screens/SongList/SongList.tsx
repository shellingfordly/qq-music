import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Button } from "antd-mobile";
import { PlayOutline } from "antd-mobile-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import API from "../../server/api";
import { handleSingerName } from "../../utils/song";

enum SongListType {
  Rank = "Rank",
  Sort = "Sort",
  Recommend = "Recommend",
}

interface SongListInfo {
  id: number;
  title: string;
  imgUrl: string;
  subTitle: string;
  message: string;
  type?: SongListType;
}

export default function SongListPage({ route }: any) {
  const navigation = useNavigation();
  const songListInfo: SongListInfo = route.params;
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (songListInfo.type === SongListType.Rank) {
      API.TopRankDetails({ id: songListInfo.id }).then((res) => {
        setData({
          ...res.data,
          songlist: res.data.list,
        });
      });
    } else {
      API.GetSongListDetails({
        id: songListInfo.id,
      }).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  function goSongPage(song: any) {
    navigation.navigate("Song", {
      title: song.songname,
      cover: song.cover,
      singerName: handleSingerName(song.singer),
      mid: song.mid || song.songmid,
    } as any);
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.imgBox}>
          <Image src={songListInfo.imgUrl} width={165} height={165} />
        </View>
        <Text style={styles.label}>{songListInfo.title}</Text>
        <Text style={styles.titleDetail}>{songListInfo.subTitle}</Text>
        <Text style={[styles.update]}>{songListInfo.message}</Text>
        <View style={styles.playBtn}>
          <Button color="primary">
            <PlayOutline />
          </Button>
        </View>
      </View>
      <View style={styles.songList}>
        <Text style={styles.listTitle}>
          歌单 共{data?.songnum || data?.total}首
        </Text>
        {data?.songlist &&
          data?.songlist.map((item: any, i: number) => (
            <TouchableOpacity
              style={styles.songBox}
              key={item.songid}
              onPress={() => goSongPage(item)}
            >
              {songListInfo.type === SongListType.Rank && (
                <Text style={styles.songIndex}>{i + 1}</Text>
              )}
              <View>
                <Text style={styles.songTitle}>
                  {item.songname || item.title}
                </Text>
                <Text style={styles.singerName}>
                  {handleSingerName(item.singer)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  infoBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  imgBox: {
    margin: "auto",
    width: 165,
    height: 165,
    borderRadius: 10,
    textShadowColor: "#ddd",
    shadowRadius: 10,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    overflow: "hidden",
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 35,
    fontWeight: "400",
  },
  titleDetail: {
    lineHeight: 35,
    fontSize: 14,
    fontWeight: "400",
  },
  update: {
    lineHeight: 35,
    marginBottom: 10,
    color: "grey",
  },
  playBtn: {
    width: 170,
    margin: "auto",
    borderRadius: 20,
    overflow: "hidden",
  },
  songList: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 12,
    color: "grey",
    marginBottom: 15,
  },
  songBox: {
    flexDirection: "row",
    marginBottom: 20,
  },
  songIndex: {
    color: "#f56273",
    textAlign: "center",
    lineHeight: 25,
    marginRight: 10,
  },
  rankValue: {
    color: "grey",
    fontSize: 5,
  },
  songTitle: { fontSize: 16 },
  singerName: {
    color: "rgba(0,0,0,.4)",
    fontSize: 12,
  },
});
