import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import API from "../../server/api";
import { Image, ProgressBar, Toast } from "antd-mobile";
import {
  PlayOutline,
  HeartOutline,
  SoundOutline,
  SoundMuteOutline,
  UnorderedListOutline,
} from "antd-mobile-icons";
import { PauseIcon } from "../../components/icons/PauseIcon";
import { themeColor } from "../../utils/style";
import useLyric from "./hooks/useLyric";

export default function Song({ route }: any) {
  const songInfo = route.params;
  const [songUrl, setSongUrl] = useState(
    "http://isure.stream.qqmusic.qq.com/C4000004Uiq84QArne.m4a?guid=2796982635&vkey=CB371A2DE23DBF86AEB87A43D71897A2CFD1CF2AF5A0E04F7DF590D124DC491AC62BCAFDD9AE524A5AA68497F9A6A97729F82EE99D7A129E&uin=1418504249&fromtag=66"
  );
  const { lyrics } = useLyric(songInfo.mid);
  const audioEle = useRef<any>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [hasSound, setHasSound] = useState(true);
  const [soundPercent, setSoundPercent] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [playPercent, setPlayPercent] = useState(0);

  useEffect(() => {
    audioEle.current.volume = soundPercent / 100;
    audioEle.current.ontimeupdate = function () {
      const newCurrentTime = audioEle.current.currentTime;
      setCurrentTime(newCurrentTime);
      setPlayPercent((newCurrentTime / audioEle.current.duration) * 100);
    };
    API.GetSongPlayUrl({ id: songInfo.mid }).then((res) => {
      setSongUrl(res.data);
    });
    return () => {};
  }, []);

  const lyricColorStyle = (lyric: [number, number, string | null]) => {
    const hasColor = lyric[0] < currentTime && currentTime < lyric[1];
    return {
      color: hasColor ? themeColor.primary : "",
    };
  };

  async function onPlay() {
    if (!songUrl) {
      Toast.show({
        icon: "fail",
        content: "播放链接获取失败，请尝试刷新重试。",
      });
      return;
    }
    if (audioEle.current && !isPlay) {
      audioEle.current.play();
      setIsPlay(true);
    } else {
      audioEle.current.pause();
      setIsPlay(false);
    }
  }

  function onHandleSound() {
    setHasSound(!hasSound);
    audioEle.current.muted = hasSound;
    setSoundPercent(0);
    audioEle.current.volume = 0;
  }

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
        {lyrics.map((lyric) => (
          <Text style={lyricColorStyle(lyric)} key={lyric[1]}>
            {lyric[2]}
          </Text>
        ))}
      </ScrollView>
      <ProgressBar
        percent={playPercent}
        style={{
          "--fill-color": themeColor.primary,
        }}
      />
      <View style={styles.toolsBox}>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.btn} onPress={onPlay}>
            {isPlay && <PauseIcon />}
            {!isPlay && <PlayOutline fontSize={20} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { marginLeft: 20 }]}>
            <HeartOutline fontSize={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sound} onPress={onHandleSound}>
            {hasSound && <SoundOutline fontSize={23} />}
            {!hasSound && <SoundMuteOutline fontSize={23} />}
          </TouchableOpacity>
          <View style={styles.progressBarBox}>
            <ProgressBar
              percent={soundPercent}
              style={{
                "--fill-color": hasSound ? themeColor.primary : "#ccc",
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.playList}>
          <UnorderedListOutline fontSize={20} />
        </TouchableOpacity>
      </View>
      <audio
        style={{ display: "none" }}
        ref={audioEle}
        src={songUrl}
        controls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  toolsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    border: "1px solid rgba(0,0,0,.2)",
    borderRadius: 100,
  },
  sound: {
    marginLeft: 20,
  },
  progressBarBox: {
    width: 80,
    marginLeft: 8,
  },
  playList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
});
