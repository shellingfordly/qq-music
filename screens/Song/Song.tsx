import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { getSongLyric, getSongPlayUrl } from "../../server/api";
import { songStore } from "../../store/modules/songList";
import { Image } from "antd-mobile";
import { useLocalStore } from "mobx-react";
import { PlayOutline, HeartOutline } from "antd-mobile-icons";

const songUrl =
  "http://isure.stream.qqmusic.qq.com/C4000004Uiq84QArne.m4a?guid=2796982635&vkey=FE7ABBC79965C92F0C1402E19EBFE3395CC9A6B9EF4907A8568EF47A47C4C90AC0591D0FBCE4769529508662EC97EE4B21E48C86DCE78344&uin=1418504249&fromtag=66";

function play() {}

export default function Song() {
  const { songInfo } = useLocalStore(() => songStore);
  const [songUrl, setSongUrl] = useState("");
  const [lyric, setLyric] = useState("");

  useEffect(() => {
    console.log(songInfo);

    if (songInfo.mid) {
      getSongLyric({ songmid: songInfo.mid }).then((res) => {
        setLyric(res.data.lyric);
      });
      getSongPlayUrl({ id: songInfo.mid }).then((res) => {
        setSongUrl(res.data);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{songInfo.title}</Text>
        <Text style={styles.singerName}>{songInfo.singerName}</Text>
        {songInfo.cover && (
          <View style={styles.songImg}>
            <Image width={200} height={200} src={songInfo.cover}></Image>
          </View>
        )}
      </View>
      <ScrollView style={styles.lyricBox}>
        <Text>{lyric}</Text>
      </ScrollView>
      <View style={styles.btnBox}>
        <View style={styles.btn} onTouchEnd={play}>
          <PlayOutline fontSize={20} />
        </View>
        <View style={styles.btn}>
          <HeartOutline fontSize={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    backgroundColor: "rgb(250, 250, 250)",
  },
  songInfo: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  singerName: {
    textAlign: "center",
    marginBottom: 20,
  },
  songImg: {
    width: 200,
    height: 200,
    margin: "auto",
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#eee",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  lyricBox: {
    height: "40vh",
    overflow: "scroll",
    textAlign: "center",
    backgroundColor: "white",
  },
  btnBox: {
    width: "28%",
    height: 70,
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btn: {
    width: 30,
    height: 30,
    border: "1px solid rgba(0,0,0,.2)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
