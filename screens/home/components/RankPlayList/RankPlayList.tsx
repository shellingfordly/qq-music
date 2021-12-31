import {
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "./useFetch";
import { View, Text } from "../../../../components/Themed";
import React from "react";

export default function RankPlayList() {
  const navigation = useNavigation();
  const { topRanckMap } = useFetch();

  function onPress(song: any) {
    navigation.navigate("SongListPage", {
      id: song.topId,
      imgUrl: song.picUrl,
      title: song.info.title,
      subTitle: song.info.titleDetail,
      message: "更新时间：" + song.period,
      type: "Rank",
    } as any);
  }

  return (
    <ScrollView style={styles.container}>
      {Object.values(topRanckMap).map((item) => (
        <TouchableOpacity
          style={styles.item}
          key={item.id}
          onPress={() => onPress(item)}
        >
          <View style={styles.desc}>
            <Text style={styles.label}>{item.label}</Text>
            {item.list &&
              item.list.slice(0, 3).map((song: any, index: number) => (
                <View style={styles.song} key={song.id}>
                  <Text style={styles.index}>{index + 1}.</Text>
                  <Text style={styles.songTitle}>{song.title}-</Text>
                  <Text style={styles.singerName}>{song.singerName}</Text>
                </View>
              ))}
          </View>
          <View style={styles.itemBox}>
            <img
              src={item.picUrl}
              width={180}
              style={{
                position: "absolute",
                top: -40,
                left: -40,
              }}
            />
            <Text style={styles.listenNum}>
              {(item.listenNum / 10000).toFixed(1)}万
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    overflow: "scroll",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "white",
  },
  desc: {
    padding: 10,
    flex: 1,
  },
  itemBox: {
    position: "relative",
    width: 100,
    overflow: "hidden",
  },
  listenNum: {
    position: "absolute",
    bottom: 5,
    right: 5,
    color: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  song: {
    flexDirection: "row",
    marginTop: 5,
  },
  index: {
    fontWeight: "600",
    fontSize: 12,
  },
  songTitle: {
    fontSize: 12,
  },

  singerName: {
    color: "#999",
    fontSize: 12,
  },
});
