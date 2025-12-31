export type Product = {
    id: string;
    shop_id: string;
    name: string;
    description?: string;
    price: number;
    cost_price?: number;
    stock: number;
    min_stock_level: number;
    barcode?: string;
    sku?: string;
    category?: string;
    image_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type ProductFormData = {
    name: string;
    description: string;
    price: string;
    cost_price: string;
    stock: string;
    min_stock_level: string;
    barcode: string;
    sku: string;
    category: string;
    image_url: string;
};