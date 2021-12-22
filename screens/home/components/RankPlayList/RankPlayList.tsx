import { View, Text } from "../../../../components/Themed";
import { StyleSheet } from "react-native";
import { useFetch } from "./useFetch";

export default function RankPlayList() {
  const { allRankList, topRanckMap, recommendRanckList } = useFetch();
  console.log(topRanckMap);

  return (
    <View style={styles.container}>
      {Object.values(topRanckMap).map((item) => (
        <View style={styles.item}>
          <View style={styles.desc}>
            <Text style={styles.label}>{item.label}</Text>
            {item.list &&
              item.list.slice(0, 3).map((song: any, index: number) => (
                <View style={styles.song}>
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
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    overflow: "scroll",
    padding: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#999",
    shadowOpacity: 5,
    shadowRadius: 2,
  },
  desc: {
    padding: 10,
  },
  itemBox: {
    position: "relative",
    width: 100,
    height: 100,
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
