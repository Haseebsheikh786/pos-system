import { supabase } from '@/supabase-client';
import { Invoice, InvoiceItem, InvoiceFormData, InvoiceItemInput, InvoiceFilters } from '@/types/invoice';
import { Payment } from '@/types/payment';

export class InvoiceService {
    static async createInvoice(shopId: string, invoiceData: InvoiceFormData): Promise<{ invoice: Invoice; items: InvoiceItem[]; payment?: Payment }> {
        let createdInvoice: Invoice | null = null;
        let createdPayment: Payment | null = null;

        try {
            // Calculate payment status
            const paymentStatus = this.calculatePaymentStatus(
                invoiceData.total,
                invoiceData.payment_amount
            );

            const customerId = invoiceData.customer_id && invoiceData.customer_id.trim() !== ""
                ? invoiceData.customer_id
                : null;

            // Handle customer name - use "Walk-in Customer" if null/empty
            const customerName = invoiceData.customer_name?.trim() || "Walk-in Customer";

            // 1. Create invoice
            const { data: invoice, error: invoiceError } = await supabase
                .from('invoices')
                .insert([{
                    shop_id: shopId,
                    customer_id: customerId,
                    customer_name: customerName,
                    customer_phone: null,
                    total: invoiceData.total,
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
                        customer_id: customerId,
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

    static async getInvoices(filters: InvoiceFilters): Promise<Invoice[]> {
        const {
            shopId,
            dateRange = 'all',
            startDate,
            endDate,
            paymentStatus,
            customerId,
            page = 1,
            limit,
            searchQuery,
            sortBy = 'created_at',
            sortOrder = 'desc',
        } = filters;

        // Build query
        let query = supabase
            .from('invoices')
            .select(`
            *,
            invoice_items (
                id,
                product_id,
                product_name,
                product_price,
                price,
                quantity,
                created_at
            )
        `)
            .eq('shop_id', shopId);

        // Apply date filters
        if (dateRange !== 'all' || startDate || endDate) {
            let finalStartDate: Date | undefined;
            let finalEndDate: Date | undefined;
            const now = new Date();

            switch (dateRange) {
                case 'today':
                    finalStartDate = new Date(now);
                    finalStartDate.setHours(0, 0, 0, 0);
                    finalEndDate = new Date(now);
                    finalEndDate.setHours(23, 59, 59, 999);
                    break;

                case 'yesterday':
                    finalStartDate = new Date(now);
                    finalStartDate.setDate(finalStartDate.getDate() - 1);
                    finalStartDate.setHours(0, 0, 0, 0);
                    finalEndDate = new Date(finalStartDate);
                    finalEndDate.setHours(23, 59, 59, 999);
                    break;

                case 'last-7-days':
                    finalStartDate = new Date(now);
                    finalStartDate.setDate(finalStartDate.getDate() - 7);
                    finalStartDate.setHours(0, 0, 0, 0);
                    finalEndDate = new Date(now);
                    finalEndDate.setHours(23, 59, 59, 999);
                    break;

                case 'this-month':
                    finalStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    finalStartDate.setHours(0, 0, 0, 0);
                    finalEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    finalEndDate.setHours(23, 59, 59, 999);
                    break;

                case 'all':
                    // For 'all', use custom dates if provided
                    finalStartDate = startDate;
                    finalEndDate = endDate;
                    break;

                default:
                    // For any other value, check if start/end dates were provided
                    finalStartDate = startDate;
                    finalEndDate = endDate;
                    break;
            }

            // Use provided custom dates if available (overrides dateRange logic)
            if (startDate) finalStartDate = startDate;
            if (endDate) finalEndDate = endDate;

            // Apply date filters to query
            if (finalStartDate) {
                query = query.gte('created_at', finalStartDate.toISOString());
            }
            if (finalEndDate) {
                query = query.lte('created_at', finalEndDate.toISOString());
            }
        }

        // Apply status filters
        if (paymentStatus && paymentStatus !== 'all') {
            query = query.eq('payment_status', paymentStatus);
        }

        // Apply customer filter
        if (customerId && customerId !== 'all') {
            query = query.eq('customer_id', customerId);
        }

        // Apply search filter
        if (searchQuery) {
            query = query.or(
                `invoice_number.ilike.%${searchQuery}%,customer_name.ilike.%${searchQuery}%,customer_phone.ilike.%${searchQuery}%`
            );
        }

        // Apply sorting
        query = query.order(sortBy, { ascending: sortOrder === 'asc' });

        // Apply pagination
        if (limit) {
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Transform to match your Invoice type with items
        return (data || []).map(invoice => {
            const { invoice_items, ...invoiceData } = invoice;
            return {
                ...invoiceData,
                items: invoice_items || []
            };
        });
    }
}