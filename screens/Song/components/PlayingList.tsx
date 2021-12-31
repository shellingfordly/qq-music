import { Popup } from "antd-mobile";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { PLAYING_lIST_KEY } from "../../../constants/key";
import { localStorage } from "../../../utils/storage";

interface PlayingListItem {
  mid: string;
  singerName: string;
  title: string;
}

export default function PlayingSongList({
  visible,
  setVisible,
  playingSong,
  setPlayingSong,
}: any) {
  const [playingList, setPlayingList] = useState<PlayingListItem[]>([]);

  useEffect(() => {
    getLocalPlayingList();
  }, [playingSong]);

  async function getLocalPlayingList() {
    const list = await localStorage.getItem(PLAYING_lIST_KEY);
    let data: any[] = [];
    if (Array.isArray(list)) {
      const item = list.find((v) => v.mid === playingSong.mid);
      data = list.concat(item ? [] : [playingSong]);
    } else {
      data = [playingSong];
    }
    setPlayingList(data);
    localStorage.setItem(PLAYING_lIST_KEY, data);
  }

  function removePlayingSong(item: PlayingListItem) {
    const list = playingList.filter((v) => v.mid !== item.mid);
    setPlayingList(list);
    localStorage.setItem(PLAYING_lIST_KEY, list);
  }

  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        height: "60vh",
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {playingList.map((item) => (
          <View key={item.mid} style={styles.item}>
            <TouchableOpacity
              style={styles.song}
              key={item.mid}
              onPress={() => setPlayingSong(item)}
            >
              <Text style={styles.title}>{item?.title || ""}</Text>
              <Text style={styles.line}>-</Text>
              <Text style={styles.singer}>{item?.singerName || ""}</Text>
            </TouchableOpacity>
            <AntDesign
              onPress={() => removePlayingSong(item)}
              name="close"
              size={16}
              color="#999"
            />
          </View>
        ))}
      </ScrollView>
    </Popup>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    height: "60vh",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  song: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: { color: "#fff", fontSize: 16 },
  line: {
    marginLeft: 10,
    marginRight: 10,
    color: "#999",
  },
  singer: {
    color: "#999",
    fontSize: 12,
    lineHeight: 22,
  },
});
