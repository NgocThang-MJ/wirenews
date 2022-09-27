import Image from "next/image";
import Link from "next/link";

interface IProps {
  urlToImage: string;
  url: string;
  title: string;
  author: string;
  source: string;
  category?: string;
}

function ArticleItem({ urlToImage, url, title, source, category }: IProps) {
  return (
    <div className="overflow-hidden flex flex-col">
      <Link href={url}>
        <a target="_blank">
          <Image src={

                              urlToImage.includes("http")
                                ? urlToImage
                                : "https:" + urlToImage
          } width={420} height={250} alt="News Cover" />
        </a>
      </Link>

      <div className="flex flex-col justify-between flex-grow mt-2">
        <div>
          {source && (
            <div className="text-[0.95rem] text-gray-600">{source}</div>
          )}
          <p className="text-xl font-semibold">{title}</p>
        </div>
        <p className="text-gray-600 mt-3">{category}</p>
      </div>
    </div>
  );
}

export default ArticleItem;
