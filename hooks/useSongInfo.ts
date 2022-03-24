import song from "../store/song";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

const useSongInfo = (currentTrackId: string | null) => {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: "Bearer " + spotifyApi.getAccessToken(),
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
