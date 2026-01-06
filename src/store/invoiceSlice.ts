import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Invoice, InvoiceItem, InvoiceFormData } from '@/types/invoice';
import { InvoiceService } from '@/services/invoiceService';

interface InvoiceState {
    invoices: Invoice[];
    currentInvoice: {
        invoice: Invoice | null;
        items: InvoiceItem[];
    };
    loading: boolean;
    error: string | null;
    saving: boolean;
    saveError: string | null;
}

const initialState: InvoiceState = {
    invoices: [],
    currentInvoice: {
        invoice: null,
        items: [],
    },
    loading: false,
    error: null,
    saving: false,
    saveError: null,
};

export const createInvoice = createAsyncThunk(
    'invoices/createInvoice',
    async ({ shopId, invoiceData }: { shopId: string; invoiceData: InvoiceFormData }, { rejectWithValue }) => {
        try {
            return await InvoiceService.createInvoice(shopId, invoiceData);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create invoice';
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await InvoiceService.getInvoices(shopId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch invoices';
            return rejectWithValue(errorMessage);
        }
    }
);

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        clearCurrentInvoice: (state) => {
            state.currentInvoice = {
                invoice: null,
                items: [],
            };
            state.saveError = null;
        },
        clearErrors: (state) => {
            state.error = null;
            state.saveError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Invoice
            .addCase(createInvoice.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.saving = false;
                state.currentInvoice = {
                    invoice: action.payload.invoice,
                    items: action.payload.items,
                };
                state.invoices.unshift(action.payload.invoice);
            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload as string;
            })
            // Fetch Invoices
            .addCase(fetchInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentInvoice, clearErrors } = invoiceSlice.actions;
export default invoiceSlice.reducer;