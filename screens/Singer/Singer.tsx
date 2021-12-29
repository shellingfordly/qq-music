import { CSSProperties, useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { getSingerCateGory, getSingerList } from "../../server/api";
import { themeColor } from "../../utils/style";
import { Tag, List, InfiniteScroll, Image } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";

const tagStyle: CSSProperties = {
  width: 50,
  height: 30,
  textAlign: "center",
  marginRight: 10,
  fontSize: 14,
  lineHeight: "22px",
  color: "#666",
};

let pageNo = 1;

async function mockRequest() {
  await sleep(500);
  const res = await getSingerList({ pageNo });
  pageNo++;
  return res.data.list;
}

export default function Singer() {
  // 分类列表
  const [singerCateGory, setSingerCateGory] = useState<any>({
    area: [],
    genre: [],
    sex: [],
  });
  // 选择分类
  const [selectedMap, setSelectedMao] = useState<any>({
    area: -100,
    genre: -100,
    sex: -100,
  });
  const [singerList, setSingerList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const tagColor = (key: string, id: number) =>
    selectedMap[key] === id ? themeColor.primary : "#fafafa";

  useEffect(() => {
    getSingerCateGory().then((res) => {
      setSingerCateGory({
        area: res.data.area,
        genre: res.data.genre,
        sex: res.data.sex,
      });
    });
  }, []);

  async function loadMoreSingerList() {
    const res = await mockRequest();
    setSingerList((data) => [...data, ...res]);
    setHasMore(res.length > 0);
  }

  async function onSeleteTag(key: string, id: number) {
    setSelectedMao((data: any) => ({
      ...data,
      [key]: id,
    }));
    const res = await getSingerList({ ...selectedMap, [key]: id });
    setSingerList(res.data.list);
  }

  return (
    <View style={{ padding: 20, backgroundColor: "white" }}>
      {Object.keys(singerCateGory).map(
        (key) =>
          singerCateGory[key] &&
          !!singerCateGory[key].length && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              key={key}
              style={{ flexDirection: "row", marginBottom: 10 }}
            >
              {singerCateGory[key].map((item: any) => (
                <Tag
                  round
                  key={item.id}
                  color={tagColor(key, item.id)}
                  onClick={() => onSeleteTag(key, item.id)}
                  style={tagStyle}
                >
                  {item.name}
                </Tag>
              ))}
            </ScrollView>
          )
      )}
      <List style={{ marginTop: 20 }}>
        {singerList.map((item) => (
          <List.Item key={item.singer_id}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={item.singer_pic}
                width={50}
                height={50}
                style={{ borderRadius: 100, marginRight: 20 }}
              />
              <Text style={{ fontSize: 16 }}>{item.singer_name}</Text>
            </View>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMoreSingerList} hasMore={hasMore} />
    </View>
  );
}
