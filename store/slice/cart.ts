import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

interface CartState {
  items: { id: string; title: string; price: number; quantity: number,image:string }[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: string; title: string; price: number,image:string }>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;

      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      // calculate total price and mutiply by quantity
      state.totalPrice += newItem.price;
      // on add success, show toast
        toast.success('Add to cart successfully!');
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }

        state.totalPrice -= existingItem.price;
      }
    },
    plusQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalPrice += existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, plusQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;