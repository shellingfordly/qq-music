import { makeAutoObservable } from "mobx"


class SongListStore {
  theSongListInfo: any = {}
  isSearchPage = false

  constructor() {
    makeAutoObservable(this)
  }

  setTheSongListInfo(data: any) {
    this.theSongListInfo = data
  }

  changeSearchPage(bool: boolean) {
    this.isSearchPage = bool
  }
}

export const songStore = new SongListStore()