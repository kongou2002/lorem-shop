import Hero from "@/components/Hero";
import MenuCategory from "@/components/MenuCategory";
import ProductCard from "@/components/ProductCard";
import SectionImage from "@/components/SectionImage";
import { Product } from "@/interface/Product";
import { PrismaClient } from "@prisma/client";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const prisma = new PrismaClient();
  // get 4 product with rating >= 4
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
  const Category = await prisma.findMany({
    take: 6,
  });

  return {
    props: {
      products: product,
      SaleProduct: SaleProduct,
    },
  };
}
export default function Home(props: {
  products: Array<Product>;
  SaleProduct: Array<Product>;
}) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saleProduct, setSaleProduct] = useState<Array<Product>>([]);
  useEffect(() => {
    setProducts(props.products);
    setLoading(true);
    setSaleProduct(props.SaleProduct);
  }, [props.products, props.SaleProduct]);
  return (
    <>
      <Head>
        <title>lorem shop</title>
        <meta name="description" content="Fashion shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>
          <Hero />
        </div>
        <div className="flex">
          <MenuCategory />
        </div>
        <div>
          <div className="w-full mt-2 mb-2 bg-secondary">
            <h1 className="text-sm lg:text-lg">Promotion</h1>
          </div>
          <div className="flex flex-col sm:flex-row ">
            <div className="grid grid-cols-2 md:grid-cols-3">
              <ProductCard product={saleProduct} loading={loading} />
            </div>
            <div className="">
              <SectionImage />
            </div>
          </div>
        </div>
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
    </>
  );
}
