import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IProps {
  articles: [];
}

function Home(props: IProps) {
  return (
    <>
      <Head>
        <title>WireNews</title>
      </Head>
      <div className="mt-8">
        <h1 className="text-5xl font-semibold">Trending</h1>
        <Swiper
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mt-14"
        >
          {props.articles.map(
            (article: any) =>
              article.urlToImage && (
                <SwiperSlide key={article.publishedAt}>
                  <div className="flex justify-between mb-14">
                    <Link href={article.url}>
                      <a target="_blank">
                        <div className="w-[33rem] mr-10">
                          <Image
                            src={article.urlToImage}
                            className="mr-10"
                            width={1000}
                            height={600}
                          />
                        </div>
                      </a>
                    </Link>
                    <div>
                      <Link href={article.url} target="_blank">
                        <a target="_blank">
                          <p className="text-3xl my-6 cursor-pointer font-semibold">
                            {article.title}
                          </p>
                        </a>
                      </Link>
                      <p className="text-[0.9rem] text-slate-600">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  async function fetchData() {
    const res = await axios.get(
      "https://newsapi.org/v2/top-headlines?pageSize=5&category=technology&language=en",
      {
        headers: {
          Authorization: "40ec88e0c5614cf6affe314f530f12a8",
        },
      }
    );
    console.log(res.data.articles);
    return res.data.articles;
  }
  const articles = await fetchData();

  return {
    props: {
      articles,
    },
  };
};
