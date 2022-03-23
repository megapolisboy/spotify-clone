import { makeAutoObservable } from "mobx";

class Song {
  public currentTrackId: string | null = null;
  public isPlaying: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Song();
