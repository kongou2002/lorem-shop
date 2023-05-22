import { category, CategorySubcategory } from "@prisma/client";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
type props = {
  category: Array<category>;
  loading?: (loading: boolean) => void;
  isOpen?: (isOpen: boolean) => void | boolean;
};

function renderSubcategories(
  subcategory: CategorySubcategory | null,
  isOpen: boolean,
  //type is the index of subcategory
  type: "Color" | "size",
  category: string,
  router: NextRouter,
  loading?: (loading: boolean) => void,
  isOpenCallback?: (isOpen: boolean) => void | boolean
) {
  if (subcategory && subcategory[type]) {
    return (
      <ul className="ml-5">
        <li>
          <button onClick={() => isOpenCallback?.(!isOpen)}>{type}</button>
        </li>
        {isOpen &&
          subcategory[type].map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/products",
                    query: {
                      category: category,
                      subcategory: item,
                    },
                  });
                  loading?.(false);
                  isOpenCallback?.(false);
                }}
              >
                {item}
              </button>
            </li>
          ))}
      </ul>
    );
  }
  return null;
}

function LeftMenu({ category, loading, isOpen }: props) {
  const router = useRouter();
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false);
  const [isOpenSize, setIsOpenSize] = useState<boolean>(false);

  return (
    <div className="flex flex-col rounded-lg">
      <div className="text-center">
        <h1 className="">Category</h1>
      </div>
      {category.map((item) => (
        <div key={item.name} className="mt-5 menu">
          <ul className="">
            <li>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/products",
                    query: { category: item.name },
                  });
                  loading?.(false);
                  isOpen?.(false);
                }}
              >
                {item.name}
              </button>
              {renderSubcategories(
                item.subcategory,
                isOpenColor,
                "Color",
                item.name,
                router,
                loading,
                setIsOpenColor
              )}
              {renderSubcategories(
                item.subcategory,
                isOpenSize,
                "size",
                item.name,
                router,
                loading,
                setIsOpenSize
              )}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LeftMenu;
