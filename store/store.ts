import { configureStore, ThunkAction, Action, Store } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";

const store = () => configureStore({
  reducer: {
  },
  devTools:true,
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
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });