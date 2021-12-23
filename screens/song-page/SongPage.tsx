import { useLocalStore } from "mobx-react";
import { View, Text, StyleSheet } from "react-native";
import { Image, Button } from "antd-mobile";
import { songStore } from "../../store/modules/songList";
import { PlayOutline } from "antd-mobile-icons";

export default function SongPage({ route }: any) {
  const { theSongListInfo: data } = useLocalStore(() => songStore);

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.imgBox}>
          <Image src={data.imgUrl} width={165} height={165} />
        </View>
        <Text style={styles.label}>{data.textOne}</Text>
        <Text style={styles.titleDetail}>{data.textTwo}</Text>
        <Text style={[styles.update]}>{data.textThree}</Text>
        <View style={styles.playBtn}>
          <Button color="primary">
            <PlayOutline />
          </Button>
        </View>
      </View>
      <View style={styles.songList}>
        <Text style={styles.listTitle}>{data.textTotal}</Text>
        {data.list.map((item: any, i: number) => (
          <View style={styles.songBox} key={item.id}>
            {data.isRank && <Text style={styles.songIndex}>{i + 1}</Text>}
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.singerName}>{item.singerName}</Text>
            </View>
          </View>
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
