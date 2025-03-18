import { PaymentMethod } from "@/types/Profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentMethodsState {
  methods: PaymentMethod[];
}

const initialState: PaymentMethodsState = {
  methods: [],
};

const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.methods.push(action.payload);
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      state.methods = state.methods.filter(
        (method) => method.last4 !== action.payload
      );
    },
    updatePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      const index = state.methods.findIndex(
        (method) => method.last4 === action.payload.last4
      );
      if (index !== -1) {
        state.methods[index] = action.payload;
      }
    },
  },
});

export const { addPaymentMethod, removePaymentMethod, updatePaymentMethod } =
  paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
