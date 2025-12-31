import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import customerReducer from './customerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        customers: customerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;