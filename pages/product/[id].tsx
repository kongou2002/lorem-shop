import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import { Product } from "../../interface/Product";
import ProductImage from "../../components/ProductImage";
import Image from "next/legacy/image";
import Link from "next/link";

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
  const [imageArray, setImageArray] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getServerSide(id as string);
      setProduct(result);
      const imageList = result.image;
      imageList.push(result.thumbnail);
      setImageArray(imageList);
    }
    fetchData();
  }, [id]);
  const carousel = imageArray.map((image, index) => {
    return (
      <div id={`slide${index}`} className="carousel-item" key={index}>
        <Image src={image} alt="" height={700} width={500} />
      </div>
    );
  });
  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="sm:w-1/3">
          <div className="w-full">
            <div className="relative">
              <div className="carousel">{carousel}</div>
              <div className="relative">
                <div className="carousel-nav">
                  {imageArray.map((image, index) => {
                    return (
                      <Link
                        href={`#slide${index}`}
                        className="carousel-bullet cursor-pointer"
                        key={index}
                      >
                        <Image src={image} alt="" height={50} width={50} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <h3 className="card-title">{product.price}</h3>
          <h3 className="card-title">{product.category}</h3>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary w-">Contact</button>
            <button className="btn btn-secondary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
