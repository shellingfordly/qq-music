import API from "../../../../server/api";
import { useEffect, useState } from "react";
import { RANK_SONG_LIST_KEY } from "../../../../constants/key";
import { localStorage } from "../../../../utils/storage";

export function useFetch() {
  const [allRankList, setAllRankList] = useState<any[]>([]);
  const [recommendRanckList, setRecommendRanckList] = useState<any[]>([]);
  const [topRanckMap, setTopRanckMap] = useState<Record<number, any>>([]);

  function getTopRankPlayListDetails(data: any[]) {
    const map: Record<number, any> = {};
    for (let index = 0; index < data.length; index++) {
      const id = data[index].topId;
      if (id === 201) continue;
      map[id] = data[index];
      API.TopRankDetails({ id, pageSize: 3 }).then((res) => {
        setTopRanckMap((oldData) => ({
          ...oldData,
          [id]: {
            ...map[id],
            ...res.data,
          },
        }));
      });
    }
  }

  useEffect(() => {
    (async () => {
      let local = await localStorage.getItem(RANK_SONG_LIST_KEY);
      let res;
      if (local) {
        res = local;
      } else {
        const res = await API.TopRankCategory();
        localStorage.setItem(RANK_SONG_LIST_KEY, res);
      }

      const allData = res.data.reduce((p: any, n: any) => {
        return p.concat(n.list);
      }, []);
      setAllRankList(allData);
      setRecommendRanckList(
        allData.filter((item: any) => [60, 67, 63].includes(item.topId))
      );
      getTopRankPlayListDetails(res.data[0].list);
    })();
  }, []);

  return {
    allRankList,
    recommendRanckList,
    topRanckMap,
  };
}
