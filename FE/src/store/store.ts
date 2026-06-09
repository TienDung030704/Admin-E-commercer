import { configureStore } from "@reduxjs/toolkit";
import adminUsersReducer from "@/features/admin/adminUsersSlice";
import authReducer from "@/features/auth/authSlice";
import productsReducer from "@/features/products/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUsersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
