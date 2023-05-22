import Hero from "@/components/Hero";
import CategoryListMenu from "@/components/CategoryListMenu";
import ProductCard from "@/components/ProductCard";
import SectionImage from "@/components/SectionImage";
import { product } from "@prisma/client";
import prisma from "../utils/prisma";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  // get 4 product with highest rating
  const product = await prisma.product.findMany({
    where: {
      rating: {
        gte: 4,
      },
    },
    take: 4,
  });
  const SaleProduct = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gte: 10,
      },
    },
    take: 6,
  });
  const Category = await prisma.product.findMany({
    select: {
      category_name: true,
    },
  });
  const RandomProduct = await prisma.product.findMany({
    take: 6,
  });

  return {
    props: {
      products: product,
      SaleProduct: SaleProduct,
      Category: Category,
      RandomProduct: RandomProduct,
    },
  };
}
export default function Home(props: {
  products: Array<product>;
  SaleProduct: Array<product>;
  Category: Array<product>;
  RandomProduct: Array<product>;
}) {
  const [products, setProducts] = useState<Array<product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saleProduct, setSaleProduct] = useState<Array<product>>([]);
  const [category, setCategory] = useState<Array<product>>([]);
  const [randomProduct, setRandomProduct] = useState<Array<product>>([]);
  useEffect(() => {
    setProducts(props.products);
    setSaleProduct(props.SaleProduct);
    setCategory(props.Category);
    setRandomProduct(props.RandomProduct);
    setLoading(true);
  }, [props]);
  return (
    <div className="container mx-auto max-h-full">
      <Head>
        <title>lorem shop</title>
        <meta name="description" content="Fashion shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen">
        <div>
          <Hero />
        </div>
        <div className="flex">
          <CategoryListMenu category={category} />
        </div>
        {randomProduct.length > 5 ? (
          <div id="promotion zone" className="border rounded">
            <div className="w-full mt-2 mb-2 bg-secondary">
              <h1 className="text-sm lg:text-lg">May be you likes</h1>
            </div>
            <div className="flex flex-col sm:flex-row ">
              <div className="">
                <SectionImage src="https://i.pinimg.com/564x/f3/83/cf/f383cf02f7e629630e148b24dd77e5cf.jpg" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3">
                <ProductCard product={randomProduct} loading={loading} />
              </div>
            </div>
          </div>
        ) : null}
        {saleProduct.length > 5 ? (
          <div id="promotion zone">
            <div className="w-full mt-2 mb-2 bg-secondary">
              <h1 className="text-sm lg:text-lg">Promotion</h1>
            </div>
            <div className="flex flex-col sm:flex-row ">
              <div className="grid grid-cols-2 md:grid-cols-3">
                <ProductCard product={saleProduct} loading={loading} />
              </div>
              <div className="">
                <SectionImage src="https://i.pinimg.com/564x/1b/fd/bc/1bfdbcfb01448f061592b0082f6799b3.jpg" />
              </div>
            </div>
          </div>
        ) : null}
        <div className="">
          <div className="w-full text-center mt-2 mb-2">
            <h1 className="text-sm lg:text-lg">Popular product</h1>
          </div>
          <div className="flex justify-center">
            <div className="text-center right-0 grid grid-cols-2 sm:grid-col-3 lg:grid-cols-4">
              <ProductCard product={products} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
