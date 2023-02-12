import type { NextApiRequest, NextApiResponse } from "next";

import { NftsService } from "@/services/nfts";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { address } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).end();
    return;
  }
  const nftsService = new NftsService();
  const data = await nftsService.getList(address as string);
  return res.json(data);
}
