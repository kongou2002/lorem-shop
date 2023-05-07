import prisma from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    const category = await prisma.product.findMany({
        select: {
            category_name: true
        },
        distinct: ['category_name']
    })
    console.log(category)
    res.status(200).json(category)
}
