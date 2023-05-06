import ProductImage from "@/components/ProductImage";
import { Product } from "@/interface/Product";
import handle from "@/pages/api/auth/login";
import { product } from "@prisma/client";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
interface Props {
  product: Array<product>;
  loading: boolean;
}

function View({ product, loading }: Props) {
  const [products, setProducts] = useState<Array<product>>([]);
  const [hoveredProductId, setHoveredProductId] = useState<number>(-1);
  useEffect(() => {
    setProducts(product);
  }, [product]);
  const handleMouseOver = (e: SyntheticEvent) => {
    const productId = Number(e.currentTarget.getAttribute("data-product-id"));
    setHoveredProductId(productId); // 2. Update the state
  };
  const handleMouseOut = (e: SyntheticEvent) => {
    setHoveredProductId(-1); // 2. Update the state
  };
  return (
    <>
      {!loading ? (
        <progress className="progress w-56"></progress>
      ) : (
        <>
          {products.map((item, index) => (
            <>
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                key={index}
                className="card-hover relative "
                data-product-id={index}
              >
                <div className="hover:opacity-60">
                  <Link href={`/products/${item.id}`}>
                    <ProductImage products={item} />
                  </Link>
                  <div className="text-left">
                    <title>{item.title}</title>
                    <Link href={`/product/${item.id}`}>
                      <h2>{item.title}</h2>
                    </Link>
                    <div className="mt-4">
                      {item.discountPercentage > 0 ? (
                        <>
                          <div className="flex">
                            <p className="line-through">{item.price} đ</p>
                          </div>
                          <div>
                            <p className="">
                              {item.price -
                                (item.discountPercentage / 100) *
                                  item.price}{" "}
                              đ
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex">
                          <p className="w-5/6">{item.price} đ</p>
                        </div>
                      )}
                    </div>
                    {/* <div className="flex absolute right-0">
                    {item.color.length > 0 &&
                      item.color.map((color, index) => (
                        <div key={index} className="flex items-center flex-col">
                          <label
                            htmlFor={`color-${index}`}
                            className="ml-2 w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          ></label>
                          <input
                            type="radio"
                            name="color"
                            placeholder="color"
                            value={color}
                            id={`color-${index}`}
                          />
                        </div>
                      ))}
                  </div> */}
                  </div>
                </div>
                {/* {hoveredProductId === index ? (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <button className="bg-primary text-white p-2 rounded-md">
                      Add to cart
                    </button>
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default View;
