import { product } from "@prisma/client";
import Link from "next/link";
import React from "react";

type props = {
  category: Array<product>;
  onClick: (category: string | null) => void;
};

function LeftMenu({ category, onClick }: props) {
  return (
    <div className="flex flex-col border h-full rounded-lg">
      <div className="text-center">
        <h1 className="">Category</h1>
      </div>
      {category.map((item) => (
        <div key={item.category} className="mt-5 menu">
          <ul
            className=""
            onClick={() => {
              onClick(item.category);
            }}
          >
            <li>
              <button>{item.category}</button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LeftMenu;
