export type Payment = {
    id: string;
    shop_id: string;
    invoice_id: string;
    customer_id: string | null;
    amount: number;
    payment_method: 'cash' | 'card' | 'upi' | 'bank_transfer';
    transaction_id: string | null;
    notes: string | null;
    status: 'completed' | 'refunded';
    created_at: string;
};

export type PaymentFormData = {
    invoice_id: string;
    customer_id: string;
    amount: number;
    payment_method: 'cash' | 'card' | 'upi' | 'bank_transfer';
    transaction_id: string;
    notes: string;
};