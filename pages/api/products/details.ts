import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const Product = await prisma.product.findFirst({
    where: {
      id : String(req.query.id)
    },
    include: {
      detailsImage: true,
    }
  })
  res.json(Product)
}
