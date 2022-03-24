import useSpotify from "../hooks/useSpotify";
import song from "../store/song";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
//@ts-ignore
import { debounce } from "lodash";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);

  const songInfo: any = useSongInfo(song.currentTrackId);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data) => {
          console.log("Now playing " + data.body?.item);
          song.setCurrentTrackId(data.body?.item?.id || null);

          spotifyApi
            .getMyCurrentPlaybackState()
            .then((data: any) => {
              song.setIsPlaying(data.body?.is_playing);
            })
            .catch((err: Error) => {
              console.error(err.message);
            });
        })
        .catch((err: Error) => {
          console.error(err.message);
        });
    }
  };

  const handlePlayPause = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data: any) => {
        if (data.body.is_playing) {
          spotifyApi.pause();
        } else {
          spotifyApi.play();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });

    song.handlePlayPause();
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !song.currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [song.currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume: number) => {
      spotifyApi.setVolume(volume).catch((err) => console.error(err.message));
    }, 500),
    []
  );

  return (
    <div
      className="grid h-24 grid-cols-3 bg-gradient-to-b from-black
    to-gray-900 px-2 text-xs text-white md:px-8 md:text-base"
    >
      {/* Left */}
      <div className="flex items-center space-x-4 ">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.at(0)?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.at(0)?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {song.isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() =>
            volume > 0 && setVolume(volume - 10 < 0 ? 0 : volume - 10)
          }
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(e.target.value as unknown as number)}
          min="0"
          max="100"
        />
        <VolumeUpIcon
          onClick={() =>
            volume < 100 && setVolume(volume + 10 > 100 ? 100 : volume + 10)
          }
          className="button"
        />
      </div>
    </div>
  );
};

export default observer(Player);
