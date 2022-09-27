import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface IProps {
  urlToImage: string;
  url: string;
  title: string;
  author: string;
  source: string;
  category?: string;
  publishedAt: string;
}

function ArticleItem({
  urlToImage,
  url,
  title,
  source,
  category,
  publishedAt,
  author,
}: IProps) {
  return (
    <div className="overflow-hidden flex flex-col">
      <Link href={url}>
        <a target="_blank">
          <Image
            src={
              urlToImage.includes("http") ? urlToImage : "https:" + urlToImage
            }
            width={420}
            height={250}
            alt="News Cover"
          />
        </a>
      </Link>

      <div className="flex flex-col justify-between flex-grow mt-2">
        <div>
          <Link href={url}>
            <a target="_blank">
              <p className="text-xl font-semibold mb-2">{title}</p>
            </a>
          </Link>
          {source && (
            <div className="text-[0.95rem] text-gray-600">{source}</div>
          )}
        </div>
        <div className="flex items-center text-gray-600 mt-3">
          {author && <p className="mr-2">{author}</p>}
          {publishedAt && (
            <>
              {author && "-"}
              <CalendarDaysIcon
                className={`w-4 h-4 mr-2 ${author && "ml-2"}`}
              />
              <p className="text-sm">
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
