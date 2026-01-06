import { supabase } from '@/supabase-client';
import { Invoice, InvoiceItem, InvoiceFormData, InvoiceItemInput } from '@/types/invoice';
import { Payment } from '@/types/payment';

export class InvoiceService {
    static async createInvoice(shopId: string, invoiceData: InvoiceFormData): Promise<{ invoice: Invoice; items: InvoiceItem[]; payment?: Payment }> {
        let createdInvoice: Invoice | null = null;
        let createdPayment: Payment | null = null;

        try {
            // Calculate payment status
            const paymentStatus = this.calculatePaymentStatus(
                invoiceData.total_amount,
                invoiceData.payment_amount
            );

            // 1. Create invoice
            const { data: invoice, error: invoiceError } = await supabase
                .from('invoices')
                .insert([{
                    shop_id: shopId,
                    customer_id: invoiceData.customer_id,
                    customer_name: invoiceData.customer_name || null,
                    customer_phone: null,
                    total: invoiceData.total_amount,
                    invoice_number: invoiceData.invoice_number,
                    payment_status: paymentStatus,
                    amount_paid: invoiceData.payment_amount,
                    status: 'completed',
                }])
                .select()
                .single();

            if (invoiceError) throw invoiceError;
            createdInvoice = invoice;

            // 2. Create invoice items
            const invoiceItems = invoiceData.items.map(item => ({
                invoice_id: invoice.id,
                product_id: item.product_id,
                product_name: item.product_name,
                product_price: item.price,
                price: item.price,
                quantity: item.quantity,
            }));

            const { data: items, error: itemsError } = await supabase
                .from('invoice_items')
                .insert(invoiceItems)
                .select();

            if (itemsError) {
                // Rollback invoice creation
                await supabase.from('invoices').delete().eq('id', invoice.id);
                throw itemsError;
            }

            // 3. Create payment record if payment amount > 0
            if (invoiceData.payment_amount > 0) {
                const { data: payment, error: paymentError } = await supabase
                    .from('payments')
                    .insert([{
                        shop_id: shopId,
                        invoice_id: invoice.id,
                        customer_id: invoiceData.customer_id,
                        amount: invoiceData.payment_amount,
                        method: 'cash',
                    }])
                    .select()
                    .single();

                if (paymentError) {
                    console.error('Payment creation error:', paymentError);
                } else {
                    createdPayment = payment;
                }
            }

            // 4. Update product stock
            await this.updateProductStock(shopId, invoiceData.items);

            if (!createdInvoice) {
                throw new Error('Invoice creation failed');
            }


            return {
                invoice: createdInvoice,
                items: items || [],
                payment: createdPayment ?? undefined,
            };

        } catch (error) {
            // Cleanup on any error
            if (createdInvoice) {
                await supabase.from('invoices').delete().eq('id', createdInvoice.id);
            }
            throw error;
        }
    }

    static async updateProductStock(shopId: string, items: InvoiceItemInput[]): Promise<void> {
        for (const item of items) {
            // Get current stock
            const { data: product } = await supabase
                .from('products')
                .select('stock')
                .eq('id', item.product_id)
                .eq('shop_id', shopId)
                .single();

            if (product) {
                const newStock = product.stock - item.quantity;

                await supabase
                    .from('products')
                    .update({
                        stock: newStock,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', item.product_id)
                    .eq('shop_id', shopId);
            }
        }
    }

    static calculatePaymentStatus(totalAmount: number, paidAmount: number): 'pending' | 'partial' | 'paid' {
        if (paidAmount >= totalAmount) return 'paid';
        if (paidAmount > 0) return 'partial';
        return 'pending';
    }

    static async getInvoices(shopId: string): Promise<Invoice[]> {
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .eq('shop_id', shopId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    static async getInvoice(id: string, shopId: string): Promise<{ invoice: Invoice; items: InvoiceItem[] }> {
        const { data: invoice, error: invoiceError } = await supabase
            .from('invoices')
            .select('*')
            .eq('id', id)
            .eq('shop_id', shopId)
            .single();

        if (invoiceError) throw invoiceError;

        const { data: items, error: itemsError } = await supabase
            .from('invoice_items')
            .select('*')
            .eq('invoice_id', id)
            .order('created_at', { ascending: true });

        if (itemsError) throw itemsError;

        return { invoice, items: items || [] };
    }
}