import React from "react";

function Cart() {
  return <div>Cart</div>;
}

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <>{page}</>
      <h1></h1>
    </>
  );
};

export default Cart;
