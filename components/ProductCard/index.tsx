import ProductImage from "@/components/ProductImage";
import { Product } from "@/interface/Product";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import ColorRadio from "../ColorRadio";

interface Props {
  product: Array<Product>;
  loading: boolean;
}

function View({ product, loading }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    setProducts(product);
  }, [product]);
  return (
    <>
      {!loading ? (
        <div>loading</div>
      ) : (
        <>
          {products.map((item, index) => (
            <div key={index} className="p-2 rounded-lg m-2 bg-base-200">
              <Link href={`/product/${item.id}`}>
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
                        <p className="line-through w-5/6">{item.price} đ</p>
                      </div>
                      <div>
                        <p className="">
                          {item.price -
                            (item.discountPercentage / 100) * item.price}{" "}
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
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default View;
