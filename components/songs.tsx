import playlist from "../store/playlist";
import { observer } from "mobx-react-lite";
import Song from "./song";

const Songs: React.FC = () => {
  console.log(playlist.playlist?.tracks.items);
  return (
    <div className="text-white">
      {playlist.playlist?.tracks.items.map((track: any, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default observer(Songs);
