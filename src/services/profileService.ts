import { supabase } from '@/supabase-client';
import { Profile, ProfileFormData } from '@/types/profile';

export class ProfileService {
    static async getProfile(userId: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        return data;
    }

    static async updateProfile(userId: string, profileData: ProfileFormData): Promise<Profile> {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                business_name: profileData.business_name,
                business_address: profileData.business_address || null,
                phone: profileData.phone || null,
                email: profileData.email || null,
                invoice_footer_text: profileData.invoice_footer_text || null,
                shop_logo_url: profileData.shop_logo_url || null,
                business_type: profileData.business_type || null,
                currency: profileData.currency || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async uploadLogo(file: File, userId: string): Promise<string> {
        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${fileExt}`;
        const filePath = `shop-logos/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError, data } = await supabase.storage
            .from('shop-assets')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
            });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('shop-assets')
            .getPublicUrl(filePath);

        // Update profile with new logo URL
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                shop_logo_url: publicUrl,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (updateError) throw updateError;

        return publicUrl;
    }

    static async deleteLogo(userId: string): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({
                shop_logo_url: null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) throw error;
    }
}