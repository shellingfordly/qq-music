import { Tabs } from "antd-mobile";
import RecommendPlayList from "./components/RecommendPlayList";
import RankPlayList from "./components/RankPlayList/RankPlayList";
import Search from "./components/Search";
import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { SearchContext } from "./hooks/useContext";

enum Tab {
  Recommend = "RecommendPlayList",
  Rank = "RankPlayList",
}

function Home() {
  const [activeKey, setActiveKey] = useState<Tab>(Tab.Recommend);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const value = { isShowSearch, setIsShowSearch };

  useEffect(() => {
    if (activeKey === Tab.Rank) {
      setIsShowSearch(false);
    }
  }, [activeKey]);
  return (
    <>
      <Tabs
        style={{
          "--title-font-size": "20px",
          backgroundColor: "white",
          boxShadow: "1px 1px 10px #ddd",
          zIndex: 1,
        }}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as Tab)}
      >
        <Tabs.Tab title="推荐" key={Tab.Recommend}></Tabs.Tab>
        <Tabs.Tab title="排行" key={Tab.Rank}></Tabs.Tab>
      </Tabs>
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: "rgb(245, 245, 245)",
        }}
      >
        <SearchContext.Provider value={value}>
          <View style={!isShowSearch && { display: "none" }}>
            <Search />
          </View>
          <View style={isShowSearch && { display: "none" }}>
            {activeKey === Tab.Recommend ? (
              <RecommendPlayList />
            ) : (
              <RankPlayList />
            )}
          </View>
        </SearchContext.Provider>
      </ScrollView>
    </>
  );
}

export default observer(Home);
