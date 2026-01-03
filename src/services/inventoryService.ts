import { supabase } from '@/supabase-client';
import { Product } from '@/types/product';
import { InventoryStats, StockUpdateData } from '@/types/inventory';

export class InventoryService {
    static async getInventory(shopId: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('shop_id', shopId)
            .eq('is_active', true)
            .order('stock', { ascending: true }) // Show low stock items first
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    static async updateStock(productId: string, shopId: string, newStock: number): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .update({
                stock: newStock,
                updated_at: new Date().toISOString(),
            })
            .eq('id', productId)
            .eq('shop_id', shopId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async getInventoryStats(shopId: string): Promise<InventoryStats> {
        const { data: products, error } = await supabase
            .from('products')
            .select('id, name, price, stock, min_stock_level')
            .eq('shop_id', shopId)
            .eq('is_active', true);

        if (error) throw error;

        const totalItems = products?.length || 0;
        const lowStockItems = products?.filter(p => p.stock <= p.min_stock_level).length || 0;
        const criticalStockItems = products?.filter(p => p.stock < 10).length || 0;
        const outOfStockItems = products?.filter(p => p.stock === 0).length || 0;
        const totalStockValue = products?.reduce((sum, p) => sum + (p.price * p.stock), 0) || 0;
        const itemsNeedingRestock = products?.filter(p => p.stock <= p.min_stock_level).length || 0;

        return {
            totalItems,
            lowStockItems,
            criticalStockItems,
            outOfStockItems,
            totalStockValue,
            itemsNeedingRestock,
        };
    }

    static async searchInventory(shopId: string, query: string): Promise<Product[]> {
        const sanitizedQuery = query.trim();

        if (!sanitizedQuery) {
            return this.getInventory(shopId);
        }

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('shop_id', shopId)
            .eq('is_active', true)
            .or(`name.ilike.%${sanitizedQuery}%,sku.ilike.%${sanitizedQuery}%,category.ilike.%${sanitizedQuery}%`)
            .order('stock', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
}