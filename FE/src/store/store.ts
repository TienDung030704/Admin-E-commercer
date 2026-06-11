import { configureStore } from "@reduxjs/toolkit";
import adminUsersReducer from "@/features/admin/adminUsersSlice";
import authReducer from "@/features/auth/authSlice";
import ordersReducer from "@/features/orders/ordersSlice";
import productsReducer from "@/features/products/productsSlice";
import vouchersReducer from "@/features/vouchers/vouchersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUsersReducer,
    orders: ordersReducer,
    products: productsReducer,
    vouchers: vouchersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
