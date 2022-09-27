export interface IArticle {
  author: string | null;
  content: string | null;
  description: string;
  publishedAt: string | null;
  source: {
    id: string | null;
    name: string | null;
  };
  title: string;
  url: string;
  urlToImage: string | null;
}
