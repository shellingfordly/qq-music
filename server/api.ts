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

/**
 * @description 获取榜单详情
 * @param id 默认 4
*/
export function topDetails(params: { id: number }) {
  return http.request({
    url: "/top",
    method: "GET",
    params,
  });
}

/**
 * @description 获取榜单详情
 * @param id 默认 4
*/
export function getSongListDetails(params: { id: number }) {
  return http.request({
    url: "/songlist",
    method: "GET",
    params,
  });
}
