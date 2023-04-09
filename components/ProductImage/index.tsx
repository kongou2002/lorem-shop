import { Product } from "@/interface/Product";
import { product } from "@prisma/client";
import Image from "next/legacy/image";

function index({ products }: { products: product }) {
  return (
    <>
      <Image
        src={products.thumbnail}
        width={300}
        height={300}
        objectFit="fill"
        alt={products.title}
        className="rounded-lg"
      />
    </>
  );
}

export default index;
