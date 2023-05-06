import { product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

type props = {
  category: Array<product>;
};

function MenuCategory({ category }: props) {
  const router = useRouter();
  const randomGradient = () => {
    const colors = [
      "bg-gradient-to-r from-green-400 to-blue-500",
      "bg-gradient-to-r from-pink-500 to-yellow-500",
      "bg-gradient-to-r from-purple-400 to-pink-500",
      "bg-gradient-to-r from-yellow-400 to-red-500",
    ];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-2 p-2">
      {category.map((item, index) => {
        return (
          <div key={index} className="">
            <button
              className={`btn btn-ghost btn-sm rounded-2xl ${randomGradient()}`}
              onClick={() => {
                router.push({
                  pathname: "/products",
                  query: { category: item.category_name },
                });
              }}
            >
              <span className="text-sm text-base-100">
                {item?.category_name}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MenuCategory;
