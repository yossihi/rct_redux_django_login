import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import prodSlice from "../features/products/prodSlice";


export const store = configureStore({
  reducer: {
    login: loginSlice,
    prod: prodSlice    
  },
});
