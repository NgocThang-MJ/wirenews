import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import ArticleItem from "../components/article/ArticleItem";

import { IArticle } from "../interfaces/article";
import { fetchHeadlines } from "../utils/fetchHeadlines";

interface IProps {
  technews: {
    articles: IArticle[];
  };
  businessnews: {
    articles: IArticle[];
  };
  sciencenews: {
    articles: IArticle[];
  };
}

function Home(props: IProps) {
  return (
    <>
      <Head>
        <title>WireNews</title>
      </Head>
      <div className="mt-8">
        <h1 className="text-5xl font-semibold">Trending</h1>
        {/* Slider */}
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
          {props.technews.articles.map(
            (article) =>
              article.urlToImage && (
                <SwiperSlide key={article.publishedAt}>
                  <div className="flex justify-between mb-14">
                    <Link href={article.url}>
                      <a target="_blank">
                        <div className="w-[33rem] mr-10">
                          <Image
                            src={article.urlToImage.includes("http") ? article.urlToImage : "http:" + article.urlToImage}
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
                      {(article.author || article.source.name) && (
                        <div className="text-[0.95rem] text-gray-600 font-semibold mt-3">
                          {article.author}{" "}
                          {article.author && (
                            <span className="font-normal">in</span>
                          )}{" "}
                          {article.source.name}
                        </div>
                      )}
                      {!!article.publishedAt && (
                        <div className="text-sm text-gray-400 mt-3 flex items-center">
                          <CalendarDaysIcon className="w-5 h-5 mr-2" />
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

        {/* Business */}
        <div className="mt-5">
          <h2 className="text-3xl font-semibold border-b border-b-gray-300 pb-2">
            Business
          </h2>
          <div className="mt-5 grid grid-cols-4 gap-6 gap-y-12">
            {props.businessnews.articles.map(
              (article) =>
                article.urlToImage && (
                  <ArticleItem
                    key={article.publishedAt}
                    urlToImage={article.urlToImage}
                    url={article.url}
                    title={article.title}
                    author={article.author || ""}
                    source={article.source.name || ""}
                    category="Business"
                  />
                )
            )}
          </div>
        </div>

        {/* Science */}
        <div className="mt-14">
          <h2 className="text-3xl font-semibold border-b border-b-gray-300 pb-2">
            Science
          </h2>
          <div className="mt-5 grid grid-cols-4 gap-6 gap-y-12">
            {props.sciencenews.articles.map(
              (article) =>
                article.urlToImage && (
                  <ArticleItem
                    key={article.publishedAt}
                    urlToImage={article.urlToImage}
                    url={article.url}
                    title={article.title}
                    author={article.author || ""}
                    source={article.source.name || ""}
                    category="Science"
                  />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const techRes = await fetchHeadlines(
    "?pageSize=6&category=technology&language=en"
  );
  const technews = techRes.data;

  const businessRes = await fetchHeadlines(
    "?pageSize=8&category=business&language=en"
  );
  const businessnews = businessRes.data;

  const scienceRes = await fetchHeadlines("?pageSize=8&category=science");
  const sciencenews = scienceRes.data;

  return {
    props: {
      technews,
      businessnews,
      sciencenews,
    },
  };
}
