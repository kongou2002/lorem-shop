import { plusQuantity, removeFromCart } from "@/store/slice/cart";
import { AppState } from "@/store/store";
import Image from "next/legacy/image";
import { type } from "os";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();
  const handleMinus = (id: string) => {
    dispatch({ type: removeFromCart, payload: id });
  };
  const handlePlus = (id: string) => {
    dispatch({ type: plusQuantity, payload: id });
  };
  return (
    <div>
      {cart.items.length != 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="w-10">
                    <Image
                      src={item.image}
                      alt={item.image}
                      
                    />
                  </div>
                </td>
                <td>{item.title}</td>

                <td className="flex justify-between">
                  <button onClick={() => handleMinus(item.id)}>-</button>{" "}
                  {item.quantity}{" "}
                  <button onClick={() => handlePlus(item.id)}>+</button>
                </td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h1>Cart is empty</h1>
        </div>
      )}
    </div>
  );
}

export default Cart;
