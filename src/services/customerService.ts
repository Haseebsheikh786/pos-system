import { supabase } from '@/supabase-client';
import { Customer, CustomerFormData } from '@/types/customer';

export class CustomerService {
    static async getCustomers(shopId: string): Promise<Customer[]> {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('shop_id', shopId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    static async getCustomer(id: string, shopId: string): Promise<Customer | null> {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('id', id)
            .eq('shop_id', shopId)
            .single();

        if (error) return null;
        return data;
    }

    static async createCustomer(shopId: string, customerData: CustomerFormData): Promise<Customer> {
        const { data, error } = await supabase
            .from('customers')
            .insert([{
                shop_id: shopId,
                name: customerData.name,
                phone: customerData.phone,
                address: customerData.address || null,
                customer_type: customerData.customer_type,
                notes: customerData.notes || null,
                total_due_amount: 0,
                total_purchases: 0,
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async updateCustomer(id: string, shopId: string, customerData: CustomerFormData): Promise<Customer> {
        const { data, error } = await supabase
            .from('customers')
            .update({
                name: customerData.name,
                phone: customerData.phone,
                address: customerData.address || null,
                customer_type: customerData.customer_type,
                notes: customerData.notes || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('shop_id', shopId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async deleteCustomer(id: string, shopId: string): Promise<void> {
        const { error } = await supabase
            .from('customers')
            .delete()
            .eq('id', id)
            .eq('shop_id', shopId);

        if (error) throw error;
    }

    static async searchCustomers(shopId: string, query: string): Promise<Customer[]> {
        const sanitizedQuery = query.trim();

        if (!sanitizedQuery) {
            return this.getCustomers(shopId);
        }

        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('shop_id', shopId)
            .or(`name.ilike.%${sanitizedQuery}%,phone.ilike.%${sanitizedQuery}%`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }
}