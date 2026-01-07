import { supabase } from '@/supabase-client';
import { Payment, PaymentFormData } from '@/types/payment';
import { InvoiceService } from '@/services/invoiceService';

export class PaymentService {
    static async createPayment(shopId: string, paymentData: PaymentFormData): Promise<Payment> {
        // Create payment
        const { data: payment, error: paymentError } = await supabase
            .from('payments')
            .insert([{
                shop_id: shopId,
                invoice_id: paymentData.invoice_id,
                customer_id: paymentData.customer_id,
                amount: paymentData.amount,
                method: 'cash',
            }])
            .select()
            .single();

        if (paymentError) throw paymentError;

        // Update invoice payment status
        await this.updateInvoicePaymentStatus(paymentData.invoice_id, shopId);

        return payment;
    }

    static async updateInvoicePaymentStatus(invoiceId: string, shopId: string): Promise<void> {
        // Get total payments for this invoice
        const { data: payments } = await supabase
            .from('payments')
            .select('amount')
            .eq('invoice_id', invoiceId)
            .eq('shop_id', shopId);

        const totalPaid = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

        // Get invoice total
        const { data: invoice } = await supabase
            .from('invoices')
            .select('total')
            .eq('id', invoiceId)
            .eq('shop_id', shopId)
            .single();

        if (!invoice) return;

        // Calculate new payment status
        const paymentStatus = InvoiceService.calculatePaymentStatus(invoice.total, totalPaid);

        // Update invoice
        await supabase
            .from('invoices')
            .update({
                payment_status: paymentStatus,
                amount_paid: totalPaid,
                updated_at: new Date().toISOString(),
            })
            .eq('id', invoiceId)
            .eq('shop_id', shopId);
    }

    static async getInvoicePayments(invoiceId: string, shopId: string): Promise<Payment[]> {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('invoice_id', invoiceId)
            .eq('shop_id', shopId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
}