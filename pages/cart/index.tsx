import React, { ReactElement } from "react";
import CartTable from "@/components/CartTable";

function Cart() {
  return (
    <div className="flex justify-center min-h-full">
      <CartTable />
    </div>
  );
}

// Cart.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <>
//       <>{page}</>
//       <h1></h1>
//     </>
//   );
// };

export default Cart;
