import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  code: number;
  title: string;
  color: string;
  price: number;
  quantity: number;
  image: string; // Added image field
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.code === action.payload.code
      );
      if (itemIndex >= 0) {
        // Item already in cart, increment quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item with all fields, including image
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ code: number }>) => {
      state.items = state.items.filter(
        (item) => item.code !== action.payload.code
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ code: number; quantity: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.code === action.payload.code
      );
      if (itemIndex >= 0) {
        // Ensure quantity is at least 1
        const newQuantity = Math.max(1, action.payload.quantity);
        state.items[itemIndex].quantity = newQuantity;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
