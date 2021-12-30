import { useEffect, useState } from "react";
import API from "../../server/api";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image, Tabs } from "antd-mobile";
import { localStorage } from "../../utils/storage";
import { PLAYING_SONG_LIST_KEY } from "../../constants/key";
import { PlayOutline } from "antd-mobile-icons";

export default function Radio() {
  const [radioList, setRadioList] = useState([]);

  useEffect(() => {
    API.GetRadioCaregory().then((res) => {
      setRadioList(res.data.filter((v: any) => v.list.length));
    });
  }, []);

  function onGoRadioSongList(id: number) {
    API.GetRadioSong({ id }).then((res) => {
      if (res.data?.tracks?.length) {
        localStorage.setItem(PLAYING_SONG_LIST_KEY, res.data?.tracks);
      }
    });
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <Tabs
        style={{
          "--title-font-size": "13px",
        }}
        defaultActiveKey="48"
      >
        {radioList.map((tab: any) => (
          <Tabs.Tab title={tab.title} key={tab.id}>
            <View style={styles.radioList}>
              {tab.list.slice(0).map((radio: any) => (
                <TouchableOpacity
                  key={radio.id}
                  style={styles.radioItem}
                  onPress={() => onGoRadioSongList(radio.id)}
                >
                  <View style={{ position: "relative" }}>
                    <Image
                      src={radio.pic_url}
                      width={100}
                      height={100}
                      style={{ borderRadius: 100 }}
                    />
                    <View style={styles.radioIcon}>
                      <PlayOutline fontSize={30} color="#fff" />
                    </View>
                  </View>
                  <Text style={styles.radioText}>{radio.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Tabs.Tab>
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  radioList: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  radioItem: {
    width: 100,
    marginBottom: 20,
  },
  radioIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -15,
    marginTop: -15,
  },
  radioText: {
    marginTop: 10,
    textAlign: "center",
  },
});
