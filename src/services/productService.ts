import { supabase } from '@/supabase-client';
import { Product, ProductFormData } from '@/types/product';

export class ProductService {
    static async getProducts(shopId: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('shop_id', shopId)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    static async getProduct(id: string, shopId: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .eq('shop_id', shopId)
            .single();

        if (error) return null;
        return data;
    }

    static async createProduct(shopId: string, productData: ProductFormData): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .insert([{
                shop_id: shopId,
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                cost_price: productData.cost_price ? parseFloat(productData.cost_price) : null,
                stock: parseInt(productData.stock),
                min_stock_level: parseInt(productData.min_stock_level),
                barcode: productData.barcode || null,
                sku: productData.sku || null,
                category: productData.category || null,
                image_url: productData.image_url || null,
                is_active: true,
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async updateProduct(id: string, shopId: string, productData: ProductFormData): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .update({
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                cost_price: productData.cost_price ? parseFloat(productData.cost_price) : null,
                stock: parseInt(productData.stock),
                min_stock_level: parseInt(productData.min_stock_level),
                barcode: productData.barcode || null,
                sku: productData.sku || null,
                category: productData.category || null,
                image_url: productData.image_url || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('shop_id', shopId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async deleteProduct(id: string, shopId: string): Promise<void> {
        // Soft delete by setting is_active to false
        const { error } = await supabase
            .from('products')
            .update({ is_active: false })
            .eq('id', id)
            .eq('shop_id', shopId);

        if (error) throw error;
    }

    static async searchProducts(shopId: string, query: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('shop_id', shopId)
            .eq('is_active', true)
            .or(`name.ilike.%${query}%,sku.ilike.%${query}%,barcode.ilike.%${query}%`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
}