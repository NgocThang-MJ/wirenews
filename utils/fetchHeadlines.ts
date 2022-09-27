import axios from "axios";

export async function fetchHeadlines(query: string) {
  const res = await axios.get(`${process.env.TOP_HEADLINES}${query}`, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return res;
}
