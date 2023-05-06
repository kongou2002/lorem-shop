import ProductCard from "@/components/ProductCard";
import LeftMenu from "@/components/SideBarMenu";
import { product } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import prisma from "../../utils/prisma";

export async function getStaticProps() {
  const Category = await prisma.product.findMany({
    select: {
      category_name: true,
    },
    distinct: ["category_name"],
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
  const [prevPage, setPrevPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(0);
  const [content, setContent] = useState<Array<product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryQuery, setCategoryQuery] = useState<string>("");
  const router = useRouter();

  const fetchData = useCallback(
    async (category: string) => {
      const res = await fetch(
        `/api/products/category?limit=${limit}&page=${page}&category=${category}`
      ).then((data) => data.json());
      setNextPage(res.nextPage);
      setPrevPage(res.prevPage);
      setContent(res.products);
      setPage(res.currentPage);
      setLoading(true);
    },
    [page, limit]
  );

  useEffect(() => {
    setCategory(props.Category);
    if (router.query.category === undefined) {
      setCategoryQuery("");
      fetchData("");
    } else {
      setCategoryQuery(router.query.category as string);
      fetchData(router.query.category as string);
    }
  }, [fetchData, props.Category, router.query.category]);

  const handleNextPage = () => {
    if (nextPage !== null) {
      setPage(nextPage);
    }
  };
  const handlePrevPage = () => {
    if (prevPage !== null) {
      setPage(prevPage);
    }
  };
  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };
  return (
    <div className="flex justify-center relative">
      <div className="hidden sm:block sm:w-2/12 border rounded-lg">
        <LeftMenu category={category} loading={handleLoading} />
      </div>
      <div className="w-10/12 text-center items-center border rounded-lg ml-4">
        <div className=" grid grid-cols-2 md:grid-cols-3">
          <ProductCard product={content} loading={loading} />
        </div>
        <div className="btn-group m-auto relative">
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
