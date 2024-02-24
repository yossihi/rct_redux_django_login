import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProd, updProd, loadData, deleteProd, buyProd } from "./prodAPI";

const initialState = {
  loggedIn: sessionStorage.getItem("access") ? true : false,
  status: "idle",
  prods: [],
};

export const loadDataAsync = createAsyncThunk("products/loadData", async () => {
  const response = await loadData();
  return response.data;
});

export const deleteAsync = createAsyncThunk(
  "products/deleteProd",
  async (prodID) => {
    const response = await deleteProd(prodID);
    return response.data;
  }
);

export const addProdAsync = createAsyncThunk(
  "products/addProd",
  async (formData) => {
    const response = await addProd(formData);
    return response.data;
  }
);

export const updProdAsync = createAsyncThunk(
  "products/updProd",
  async (myData) => {
    const response = await updProd(myData.prodID, myData.formData);
    return response.data;
  }
);

export const buyProdAsync = createAsyncThunk(
  "products/buyProd",
  async (prodID) => {
    const response = await buyProd(prodID)
    return response.data
  }
)

export const loginSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {
    logOut: (state) => {
      sessionStorage.removeItem("access");
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDataAsync.fulfilled, (state, action) => {
      state.prods = action.payload;
      console.log(action.payload);
    });
  },
});

export const Products = (state) => state.prod.prods;
export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
