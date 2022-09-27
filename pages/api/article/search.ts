import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let q = req.query.q as string;
    console.log(q);
    const response = await axios.get(`${process.env.EVERYTHING}?q=${q}&pageSize=20`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (err) {
    return res.status(404).json({ msg: "No results found" });
  }
}
