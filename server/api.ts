import { http } from "../utils/http";

export const ApiUrl = {
  // 为你推荐歌单
  ForYouRecommend: "/recommend/playlist/u",
  // 按分类推荐歌单
  CategoryRecommend: "/recommend/playlist",
  // 日推
  DailyRecommend: "/recommend/daily",
  // 获取榜单列表
  TopCategory: "/top/category",
};

export function getPlayList(url: string) {
  return http.get(url);
}

/*
获取榜单详情

参数
id: 默认 4，从上面的列表中取值
pageSize: 默认 100 // 部分接口不支持这个字段，所以这里默认选择100
period: 榜单的时间，从上面的列表中取值，非必填
time: 默认当前时间，如果有 period，此参数无效
*/
export function topDetails(params: { id: number }) {
  return http.request({
    url: "/top",
    method: "GET",
    params,
  });
}
