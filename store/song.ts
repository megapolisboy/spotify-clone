import { makeAutoObservable } from "mobx";

class Song {
  public currentTrackId: string | null = null;
  public isPlaying: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentTrackId(trackId: string | null) {
    this.currentTrackId = trackId;
  }

  public setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }

  public handlePlayPause() {
    this.isPlaying = !this.isPlaying;
  }
}

export default new Song();
