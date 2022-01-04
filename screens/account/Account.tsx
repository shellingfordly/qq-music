import { Image } from "antd-mobile";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import API from "../../server/api";
import { UserOutline, RightOutline } from "antd-mobile-icons";
import { useNavigation } from "@react-navigation/core";
import SetCookie from "./SetCookie";
import { localStorage } from "../../utils/storage";
import { ACCOUNT_KEY, COOKIE_KEY } from "../../constants/key";

export function parseCookie(cookie: string) {
  let account = "";
  cookie.replace(/uin=(\d+)/g, (coo, acc) => {
    account = acc;
    return coo;
  });
  return account;
}

export default function Account() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [userCreateSongList, setUserCreateSongList] = useState<any[]>([]);
  const [userCollectSongList, setUserCollectSongList] = useState<any[]>([]);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getAccountInfo();
  }, []);

  async function getAccountInfo() {
    const cookie: string = await localStorage.getItem(COOKIE_KEY);
    const id = parseCookie(cookie) || (await localStorage.getItem(ACCOUNT_KEY));
    if (!id) {
      setUserInfo({});
      setUserCreateSongList([]);
      setUserCollectSongList([]);
      return;
    }
    API.GetUserCreateSongList({ id }).then((res) => {
      const list = res.data.list;
      list.shift();
      setUserInfo(res.data?.creator || {});
      setUserCreateSongList(list);
    });
    API.GetUserCollectSongList({ id }).then((res) => {
      setUserCollectSongList(res.data.list);
    });
    API.GetUserInfo({ id }).then((res) => {
      setUserInfo((oldInfo: any) => ({
        ...oldInfo,
        bgUrl: res?.data?.creator?.backpic.picurl,
        headUrl: res?.data?.creator?.headpic,
      }));
    });
  }

  async function onGoSongList(song: any) {
    navigation.navigate("SongListPage", {
      id: song.tid || song.dissid,
      title: song.diss_name || song.dissname,
      imgUrl: song.diss_cover || song.logo,
      subTitle: song.nickname || userInfo.hostname,
      message: `播放量：${song.listen_num || song.listennum}`,
    } as any);
  }

  function setAccount(acount: string) {
    if (acount) {
      getAccountInfo();
    } else {
      setUserInfo({});
      setUserCreateSongList([]);
      setUserCollectSongList([]);
    }
  }

  return (
    <View style={styles.container}>
      <SetCookie
        visible={visible}
        setVisible={setVisible}
        setAccount={setAccount}
      />
      <View style={styles.topBox}>
        <Image
          style={styles.topBg}
          src={userInfo.bgUrl || require("../../assets/images/account-bg.jpg")}
        />
        <View style={styles.topContent}>
          <TouchableOpacity
            style={styles.userHead}
            onPress={() => setVisible(true)}
          >
            {!userInfo.headUrl && <UserOutline fontSize={50} />}
            {userInfo.headUrl && (
              <Image
                width={80}
                height={80}
                style={{ borderRadius: 100 }}
                src={userInfo.headUrl}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.userName}>{userInfo.hostname}</Text>
        </View>
      </View>
      <ScrollView style={styles.songListBox}>
        {[
          ["我的歌单", userCreateSongList],
          ["收藏歌单", userCollectSongList],
        ].map(([title, list]: any) => (
          <View style={{ marginBottom: 20 }} key={title}>
            <Text style={styles.songListTitle}>
              {title} {list.length}
            </Text>
            {list.map((song: any) => (
              <TouchableOpacity
                style={styles.songListItem}
                key={song.tid || song.dissid}
                onPress={() => onGoSongList(song)}
              >
                <View style={styles.itemInfo}>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={60}
                    height={60}
                    src={song.diss_cover || song.logo}
                  />
                  <View style={styles.infoBox}>
                    <Text style={styles.songName}>
                      {song.diss_name || song.dissname}
                    </Text>
                    <Text style={styles.songCount}>
                      <Text style={{ marginRight: 5 }}>
                        {song.song_cnt || song.songnum}首
                      </Text>
                      <Text>{song.listen_num || song.listennum}次播放</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.iconBox}>
                  <RightOutline fontSize={18} style={{ color: "#666" }} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    position: "relative",
    height: "30%",
  },
  topBg: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
  },
  topContent: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  userHead: {
    backgroundColor: "#ddd",
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  songListBox: {
    height: "70%",
    padding: 20,
  },
  songListTitle: {
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  songListItem: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  itemInfo: {
    flexDirection: "row",
    flex: 1,
  },
  infoBox: {
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  songName: {
    fontSize: 14,
    marginBottom: 5,
  },
  songCount: {
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 12,
    color: "#666",
  },
  iconBox: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
