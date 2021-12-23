import { makeAutoObservable } from "mobx"


class SongListStore {
  theSongListInfo: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  setTheSongListInfo(data: any) {
    this.theSongListInfo = data
  }
}

export const songStore = new SongListStore()