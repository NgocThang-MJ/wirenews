import { GetStaticProps, GetServerSideProps } from "next";
import axios from "axios";
// and we need jsdom and Readability to parse the article HTML
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

interface IPropsArticle {
  article: string;
  content: string;
}

function Article(props: IPropsArticle) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  );
}

export default Article;

export const getServerSideProps: GetServerSideProps = async () => {
  const url =
    "https://www.reuters.com/technology/bitcoin-once-again-slips-below-20000-2022-09-18/";
  const res = await axios.get(url);
  let dom = new JSDOM(res.data, {
    url,
  });
  let article = new Readability(dom.window.document).parse();
  console.log(article?.content);

  return {
    props: {
      article: article?.textContent,
      content: article?.content,
    },
  };
};
