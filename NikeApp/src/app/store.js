import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
