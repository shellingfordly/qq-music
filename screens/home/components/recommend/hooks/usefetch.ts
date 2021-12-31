import { useEffect, useState } from "react";
import { PlayListProps } from "../components/PlayList";
import API from "../../../../../server/api";

const sortBg = [
  "https://y.gtimg.cn/music/common/upload/category_area/4106837.jpeg?max_age=2592000",
  "https://y.gtimg.cn/music/common/upload/category_area/1674712.jpg?max_age=2592000",
  "https://y.gtimg.cn/music/common/upload/category_area/4154835.jpg?max_age=2592000",
  "https://y.gtimg.cn/music/common/upload/category_area/2609005.jpg?max_age=2592000",
  "https://y.gtimg.cn/music/common/upload/category_area/4177741.jpg?max_age=2592000",
  "https://y.gtimg.cn/music/common/upload/category_area/4178169.jpg?max_age=2592000",
];

export default function useFetch() {
  const [playListData, setPlayListData] = useState<PlayListProps[]>([]);

  // 获取用户日推，需要cookie
  // useEffect(() => {
  //   API.UserLookCookie().then((res) => {
  //     if (res.data.uin) {
  //       API.DailyRecommend().then((res) => {
  //         setPlayListData((data) => {
  //           return [
  //             {
  //               title: "每日推荐",
  //               playList: res.data.list,
  //             },
  //             ...data,
  //           ];
  //         });
  //       });
  //     }
  //   });
  // }, []);

  // 获取 官方歌单 达人歌单
  useEffect(() => {
    Promise.all([API.CategoryRecommend(), API.ForYouRecommend()]).then(
      (res) => {
        setPlayListData([
          {
            title: "官方歌单",
            playList: res[0].data.list,
          },
          {
            title: "达人歌单",
            playList: res[1].data.list,
          },
        ]);
      }
    );
  }, []);

  // 分类专区
  // useEffect(() => {
  //   API.SongListCategory().then((res) => {});
  // }, []);

  return { playListData };
}
