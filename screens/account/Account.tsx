import { Image } from "antd-mobile";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getSongListDetails, getUserCreateSongList } from "../../server/api";
import { UserOutline, RightOutline } from "antd-mobile-icons";
import { useLocalStore } from "mobx-react-lite";
import { songStore } from "../../store/modules/songList";
import { useNavigation } from "@react-navigation/core";
import { handleSingerName } from "../../utils/song";


export default function Account() {
  const [userInfo, setUserInfo] = useState<any>({})
  const [userCreateSongList, setUserCreateSongList] = useState<any[]>([])
  const store = useLocalStore(() => songStore);
  const navigation = useNavigation();

  useEffect(() => {
    getUserCreateSongList({
      id: '1418504249'
    }).then(res => {
      const list = res.data.list
      list.shift()
      setUserInfo(res.data.creator)
      setUserCreateSongList(list)
    })
  }, [])

  async function onGoSongList(id: number) {
    const { data } = await getSongListDetails({ id })
    store.setTheSongListInfo({
      ...data,
      imgUrl: data.logo,
      isRank: false,
      textOne: data.dissname,
      textTwo: data.nickname,
      textThree: `播放量：${data.visitnum}`,
      textTotal: `歌单 共${data.cur_song_num}首`,
      list: data.songlist.map((v: any) => ({
        ...v,
        id: v.albumid,
        title: v.songname,
        singerName: handleSingerName(v.singer),
      })),
    })
    navigation.navigate("SongList");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.topContent}>
          <View style={styles.userHead}>
            <UserOutline fontSize={50} />
          </View>
          <Text style={styles.userName}>{userInfo.hostname}</Text>
        </View>
      </View>
      <ScrollView style={styles.songListBox}>
        <Text style={styles.songListTitle}>歌单{userCreateSongList.length}</Text>
        {userCreateSongList.map(song => (
          <TouchableOpacity style={styles.songListItem} key={song.tid} onPress={() => onGoSongList(song.tid)}>
            <Image style={{ borderRadius: 10 }} width={60} height={60} src={song.diss_cover} />
            <View style={styles.infoBox}>
              <Text style={styles.songName}>{song.diss_name}</Text>
              <Text style={styles.songCount}>
                <Text style={{ marginRight: 5 }}>{song.song_cnt}首</Text>
                <Text>{song.listen_num}次播放</Text>
              </Text>
            </View>
            <View style={styles.iconBox}>
              <RightOutline fontSize={18} style={{ color: '#666' }} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBox: {
    position: 'relative',
    height: '30%',
    padding: 20,
    backgroundColor: '#aaa'
  },
  topContent: {
    position: 'absolute',
    bottom: 20
  },
  userHead: {
    backgroundColor: '#ddd',
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  },
  songListBox: {
    height: '70%',
    padding: 20,
  },
  songListTitle: {
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '600'
  },
  songListItem: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
  },
  songName: {
    fontSize: 14,
    marginBottom: 5
  },
  songCount: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 12,
    color: '#666'
  },
  iconBox: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -10
  }
})