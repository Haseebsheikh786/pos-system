import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { InventoryStats } from '@/types/inventory';
import { InventoryService } from '@/services/inventoryService';

interface InventoryState {
    items: Product[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    stats: InventoryStats | null;
    statsLoading: boolean;
    statsError: string | null;
}

const initialState: InventoryState = {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    stats: null,
    statsLoading: false,
    statsError: null,
};

export const fetchInventory = createAsyncThunk(
    'inventory/fetchInventory',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await InventoryService.getInventory(shopId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory';
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchInventoryStats = createAsyncThunk(
    'inventory/fetchInventoryStats',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await InventoryService.getInventoryStats(shopId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory stats';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateStock = createAsyncThunk(
    'inventory/updateStock',
    async ({ productId, shopId, newStock }: { productId: string; shopId: string; newStock: number }, { rejectWithValue }) => {
        try {
            return await InventoryService.updateStock(productId, shopId, newStock);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update stock';
            return rejectWithValue(errorMessage);
        }
    }
);

export const searchInventory = createAsyncThunk(
    'inventory/searchInventory',
    async ({ shopId, query }: { shopId: string; query: string }, { rejectWithValue }) => {
        try {
            if (!query.trim()) {
                return await InventoryService.getInventory(shopId);
            }
            return await InventoryService.searchInventory(shopId, query);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to search inventory';
            return rejectWithValue(errorMessage);
        }
    }
);

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearInventory: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
            state.stats = null;
        },
        updateItemInInventory: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Inventory
            .addCase(fetchInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch Stats
            .addCase(fetchInventoryStats.pending, (state) => {
                state.statsLoading = true;
                state.statsError = null;
            })
            .addCase(fetchInventoryStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchInventoryStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.statsError = action.payload as string;
            })
            // Update Stock
            .addCase(updateStock.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Search Inventory
            .addCase(searchInventory.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(searchInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    clearInventory,
    updateItemInInventory
} = inventorySlice.actions;

export default inventorySlice.reducer;