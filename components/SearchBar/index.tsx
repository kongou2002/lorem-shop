import React from "react";
import { PrismaClient, product } from "@prisma/client";
import Link from "next/link";

export async function getServerSideProps(key: string) {
  const req = await fetch(`/api/products/search?key=${key}`);
  const data = await req.json();
  return data;
}

function SearchField() {
  const [search, setSearch] = React.useState<string>("");
  //featch data from api
  const [products, setProducts] = React.useState(
    ([] as Array<product>) || null
  );
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getServerSideProps(search);
      setProducts(result);
    };
    fetchData();
  }, [search]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative">
      <div className="form-control ">
        <input
          type="text"
          placeholder="Search"
          className="input-bordered input"
          value={search}
          onChange={handleChange}
        />
      </div>
      {search && (
        <div className="absolute w-full bg-white border border-gray-200 z-30">
          {products.length > 0 ? (
            <ul className="list-none p-2">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    onClick={() => {
                      setSearch("");
                    }}
                    href={`/products/${product.id}`}
                  >
                    {product.title} - {product.price}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchField;
