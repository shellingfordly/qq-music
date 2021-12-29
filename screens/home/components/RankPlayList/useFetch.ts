import API from "../../../../server/api";
import { useEffect, useState } from "react";

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
      let local = localStorage.getItem("RankList");
      let res;
      if (local) {
        res = JSON.parse(local);
      } else {
        const res = await API.TopRankCategory();
        localStorage.setItem("RankList", JSON.stringify(res));
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
