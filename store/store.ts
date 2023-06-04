import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import cartReducer from "./slice/cart";
import authReducer from "./slice/auth";

const store = () => configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
})
export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
const makeStore = (context: Context) => store();
export const wrapper = createWrapper<AppStore>(makeStore);