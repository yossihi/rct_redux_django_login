import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import prodSlice from "../features/products/prodSlice";
import cartSlice from "../features/cart/cartSlice";


export const store = configureStore({
  reducer: {
    login: loginSlice,
    prod: prodSlice,
    cart: cartSlice 
  },
});
