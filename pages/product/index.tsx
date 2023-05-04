import React, { ReactElement } from "react";
import LeftMenu from "@/components/Menu";
import { useState, useEffect } from "react";
import { PrismaClient, product } from "@prisma/client";
import ProductCard from "@/components/ProductCard";
import { current } from "@reduxjs/toolkit";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const Category = await prisma.product.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });
  // get 12 product per page
  return {
    props: {
      Category: Category,
    },
  };
}

function ProductPage(props: {
  Category: Array<product>;
  product: Array<product>;
}) {
  const [category, setCategory] = useState<Array<product>>([]);
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(0);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(0);
  const [content, setContent] = useState<Array<product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setCategory(props.Category);
    setLoading(true);
  }, []);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `/api/products/category?limit=${limit}&page=${page}&category=${selectCategory}`
      );
      const { products, totalPages, nextPage, prevPage, currentPage } =
        await data.json();
      setNextPage(nextPage);
      setPrevPage(prevPage);
      setTotalPage(totalPages);
      setContent(products);
      setPage(currentPage);
      setLoading(true);
    }
    fetchData();
  }, [limit, page, selectCategory]);

  const handleSelectCategory = (category: string | null) => {
    setSelectCategory(category || "");
    setLoading(false);
  };
  const handleNextPage = () => {
    setPage(nextPage);
  };
  const handlePrevPage = () => {
    setPage(prevPage);
  };
  return (
    <div className="flex">
      <div className="w-2/12">
        <LeftMenu category={category} onClick={handleSelectCategory} />
      </div>
      <div className="w-10/12 text-center items-center">
        <div className="flex flex-wrap">
          <ProductCard product={content} loading={loading} />
        </div>
        <div className="btn-group m-auto">
          <button className="btn" onClick={handlePrevPage}>
            «
          </button>
          <button className="btn">Page {page}</button>
          <button className="btn" onClick={handleNextPage}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
