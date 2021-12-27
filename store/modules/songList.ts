import { makeAutoObservable } from "mobx";

class SongListStore {
  theSongListInfo: any = {};
  isSearchPage = false;
  songInfo: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  setTheSongListInfo(data: any) {
    this.theSongListInfo = data;
  }

  changeSearchPage(bool: boolean) {
    this.isSearchPage = bool;
  }

  setSongInfo(data: any) {
    this.songInfo = data;
  }
}

export const songStore = new SongListStore();
