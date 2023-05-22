import { addToCart } from "@/store/slice/cart";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../interface/Product";
import { toast } from "react-toastify";
async function getServerSide(id: string) {
  //get data from prisma
  const res = await fetch(`/api/products/details?id=${id}`);
  const data = await res.json();
  return data;
}

function Details() {
  const router = useRouter();
  //use cart reducer
  const dispatch = useDispatch();
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
  const handleAddToCart = () => {
    //dispatch action to add to cart product id
    const data = {
      id: product!.id,
      title: product!.title,
      price: product!.price,
    };
    dispatch(addToCart(data));
  };
  if (!product) return <div>Loading...</div>;
  return (
    <div className="container mx-auto max-h-full">
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
            <button onClick={handleAddToCart} className="btn btn-secondary">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
