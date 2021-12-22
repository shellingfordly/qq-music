import { useEffect, useState } from "react";
import { ApiUrl, getPlayList } from "../../../server/api";
import PlayList from "../../../components/PlayList";
import type { PlayListProps } from "../../../components/PlayList";

export default function DailySpecial({}) {
  const [playListData, setPlayListData] = useState<PlayListProps[]>([]);

  useEffect(() => {
    Promise.all([
      getPlayList(ApiUrl.CategoryRecommend),
      getPlayList(ApiUrl.ForYouRecommend),
    ]).then((res) => {
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
    });
  }, []);

  return (
    <>
      {playListData.map((data) => (
        <PlayList data={data} />
      ))}
    </>
  );
}
