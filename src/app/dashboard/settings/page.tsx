"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import InvoicePreview from "@/components/setting/invoice-preview";
import ShopLogo from "@/components/setting/shop-logo";
import ShopInformation from "@/components/setting/shop-information";
import InvoiceSettings from "@/components/setting/invoice-setting";

export default function SettingsPage() {
  const [shopName, setShopName] = useState("My Shop");
  const [shopAddress, setShopAddress] = useState("Shop 12, Main Market, City");
  const [shopPhone, setShopPhone] = useState("0300-1234567");
  const [shopEmail, setShopEmail] = useState("myshop@email.com");
  const [invoiceFooter, setInvoiceFooter] = useState(
    "Thank you for your business!"
  );
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully! (MVP - State only)");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your shop details and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Shop Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shop Information */}
          <ShopInformation
            shopName={shopName}
            setShopName={setShopName}
            shopAddress={shopAddress}
            setShopAddress={setShopAddress}
            shopPhone={shopPhone}
            setShopPhone={setShopPhone}
            shopEmail={shopEmail}
            setShopEmail={setShopEmail}
          />

          {/* Invoice Settings */}
          <InvoiceSettings
            invoiceFooter={invoiceFooter}
            setInvoiceFooter={setInvoiceFooter}
          />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Right: Logo Upload & Preview */}
        <div className="space-y-6">
          <ShopLogo
            logoPreview={logoPreview}
            handleLogoUpload={handleLogoUpload}
          />

          <InvoicePreview
            logoPreview={logoPreview}
            shopName={shopName}
            shopAddress={shopAddress}
            shopPhone={shopPhone}
            invoiceFooter={invoiceFooter}
          />
        </div>
      </div>
    </div>
  );
}
