import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import customerReducer from './customerSlice';
import inventoryReducer from './inventorySlice';
import profileReducer from './profileSlice';
import paymentReducer from './paymentSlice';
import invoiceReducer from './invoiceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        customers: customerReducer,
        inventory: inventoryReducer,
        profile: profileReducer,
        payment: paymentReducer,
        invoices: invoiceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;