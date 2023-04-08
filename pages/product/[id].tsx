import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import { Product } from "../../interface/Product";

async function getServerSide(id: string) {
  //get data from prisma
  const res = await fetch(
    `http://localhost:3000/api/products/details?id=${id}`
  );
  const data = await res.json();
  return data;
}

function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  React.useEffect(() => {
    async function fetchData() {
      const result = await getServerSide(id as string);
      setProduct(result);
    }
    fetchData();
  }, [id]);
  console.log(product);
  if (!product) return <div>Loading...</div>;
  return <div>Details</div>;
}

export default Details;
