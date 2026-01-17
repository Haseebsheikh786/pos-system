export type Profile = {
    id: string; // Same as user_id
    business_name: string;
    business_address?: string;
    phone?: string;
    email?: string;
    shop_logo_url?: string;
    next_invoice_number: number;
    invoice_footer_text?: string;
    currency: string;
    business_type?: string;
    created_at: string;
    updated_at: string;
};

export type ProfileFormData = {
    business_name: string;
    business_address: string;
    phone: string;
    email: string;
    invoice_footer_text: string;
    shop_logo_url?: string;
    currency: string;
    business_type?: string;
};

export type LogoUploadData = {
    file: File;
    shopId: string;
};