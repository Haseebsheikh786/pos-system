import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerFormData } from '@/types/customer';
import { CustomerService } from '@/services/customerService';

interface CustomersState {
    items: Customer[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: CustomersState = {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
};

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await CustomerService.getCustomers(shopId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch customers';
            return rejectWithValue(errorMessage);
        }
    }
);

export const createCustomer = createAsyncThunk(
    'customers/createCustomer',
    async ({ shopId, customerData }: { shopId: string; customerData: CustomerFormData }, { rejectWithValue }) => {
        try {
            return await CustomerService.createCustomer(shopId, customerData);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create customer';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, shopId, customerData }: { id: string; shopId: string; customerData: CustomerFormData }, { rejectWithValue }) => {
        try {
            return await CustomerService.updateCustomer(id, shopId, customerData);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update customer';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async ({ id, shopId }: { id: string; shopId: string }, { rejectWithValue }) => {
        try {
            await CustomerService.deleteCustomer(id, shopId);
            return id;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete customer';
            return rejectWithValue(errorMessage);
        }
    }
);

export const searchCustomers = createAsyncThunk(
    'customers/searchCustomers',
    async ({ shopId, query }: { shopId: string; query: string }, { rejectWithValue }) => {
        try {
            if (!query.trim()) {
                return await CustomerService.getCustomers(shopId);
            }
            return await CustomerService.searchCustomers(shopId, query);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to search customers';
            return rejectWithValue(errorMessage);
        }
    }
);

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearCustomers: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Customers
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Customer
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Customer
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(c => c.id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Search Customers
            .addCase(searchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(searchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, clearCustomers } = customersSlice.actions;
export default customersSlice.reducer;