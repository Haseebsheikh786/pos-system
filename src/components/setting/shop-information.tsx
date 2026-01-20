"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShopInformationProps {
  formData: {
    business_name: string;
    business_address: string;
    phone: string;
    email: string;
    currency: string;
    business_type?: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export default function ShopInformation({
  formData,
  onFormChange,
}: ShopInformationProps) {
  // Currency options
  const currencyOptions = [
    { value: "pkr", label: "Pakistani Rupee (₨)", symbol: "₨" },
    { value: "inr", label: "Indian Rupee (₹)", symbol: "₹" },
    { value: "usd", label: "US Dollar ($)", symbol: "$" },
    { value: "eur", label: "Euro (€)", symbol: "€" },
  ];

  // Business type options
  const businessTypeOptions = [
    { value: "general", label: "General Store" },
    { value: "clothing", label: "Clothing & Apparel" },
    { value: "electronics", label: "Electronics" },
    { value: "grocery", label: "Grocery / Kirana" },
    { value: "pharmacy", label: "Pharmacy / Medical" },
    { value: "hardware", label: "Hardware Store" },
    { value: "stationery", label: "Stationery & Books" },
    { value: "jewelry", label: "Jewelry & Accessories" },
    { value: "footwear", label: "Footwear" },
    { value: "restaurant", label: "Restaurant / Cafe" },
    { value: "mobile", label: "Mobile & Accessories" },
    { value: "beauty", label: "Beauty & Cosmetics" },
    { value: "furniture", label: "Furniture" },
    { value: "sports", label: "Sports Goods" },
    { value: "other", label: "Other Business" },
  ];

  return (
    <Card className="bg-card border-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        <Store className="h-5 w-5 text-primary" />
        <CardTitle className="">Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Shop Name */}
        <div className="space-y-2">
          <Label htmlFor="shop-name" className="text-gray-300">
            Shop Name *
          </Label>
          <Input
            id="shop-name"
            value={formData.business_name}
            onChange={(e) => onFormChange("business_name", e.target.value)}
            className="bg-dark-gray border-primary/30 "
            placeholder="Enter your shop name"
            required
          />
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <Label htmlFor="business-type" className="text-gray-300">
            Business Type *
          </Label>
          <Select
            value={formData.business_type}
            onValueChange={(value) => onFormChange("business_type", value)}
          >
            <SelectTrigger
              id="business-type"
              className="bg-dark-gray border-primary/30 "
            >
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent className="bg-dark-gray border-primary/30">
              {businessTypeOptions.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className=" hover:bg-primary/20 focus:bg-primary/20"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Shop Address */}
        <div className="space-y-2">
          <Label htmlFor="shop-address" className="text-gray-300">
            Shop Address
          </Label>
          <Textarea
            id="shop-address"
            value={formData.business_address}
            onChange={(e) => onFormChange("business_address", e.target.value)}
            className="bg-dark-gray border-primary/30 "
            placeholder="Enter your shop address"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="shop-phone" className="text-gray-300">
            Phone Number
          </Label>
          <Input
            id="shop-phone"
            value={formData.phone}
            onChange={(e) => onFormChange("phone", e.target.value)}
            className="bg-dark-gray border-primary/30 "
            placeholder="03XX-XXXXXXX"
          />
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <Label htmlFor="currency" className="text-gray-300">
            Currency *
          </Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => onFormChange("currency", value)}
          >
            <SelectTrigger
              id="currency"
              className="bg-dark-gray border-primary/30 "
            >
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-dark-gray border-primary/30">
              {currencyOptions.map((currency) => (
                <SelectItem
                  key={currency.value}
                  value={currency.value}
                  className=" hover:bg-primary/20 focus:bg-primary/20"
                >
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.currency && (
            <p className="text-xs text-gray-400">
              Selected currency:{" "}
              {currencyOptions.find((c) => c.value === formData.currency)
                ?.symbol || ""}{" "}
              - This will be used for all prices and invoices
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
