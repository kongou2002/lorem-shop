import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
const query = req.query;
  const searchValue = await prisma.product.findMany({
    where: {
      OR: [
        {title: {
        contains: String(query.key),
      }},
      {description: {
        contains: String(query.key),
      }},
        {brand: {
        contains: String(query.key),
      }},
    ],
    },
  });
  if (searchValue.length > 0) {
    res.status(200).json(searchValue);
  } else {
    res.status(404).json({ message: "No product found" });
  }
}