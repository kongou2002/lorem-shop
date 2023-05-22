import prisma from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    const category = await prisma.category.findMany({
        select: {
            name: true,
            subcategory:true
        },
    })
    res.status(200).json(category)
}
