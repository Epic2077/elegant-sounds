import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  code: number;
  title: string;
  color: string;
  price: number;
  quantity: number;
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
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
