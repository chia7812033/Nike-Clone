import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deliveryPrice: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        (item) => item.product._id === newProduct._id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const product = action.payload.cartItem;
      const productIndex = state.items.findIndex(
        (item) => item.product._id === product.product._id
      );
      state.items[productIndex].quantity += action.payload.quantity;
      if (state.items[productIndex].quantity < 1) {
        state.items.splice(productIndex, 1);
      }
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, changeQuantity, clear } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLength = (state) => state.cart.items.length;
export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

export const selectSelf = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  selectSelf,
  selectSubtotal,
  (state, subtotal) =>
    subtotal > state.freeDeliveryFrom ? 0 : state.deliveryPrice
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery
);

export default cartSlice.reducer;
