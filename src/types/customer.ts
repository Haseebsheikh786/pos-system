export type Customer = {
    id: string;
    shop_id: string;
    name: string;
    phone: string;
    address?: string;
    customer_type: 'walk-in' | 'regular' | 'wholesale';
    total_due_amount: number;
    total_purchases: number;
    last_purchase_date?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
};

export type CustomerFormData = {
    name: string;
    phone: string;
    address: string;
    customer_type: 'walk-in' | 'regular' | 'wholesale';
    notes: string;
};