import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import ArticleItem from "../../components/article/ArticleItem";
import { IArticle } from "../../interfaces/article";

function Search() {
  const router = useRouter();
  const { q } = router.query;
  console.log(q);

  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    if (!q) return;
    async function search() {
      const res = await axios.get(`/api/article/search?q=${q}`);
      console.log(res.data);
      return res.data;
    }
    search().then((res) => {
      console.log(res);
      setArticles(res.articles);
    });
  }, [q]);

  return (
    <div>
      <div>
        <div className="mt-5">
          <h2 className="text-3xl font-semibold border-b border-b-gray-300 pb-2">
            Results for "{q}"
          </h2>
          {articles.length > 0 && (
            <div className="mt-10 grid grid-cols-4 gap-6 gap-y-12">
              {articles.map(
                (article) =>
                  article.urlToImage && (
                    <ArticleItem
                      key={article.publishedAt}
                      urlToImage={article.urlToImage}
                      url={article.url}
                      title={article.title}
                      author={article.author || ""}
                      source={article.source.name || ""}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
