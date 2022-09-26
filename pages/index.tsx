import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WireNews</title>
      </Head>
      <div className="mt-8">
        <h1 className="text-5xl font-semibold">Trending</h1>

      </div>
    </>
  );
};

export default Home;
