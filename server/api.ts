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
  // 获取热搜词
  HotSearch: "/search/hot",
  // 获取歌单分类
  SongListCategory: "/songlist/category",
  // 轮播图Banner
  RecommendBanner: "/recommend/banner",
};

export function getPlayList(url: string) {
  return http.get(url);
}

/**
 * @description 获取歌手分类
 */
export function getSingerCateGory() {
  return http.get("/singer/category");
}

/**
 * @description 根据分类获取歌手列表
 * @param area: 地区，默认 -100
 * @param genre: 风格，默认 -100
 * @param index: 首字母，默认 -100
 * @param sex: 性别/组合，默认 -100
 * @param pageNo: 默认 1
 */
export function getSingerList(params: {
  area?: number;
  genre?: number;
  index?: number;
  sex?: number;
  pageNo?: number;
}) {
  return http.request({
    url: "/singer/list",
    method: "GET",
    params,
  });
}

/**
 * @description 新歌推荐
 * @param type 地区分类，默认为 0;
 *                0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本
 */
export function getNewSongs(params?: { type?: number }) {
  return http.request({
    url: "/new/songs",
    method: "GET",
    params,
  });
}

/**
 * @description 搜索
 * @param key
 */
export function searchSong(params: { key: string }) {
  return http.request({
    url: "/search",
    method: "GET",
    params,
  });
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
 * @description 获取歌单详情
 * @param id 默认 4
 */
export function getSongListDetails(params: { id: number }) {
  return http.request({
    url: "/songlist",
    method: "GET",
    params,
  });
}

/**
 * @description 获取歌曲信息
 * @param songmid
 */
export function getSongDetails(params: { songmid: number }) {
  return http.request({
    url: "/song",
    method: "GET",
    params,
  });
}

/**
 * @description 获取歌词
 * @param songmid
 */
export function getSongLyric(params: { songmid: number }) {
  return http.request({
    url: "/lyric",
    method: "GET",
    params,
  });
}

/**
 * @description 获取播放链接
 * @param id: songmid
 */
export function getSongPlayUrl(params: { id: number }) {
  return http.request({
    url: "/song/urls",
    method: "GET",
    params,
  });
}

/**
 * @description 设置cookie
 * @param data: cookie 信息
 */
export function userSetCookie(data: { data: any }) {
  return http.request({
    url: "/user/setCookie",
    method: "POST",
    data,
  });
}

/**
 * @description 获取cookie
 * @param id: qq/wxuin
 */
export function userGetCookie(params: { id: number }) {
  return http.request({
    url: "/user/getCookie",
    method: "get",
    params,
  });
}

/**
 * @description 获取cookie
 * @param id: qq/wxuin
 */
export function userLookCookie() {
  return http.request({
    url: "/user/cookie",
    method: "get",
  });
}

/**
 * @description 获取用户信息
 * @param id: qq/wxuin
 */
export function getUserDetail(params: { id: string }) {
  return http.request({
    url: "/user/detail",
    method: "get",
    params,
  });
}

/**
 * @description 获取用户收藏的歌单
 * @param id: qq/wxuin
 */
export function getUserCollectSongList(params: { id: string }) {
  return http.request({
    url: "/user/collect/songlist",
    method: "get",
    params,
  });
}

/**
 * @description 获取用户创建的歌单
 * @param id: qq/wxuin
 */
export function getUserCreateSongList(params: { id: string }) {
  return http.request({
    url: "/user/songlist",
    method: "get",
    params,
  });
}
