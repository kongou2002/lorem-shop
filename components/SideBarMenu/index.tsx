import { product } from "@prisma/client";
import { useRouter } from "next/router";

type props = {
  category: Array<product>;
  loading?: (loading: boolean) => void;
};

function LeftMenu({ category, loading }: props) {
  const router = useRouter();
  return (
    <div className="flex flex-col rounded-lg">
      <div className="text-center">
        <h1 className="">Category</h1>
      </div>
      {category.map((item) => (
        <div key={item.category_name} className="mt-5 menu">
          <ul className="">
            <li>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/products",
                    query: { category: item.category_name },
                  });
                  loading?.(false);
                }}
              >
                {item.category_name}
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LeftMenu;
