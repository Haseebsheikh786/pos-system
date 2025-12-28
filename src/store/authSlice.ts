import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/supabase-client';

interface User {
    id: string;
    email?: string | null;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
    error: null,
};

// Simple async thunk
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;
    return session?.user || null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            });
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;