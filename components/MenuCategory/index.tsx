import React from "react";

function MenuCategory(props: Product.Category) {
  return (
    <div>
      <button
        className="bg-gradient-random btn btn-ghost btn-sm rounded-btn"
        onClick={() => {
          console.log("click");
        }}
      >
        <span className="text-sm">All</span>
      </button>
    </div>
  );
}

export default MenuCategory;
