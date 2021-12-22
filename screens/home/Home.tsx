import { SearchOutline } from "antd-mobile-icons";
import { View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import { Button, Space, Tabs } from "antd-mobile";
import RecommendPlayList from "./components/RecommendPlayList";
import RankPlayList from "./components/RankPlayList/RankPlayList";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <View>
      <Tabs
        style={{
          "--title-font-size": "20px",
        }}
        activeKey="RankPlayList"
      >
        <Tabs.Tab title="推荐" key="RecommendPlayList">
          <View>
            <Button shape="rounded">
              <Space>
                <SearchOutline />
                <span>搜索</span>
              </Space>
            </Button>
            <RecommendPlayList />
          </View>
        </Tabs.Tab>
        <Tabs.Tab title="排行" key="RankPlayList">
          <RankPlayList />
        </Tabs.Tab>
      </Tabs>
    </View>
  );
}
