import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import song from "../store/song";
import { observer } from "mobx-react-lite";

interface SongProps {
  track: any;
  order: number;
}

const Song: React.FC<SongProps> = ({ track, order }) => {
  const spotifyApi = useSpotify();

  const playSong = async () => {
    try {
      song.setCurrentTrackId(track.track.id);
      song.setIsPlaying(true);
      await spotifyApi.play({
        uris: [track.track.uri],
      });
    } catch (error: any) {
      alert("Premium account needed to play songs");
    }
  };

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5
    text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default observer(Song);
