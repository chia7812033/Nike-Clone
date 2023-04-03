import { createSlice } from "@reduxjs/toolkit";
import products from "../../assets/data/products";

const initialState = {
  products: products,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = state.products.find(
        (p) => p.id === action.payload
      );
    },
  },
});

export const { setSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSelectedProduct = (state) => state.products.selectedProduct

export default productsSlice.reducer;
