"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Store, FileText, Save } from "lucide-react"

export default function SettingsPage() {
  const [shopName, setShopName] = useState("My Shop")
  const [shopAddress, setShopAddress] = useState("Shop 12, Main Market, City")
  const [shopPhone, setShopPhone] = useState("0300-1234567")
  const [shopEmail, setShopEmail] = useState("myshop@email.com")
  const [invoiceFooter, setInvoiceFooter] = useState("Thank you for your business!")
  const [logoPreview, setLogoPreview] = useState<string>("")

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    alert("Settings saved successfully! (MVP - State only)")
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure your shop details and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Shop Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shop Information */}
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader className="flex flex-row items-center gap-2">
              <Store className="h-5 w-5 text-[#D4AF37]" />
              <CardTitle className="text-white">Shop Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shop-name" className="text-gray-300">
                  Shop Name
                </Label>
                <Input
                  id="shop-name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-address" className="text-gray-300">
                  Shop Address
                </Label>
                <Textarea
                  id="shop-address"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="shop-phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="shop-phone"
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="shop-email"
                    type="email"
                    value={shopEmail}
                    onChange={(e) => setShopEmail(e.target.value)}
                    className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Settings */}
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader className="flex flex-row items-center gap-2">
              <FileText className="h-5 w-5 text-[#D4AF37]" />
              <CardTitle className="text-white">Invoice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-footer" className="text-gray-300">
                  Invoice Footer Text
                </Label>
                <Textarea
                  id="invoice-footer"
                  value={invoiceFooter}
                  onChange={(e) => setInvoiceFooter(e.target.value)}
                  placeholder="Message to display at the bottom of invoices"
                  className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Right: Logo Upload & Preview */}
        <div className="space-y-6">
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-white">Shop Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {logoPreview ? (
                  <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg border-2 border-[#D4AF37] p-4 flex items-center justify-center">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Shop Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg border-2 border-dashed border-[#D4AF37]/50 flex flex-col items-center justify-center gap-2">
                    <Upload className="h-12 w-12 text-[#D4AF37]/50" />
                    <p className="text-gray-500 text-sm">No logo uploaded</p>
                  </div>
                )}
                <div className="w-full">
                  <Label
                    htmlFor="logo-upload"
                    className="flex items-center justify-center gap-2 w-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#D4AF37]/30 text-gray-300 py-2 px-4 rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Label>
                  <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Preview */}
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-white text-sm">Invoice Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg space-y-3 text-xs">
                <div className="text-center border-b border-gray-300 pb-2">
                  {logoPreview ? (
                    <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-12 mx-auto mb-2" />
                  ) : (
                    <div className="h-12 flex items-center justify-center mb-2">
                      <div className="w-12 h-12 bg-[#D4AF37] rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xl">P</span>
                      </div>
                    </div>
                  )}
                  <h3 className="font-bold text-black">{shopName}</h3>
                  <p className="text-gray-600 text-xs">{shopAddress}</p>
                  <p className="text-gray-600 text-xs">{shopPhone}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-700">
                    <span>Sample Item 1</span>
                    <span>Rs. 500</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sample Item 2</span>
                    <span>Rs. 300</span>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between font-bold text-black">
                    <span>Total:</span>
                    <span>Rs. 800</span>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-xs border-t border-gray-300 pt-2">{invoiceFooter}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
