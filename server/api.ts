import { AxiosRequestConfig } from "axios";
import { http } from "../utils/http";

class API {
  /**
   * @description 为你推荐歌单
   */
  ForYouRecommend() {
    return http.get("/recommend/playlist/u");
  }

  /**
   * @description 按分类推荐歌单
   */
  CategoryRecommend() {
    return http.get("/recommend/playlist");
  }

  /**
   * @description 日推
   */
  DailyRecommend() {
    return http.get("/recommend/daily");
  }

  /**
   * @description 获取榜单列表
   */
  TopRankCategory() {
    return http.get("/top/category");
  }

  /**
   * @description 获取热搜词
   */
  HotSearch() {
    return http.get("/search/hot");
  }

  /**
   * @description 获取歌单分类
   */
  SongListCategory() {
    return http.get("/songlist/category");
  }

  /**
   * @description 轮播图Banner
   */
  RecommendBanner() {
    return http.get("/recommend/banner");
  }

  /**
   * @description 获取歌手分类
   */
  SingerCateGory() {
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
  GetSingerList(params: {
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
  getNewSongs(params?: { type?: number }) {
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
  SearchSong(params: { key: string }) {
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
  TopRankDetails(params: { id: number; pageSize?: number }) {
    return http.request({
      url: "/top",
      method: "GET",
      params,
    });
  }

  /**
   * @description 根据分类获取歌单列表
   * @param pageSize: 默认为 20
   * @param pageNo: 默认为1
   * @param sort: 默认是 5，// 5: 推荐，2: 最新，其他数字的排列值最后都会返回推荐
   * @param category: 分类 id，默认 10000000 （全部），其他值从上面的分类接口获取
   */
  GetSongList(params: {
    pageSize?: number;
    pageNo?: number;
    sort?: number;
    category?: number;
  }) {
    return http.request({
      url: "/songlist/list",
      method: "GET",
      params,
    });
  }

  /**
   * @description 获取歌单详情
   * @param id 默认 4
   */
  GetSongListDetails(params: { id: number | string }) {
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
  getSongDetails(params: { songmid: number }) {
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
  GetSongLyric(params: { songmid: string }) {
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
  GetSongPlayUrl(params: { id: string }) {
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
  UserSetCookie(data: { data: any }) {
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
  UserGetCookie(params: { id: number }) {
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
  UserLookCookie() {
    return http.request({
      url: "/user/cookie",
      method: "get",
    });
  }

  /**
   * @description 获取用户信息
   * @param id: qq/wxuin
   */
  GetUserInfo(params: { id: string }) {
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
  GetUserCollectSongList(params: { id: string }) {
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
  GetUserCreateSongList(params: { id: string }) {
    return http.request({
      url: "/user/songlist",
      method: "get",
      params,
    });
  }

  /**
   * @description 获取用户收藏的专辑
   * @param id: qq/wxuin
   */
  GetUserCollectAlbum(params: { id: string }) {
    return http.request({
      url: "/user/collect/album",
      method: "get",
      params,
    });
  }

  /**
   * @description 电台分类
   */
  GetRadioCaregory() {
    return http.request({
      url: "/radio/category",
      method: "get",
    });
  }

  /**
   * @description 获取电台歌曲
   */
  GetRadioSong(params: { id: number }) {
    return http.request({
      url: "/radio",
      method: "get",
      params,
    });
  }

  /**
   * @description 获取专辑
   */
  GetAlbum(params: { albummid: string }) {
    return http.request({
      url: "/album",
      method: "get",
      params,
    });
  }

  /**
   * @description 获取专辑内歌曲
   */
  GetAlbumSongs(params: { albummid: string }) {
    return http.request({
      url: "/album/songs",
      method: "get",
      params,
    });
  }
}

export default new API();
