import { Product } from './product';

export type InventoryItem = Product;                      

export type StockStatus = 'critical' | 'low' | 'normal' | 'good';

export type StockUpdateData = {
    productId: string;
    adjustment: number;
    reason: 'sale' | 'return' | 'damage' | 'purchase' | 'adjustment';
    notes?: string;
};

export type InventoryStats = {
    totalItems: number;
    lowStockItems: number;
    criticalStockItems: number;
    outOfStockItems: number;
    totalStockValue: number;
    itemsNeedingRestock: number;
};