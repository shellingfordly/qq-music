import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Image } from "antd-mobile";
import { themeColor } from "../utils/style";

export interface PlayListProps {
  title: string;
  playList: any[];
}

export default function PlayList({ data }: { data: PlayListProps }) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.playContainer}>
        {data.playList.map((item, index) => (
          <View style={styles.playItem}>
            <View style={styles.playImg}>
              <Image
                src={item.cover || item.cover_url_big}
                width={100}
                height={100}
                style={{ borderRadius: 10 }}
              />
              <Text style={styles.playNum}>
                {(item.listen_num / 10000).toFixed(1)}万
              </Text>
            </View>
            <Text style={styles.playTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  playContainer: {
    flexDirection: "row",
    overflow: "scroll",
    paddingBottom: 3,
  },
  playItem: {
    width: 100,
    overflow: "hidden",
    marginRight: 10,
  },
  playImg: {
    position: "relative",
  },
  playNum: {
    position: "absolute",
    bottom: 5,
    right: 5,
    color: "white",
  },
  playTitle: {
    fontSize: 12,
    color: "#666",
    lineHeight: 20,
    marginTop: 5,
  },
});
