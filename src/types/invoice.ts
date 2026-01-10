export type Invoice = {
    id: string;
    shop_id: string;
    customer_id: string | null;
    invoice_number: string;
    invoice_date: string;
    customer_name: string | null;
    customer_phone: string | null;
    subtotal: number;
    discount_amount: number;
    tax_amount: number;
    total: number;
    payment_status: 'pending' | 'partial' | 'paid' | 'cancelled';
    amount_paid: number;
    due_amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    notes: string | null;
    items: Array<InvoiceItem> | null;
    created_at: string;
    updated_at: string;
};

export type InvoiceItem = {
    id: string;
    invoice_id: string;
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    price: number;
    created_at: string;
};

export type InvoiceFormData = {
    customer_id: string | null;
    customer_name: string;
    invoice_number: string;
    items: InvoiceItemInput[];
    subtotal: number;
    discount_amount: number;
    tax_amount: number;
    total: number;
    payment_amount: number;
};

export type InvoiceItemInput = {
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    total: number;
};

export interface InvoiceFilters {
    shopId: string;
    // Date filters - can use either dateRange OR startDate/endDate
    dateRange?: 'today' | 'yesterday' | 'last-7-days' | 'this-month' | 'all';
    startDate?: Date;
    endDate?: Date;
    // Status filters
    paymentStatus?: 'paid' | 'partial' | 'pending' | 'all';
    customerId?: string;
    // Pagination
    page?: number;
    limit?: number;
    // Search
    searchQuery?: string;
    // Sorting
    sortBy?: 'created_at' | 'total' | 'invoice_number';
    sortOrder?: 'asc' | 'desc';
}