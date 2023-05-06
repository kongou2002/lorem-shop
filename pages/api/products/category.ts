import prisma from '../../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  const page = Number(req.query.page) || 1; // default to page 1 if not specified
  const limit = Number(req.query.limit) || 10; // default to 10 items per page if not specified
  const category = String(req.query.category || "");
  const offset = (page - 1) * limit;

  const products = await prisma.product.findMany({
    take: limit,
    skip: offset,
    where: {
        category_name: category || undefined
    },
    orderBy: {
      title: "desc"
    }
  });

  const total = await prisma.product.count();

  const totalPages = Math.ceil(total / limit);

  const nextPage = page < totalPages ? page + 1 : null;

  const prevPage = page > 1 ? page - 1 : null;

  const currentPage = page;
  res.json({
    products,
    totalPages,
    nextPage,
    prevPage,
    currentPage
  });
}