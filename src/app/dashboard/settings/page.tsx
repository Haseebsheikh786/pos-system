"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import InvoicePreview from "@/components/setting/invoice-preview";
import ShopLogo from "@/components/setting/shop-logo";
import ShopInformation from "@/components/setting/shop-information";
import InvoiceSettings from "@/components/setting/invoice-setting";
import {
  fetchProfile,
  updateProfile,
  uploadLogo,
  deleteLogo,
} from "@/store/profileSlice";
import type { ProfileFormData } from "@/types/profile";

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    profile,
    loading,
    error,
    saving,
    saveError,
    logoUploading,
    logoUploadError,
  } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState<ProfileFormData>({
    business_name: "",
    business_address: "",
    phone: "",
    email: "",
    invoice_footer_text: "",
    shop_logo_url: "",
    currency: "",
    business_type: "",
  });

  // Fetch profile on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        business_address: profile.business_address || "",
        phone: profile.phone || "",
        email: profile.email || "",
        invoice_footer_text: profile.invoice_footer_text || "",
        shop_logo_url: profile.shop_logo_url || "",
        currency: profile.currency || "",
        business_type: profile.business_type || "",
      });
    }
  }, [profile]);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = async (file: File) => {
    if (!user?.id) return;

    try {
      const response = await dispatch(
        uploadLogo({ file, userId: user.id })
      ).unwrap();
      setFormData((prev) => ({
        ...prev,
        shop_logo_url: response.logoUrl,
      }));
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handleLogoDelete = async () => {
    if (!user?.id) return;

    if (confirm("Are you sure you want to remove your shop logo?")) {
      try {
        await dispatch(deleteLogo(user.id)).unwrap();
      } catch (error) {
        console.error("Error deleting logo:", error);
      }
    }
  };

  const handleSaveSettings = async () => {
    if (!user?.id) return;

    // Validate required fields
    if (!formData.business_name.trim()) {
      alert("Shop name is required");
      return;
    }

    try {
      await dispatch(
        updateProfile({
          userId: user.id,
          profileData: formData,
        })
      ).unwrap();
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
        <span className="ml-3 text-gray-400">Loading settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400">Error: {error}</p>
          <Button
            onClick={() => user?.id && dispatch(fetchProfile(user.id))}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your shop details and preferences.
        </p>
      </div>

      {/* Error Messages */}
      {(saveError || logoUploadError) && (
        <div className="mb-6 p-4 bg-red-500/10 border-red-500/30 rounded-lg">
          {saveError && <p className="text-red-400">Save Error: {saveError}</p>}
          {logoUploadError && (
            <p className="text-red-400">Logo Upload Error: {logoUploadError}</p>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Shop Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shop Information */}
          <ShopInformation
            formData={formData}
            onFormChange={handleFormChange}
          />

          {/* Invoice Settings */}
          <InvoiceSettings
            invoiceFooterText={formData.invoice_footer_text}
            onInvoiceFooterChange={(value) =>
              handleFormChange("invoice_footer_text", value)
            }
          />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
              disabled={saving || logoUploading}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right: Logo Upload & Preview */}
        <div className="space-y-6">
          <ShopLogo
            logoUrl={profile?.shop_logo_url}
            onLogoUpload={handleLogoUpload}
            onLogoDelete={handleLogoDelete}
            uploading={logoUploading}
          />

          <InvoicePreview
            logoUrl={profile?.shop_logo_url}
            businessName={formData.business_name}
            businessAddress={formData.business_address}
            businessPhone={formData.phone}
            businessCurrency={formData.currency}
            invoiceFooterText={formData.invoice_footer_text}
            nextInvoiceNumber={profile?.next_invoice_number || 1}
          />
        </div>
      </div>
    </div>
  );
}
