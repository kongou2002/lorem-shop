import prisma from '../../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const Product = await prisma.product.findFirst({
    where: {
      id : String(req.query.id)
    },
  })
  res.json(Product)
}
