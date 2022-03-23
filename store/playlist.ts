import { makeAutoObservable } from "mobx";

class Playlist {
  public playlistId: string = "";
  public playlist: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setPlaylistId(playlistId: string) {
    this.playlistId = playlistId;
  }

  public setPlaylist(playlist: any) {
    this.playlist = playlist;
  }
}

export default new Playlist();
