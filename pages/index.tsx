import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ClockIcon } from "@heroicons/react/24/outline";

import { IArticle } from "../interfaces/article";

interface IProps {
  articles: IArticle[];
}

function Home(props: IProps) {
  console.log(props);
  return (
    <>
      <Head>
        <title>WireNews</title>
      </Head>
      <div className="mt-8">
        <h1 className="text-5xl font-semibold">Trending</h1>
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          grabCursor={true}
          modules={[Autoplay, Pagination]}
          className="mt-14"
        >
          {props.articles.map(
            (article) =>
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
                      <p className="text-[0.95rem] text-gray-500">
                        {article.description}
                      </p>
                      <div className="text-[0.95rem] text-gray-600 font-semibold mt-3">
                        {article.author} <span className="font-normal">in</span> {article.source.name}
                      </div>
                      {!!article.publishedAt && (
                        <div className="text-sm text-gray-400 mt-3 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <p>
                            {new Date(article.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      )}
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
      "https://newsapi.org/v2/top-headlines?pageSize=6&category=technology&language=en",
      {
        headers: {
          Authorization: `${process.env.API_KEY}`,
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
