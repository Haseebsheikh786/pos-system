import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Payment, PaymentFormData } from '@/types/payment';
import { PaymentService } from '@/services/paymentService';

interface PaymentState {
    payments: Payment[];
    loading: boolean;
    error: string | null;
    saving: boolean;
    saveError: string | null;
}

const initialState: PaymentState = {
    payments: [],
    loading: false,
    error: null,
    saving: false,
    saveError: null,
};

export const createPayment = createAsyncThunk(
    'payments/createPayment',
    async ({ shopId, paymentData }: { shopId: string; paymentData: PaymentFormData }, { rejectWithValue }) => {
        try {
            return await PaymentService.createPayment(shopId, paymentData);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create payment';
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await PaymentService.getPayments(shopId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payments';
            return rejectWithValue(errorMessage);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
            state.saveError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Payment
            .addCase(createPayment.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.saving = false;
                state.payments.unshift(action.payload);
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload as string;
            })
            // Fetch Payments
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearErrors } = paymentSlice.actions;
export default paymentSlice.reducer;