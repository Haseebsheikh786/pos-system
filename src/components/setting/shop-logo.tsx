import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import type React from "react";

interface ShopLogoProps {
  logoPreview: string;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShopLogo({
  logoPreview,
  handleLogoUpload,
}: ShopLogoProps) {
  return (
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
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
