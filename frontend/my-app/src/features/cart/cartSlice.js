import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { getCart, unBuy } from "./cartAPI";

const initialState = {
  loggedIn: sessionStorage.getItem("access") ? true : false,
  status: "idle",
  myCart: [],
};

export const getCartAsync = createAsyncThunk("cart/getCart", async () => {
  const response = await getCart();
  return response.data;
});

export const unBuyAsync = createAsyncThunk("cart/unBuy", async (prodID) => {
  const response = await unBuy(prodID);
  return response.data
});
  

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    logOut: (state) => {
      sessionStorage.removeItem("access");
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      state.myCart = action.payload;
      console.log(state.myCart);
    });
  },
});

export const selectCart = (state) => (state.cart ? state.cart.myCart : []);

export const memoizedSelectCart = createSelector(
  [selectCart],
  (myCart) => myCart
);

export default cartSlice.reducer;
