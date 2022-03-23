import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Center from "../components/center";
import Sidebar from "../components/sidebar";

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
};

export default Home;
