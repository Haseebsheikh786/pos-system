import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { ProductService } from '@/services/productService';

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await ProductService.getProducts(shopId);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async ({ shopId, productData }: { shopId: string; productData: any }, { rejectWithValue }) => {
        try {
            return await ProductService.createProduct(shopId, productData);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, shopId, productData }: { id: string; shopId: string; productData: any }, { rejectWithValue }) => {
        try {
            return await ProductService.updateProduct(id, shopId, productData);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({ id, shopId }: { id: string; shopId: string }, { rejectWithValue }) => {
        try {
            await ProductService.deleteProduct(id, shopId);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async ({ shopId, query }: { shopId: string; query: string }, { rejectWithValue }) => {
        try {
            if (!query.trim()) {
                return await ProductService.getProducts(shopId);
            }
            return await ProductService.searchProducts(shopId, query);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearProducts: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            })
            // Search Products
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;