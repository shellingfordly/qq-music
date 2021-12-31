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
import { LinearGradient } from "expo-linear-gradient";
import PlayingSongList from "./components/PlayingList";
import SoundProgressBar from "./components/SoundProgressBar";
import Background from "../../components/Background";

export default function Song({ route }: any) {
  const [playingSong, setPlayingSong] = useState<any>(route.params);
  const [songUrl, setSongUrl] = useState("");
  const { lyrics } = useLyric(playingSong);
  const audioEle = useRef<any>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [hasSound, setHasSound] = useState(true);
  const [soundPercent, setSoundPercent] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [playPercent, setPlayPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  // 初始化Audio
  useEffect(() => {
    audioEle.current.volume = soundPercent / 100;
    audioEle.current.ontimeupdate = function () {
      const newCurrentTime = audioEle.current.currentTime;
      setCurrentTime(newCurrentTime);
      setPlayPercent((newCurrentTime / audioEle.current.duration) * 100);
    };
  }, []);

  // 获取播放url
  useEffect(() => {
    API.GetSongPlayUrl({ id: playingSong.mid }).then((res) => {
      if (res.data) {
        setSongUrl(res.data[playingSong.mid]);
      }
    });
  }, [playingSong]);

  const lyricColorStyle = (lyric: [number, number, string | null]) => {
    const hasColor = lyric[0] < currentTime && currentTime < lyric[1];
    return {
      color: hasColor ? themeColor.primary : "",
      marginBottom: 10,
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

  function onMoveDistance(distance: number) {
    setSoundPercent(distance);
    audioEle.current.volume = distance / 100;
  }

  return (
    <>
      <Background />
      <View style={styles.container}>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{playingSong.title}</Text>
          <Text style={styles.singerName}>{playingSong.singerName}</Text>
          {playingSong.cover && (
            <View style={styles.songImg}>
              <Image width={200} height={200} src={playingSong.cover}></Image>
            </View>
          )}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.lyricBox}
        >
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
            <SoundProgressBar
              isMove={hasSound}
              soundPercent={soundPercent}
              onMoveDistance={onMoveDistance}
            ></SoundProgressBar>
          </View>
          <TouchableOpacity
            style={styles.playList}
            onPress={() => setVisible(true)}
          >
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
      <PlayingSongList
        visible={visible}
        setVisible={setVisible}
        playingSong={playingSong}
        setPlayingSong={setPlayingSong}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  songImg: {
    width: 200,
    height: 200,
    margin: "20px auto",
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#eee",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  lyricBox: {
    height: "40vh",
    paddingBottom: 20,
    overflow: "scroll",
    textAlign: "center",
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
    position: "relative",
    width: 80,
    marginLeft: 8,
  },
  tounchBar: {
    position: "absolute",
    top: -3,
    left: 0,
    marginLeft: -5,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: themeColor.primary,
  },
  playList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
});
