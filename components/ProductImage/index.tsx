import { Product } from "@/interface/Product";
import Image from "next/legacy/image";

function index({ products }: { products: Product }) {
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
