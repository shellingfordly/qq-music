import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "antd-mobile";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../hooks/useContext";
import API from "../../../server/api";
import { DeleteOutline } from "antd-mobile-icons";
import { useNavigation } from "@react-navigation/native";
import { handleSingerName } from "../../../utils/song";

export default function Search() {
  const { setIsShowSearch } = useContext(SearchContext);
  const [hotWords, setHotWords] = useState<{ k: string; n: number }[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [isShowHotSearch, setIsShowHotSearch] = useState(true);
  const [searchHistory, setSearchHistore] = useState<string[]>([]);
  const navigation = useNavigation();

  function getSearchHistory(): any[] {
    const data = localStorage.getItem("SearchHistory");

    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  useEffect(() => {
    try {
      API.HotSearch().then((res) => {
        setHotWords(res.data);
      });
    } catch (error) {}
    setSearchHistore(getSearchHistory());
  }, []);

  function onCancel() {
    setTimeout(() => {
      // 显示热门搜索
      setIsShowHotSearch(true);
      setSearchKey("");
      // 隐藏搜索组件
      setIsShowSearch(false);
    });
  }

  function onClear() {
    setSearchKey("");
    setIsShowHotSearch(true);
  }

  function onDeleteHistory() {
    localStorage.removeItem("SearchHistory");
    setSearchHistore([]);
  }

  async function onSearch(value: string) {
    setSearchKey(value);
    setIsShowHotSearch(!value);
    if (value) {
      const history = getSearchHistory();
      history.unshift(value);
      const data: any[] = [...new Set(history)];
      localStorage.setItem("SearchHistory", JSON.stringify(data));
      setSearchHistore(data);
    }
    try {
      const res = await API.SearchSong({
        key: value,
      });
      setSongs(res.data.list);
    } catch (error) {}
  }

  function goSongPage(song: any) {
    navigation.navigate("Song", {
      cover: song.cover,
      title: song.songname,
      mid: song.songmid,
      singerName: handleSingerName(song.singer),
    } as any);
  }

  return (
    <>
      <View style={styles.searchBox}>
        <SearchBar
          value={searchKey}
          onChange={(key) => setSearchKey(key)}
          onSearch={onSearch}
          onClear={onClear}
          placeholder="请输入内容"
          style={{
            "--border-radius": "100px",
            "--background": "#fff",
            width: "85%",
          }}
        />
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.hotSearch}>
        {!!searchHistory.length && isShowHotSearch && (
          <>
            <View
              style={{
                height: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text style={[styles.title, { marginBottom: 0 }]}>搜索历史</Text>
              <DeleteOutline onClick={onDeleteHistory} />
            </View>
            <View style={styles.hostWords}>
              {searchHistory.map((word, i) => (
                <TouchableOpacity key={i} onPress={() => onSearch(word)}>
                  <Text style={styles.word}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {isShowHotSearch && (
          <>
            <Text style={styles.title}>热门搜索</Text>
            <View style={styles.hostWords}>
              {hotWords.map((item) => (
                <TouchableOpacity key={item.n} onPress={() => onSearch(item.k)}>
                  <Text style={styles.word}>{item.k}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {!isShowHotSearch && (
          <View style={styles.songs}>
            {songs.map((item) => (
              <TouchableOpacity
                key={item.songid}
                onPress={() => goSongPage(item)}
              >
                <Text style={styles.songname}>{item.songname}</Text>
                <Text style={styles.singer}>
                  {item.singer.reduce((p: any, n: any) => p + n.name + " ", "")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelText: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 30,
  },
  hotSearch: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fonSize: 14,
    fontWeight: "700",
    marginBottom: 15,
  },
  hostWords: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  word: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 10,
    marginBottom: 10,
    color: "#666",
    fontWeight: "300",
  },
  songs: {
    paddingLeft: 10,
  },
  songname: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 2,
  },
  singer: {
    fontSize: 10,
    color: "#999",
    marginBottom: 10,
  },
});
