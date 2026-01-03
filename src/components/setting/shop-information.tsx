"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";

interface ShopInformationProps {
  formData: {
    business_name: string;
    business_address: string;
    phone: string;
    email: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export default function ShopInformation({
  formData,
  onFormChange,
}: ShopInformationProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader className="flex flex-row items-center gap-2">
        <Store className="h-5 w-5 text-[#D4AF37]" />
        <CardTitle className="text-white">Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shop-name" className="text-gray-300">
            Shop Name *
          </Label>
          <Input
            id="shop-name"
            value={formData.business_name}
            onChange={(e) => onFormChange("business_name", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shop-address" className="text-gray-300">
            Shop Address
          </Label>
          <Textarea
            id="shop-address"
            value={formData.business_address}
            onChange={(e) => onFormChange("business_address", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            placeholder="Enter your shop address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shop-phone" className="text-gray-300">
            Phone Number
          </Label>
          <Input
            id="shop-phone"
            value={formData.phone}
            onChange={(e) => onFormChange("phone", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            placeholder="03XX-XXXXXXX"
          />
        </div>
      </CardContent>
    </Card>
  );
}
