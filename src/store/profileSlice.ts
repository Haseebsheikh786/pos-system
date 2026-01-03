import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileFormData } from '@/types/profile';
import { ProfileService } from '@/services/profileService';

interface ProfileState {
    profile: Profile | null;
    loading: boolean;
    error: string | null;
    saving: boolean;
    saveError: string | null;
    logoUploading: boolean;
    logoUploadError: string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
    saving: false,
    saveError: null,
    logoUploading: false,
    logoUploadError: null,
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            return await ProfileService.getProfile(userId);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, profileData }: { userId: string; profileData: ProfileFormData }, { rejectWithValue }) => {
        try {
            return await ProfileService.updateProfile(userId, profileData);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            return rejectWithValue(errorMessage);
        }
    }
);

export const uploadLogo = createAsyncThunk(
    'profile/uploadLogo',
    async ({ file, userId }: { file: File; userId: string }, { rejectWithValue }) => {
        try {
            const logoUrl = await ProfileService.uploadLogo(file, userId);
            return { logoUrl };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload logo';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteLogo = createAsyncThunk(
    'profile/deleteLogo',
    async (userId: string, { rejectWithValue }) => {
        try {
            await ProfileService.deleteLogo(userId);
            return { success: true };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete logo';
            return rejectWithValue(errorMessage);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
            state.error = null;
            state.saveError = null;
            state.logoUploadError = null;
        },
        updateProfileLocal: (state, action: PayloadAction<Partial<Profile>>) => {
            if (state.profile) {
                state.profile = { ...state.profile, ...action.payload };
            }
        },
        clearErrors: (state) => {
            state.error = null;
            state.saveError = null;
            state.logoUploadError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.saving = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload as string;
            })
            // Upload Logo
            .addCase(uploadLogo.pending, (state) => {
                state.logoUploading = true;
                state.logoUploadError = null;
            })
            .addCase(uploadLogo.fulfilled, (state, action) => {
                state.logoUploading = false;
                if (state.profile) {
                    state.profile.shop_logo_url = action.payload.logoUrl;
                }
            })
            .addCase(uploadLogo.rejected, (state, action) => {
                state.logoUploading = false;
                state.logoUploadError = action.payload as string;
            })
            // Delete Logo
            .addCase(deleteLogo.fulfilled, (state) => {
                if (state.profile) {
                    state.profile.shop_logo_url = undefined;
                }
            });
    },
});

export const { clearProfile, updateProfileLocal, clearErrors } = profileSlice.actions;
export default profileSlice.reducer;