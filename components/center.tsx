import { ChevronDownIcon, UserIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//@ts-ignore
import { shuffle } from "lodash";
import playlist from "../store/playlist";
//@ts-ignore
import { observer } from "mobx-react-lite";
import useSpotify from "../hooks/useSpotify";
import Songs from "./songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center: React.FC = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string | null>(null);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors)[0]);
  }, [playlist.playlistId]);

  useEffect(() => {
    if (playlist.playlistId !== "") {
      spotifyApi
        .getPlaylist(playlist.playlistId)
        .then((data) => {
          playlist.setPlaylist(data.body);
        })
        .catch((err) => console.error(err));
    }
  }, [spotifyApi, playlist.playlistId]);

  return (
    <div className="h-screen grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center space-x-3 rounded-full 
         bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
        >
          {session?.user?.image ? (
            <img
              className="h-10 w-10 rounded-full"
              src={session?.user?.image}
              alt=""
            />
          ) : (
            <UserIcon className="h-10 w-10 rounded-full" />
          )}
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 
        bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist.playlist?.images?.[0].url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist.playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};
export default observer(Center);
