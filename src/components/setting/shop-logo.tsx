"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import type React from "react";

interface ShopLogoProps {
  logoUrl?: string;
  onLogoUpload: (file: File) => void;
  onLogoDelete: () => void;
  uploading: boolean;
}

export default function ShopLogo({
  logoUrl,
  onLogoUpload,
  onLogoDelete,
  uploading,
}: ShopLogoProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      onLogoUpload(file);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <Card className="bg-card border-primary">
      <CardHeader>
        <CardTitle className="">Shop Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <div className="w-full aspect-square bg-dark-gray rounded-lg border-2 border-primary flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <span className="ml-2 text-gray-400">Uploading...</span>
            </div>
          ) : logoUrl ? (
            <div className="relative w-full aspect-square bg-dark-gray rounded-lg border-2 border-primary p-4 flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Shop Logo"
                className="max-w-full max-h-full object-contain"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={onLogoDelete}
                title="Remove logo"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-full aspect-square bg-dark-gray rounded-lg border-2 border-dashed border-primary/50 flex flex-col items-center justify-center gap-2">
              <Upload className="h-12 w-12 text-primary/50" />
              <p className="text-gray-500 text-sm">No logo uploaded</p>
            </div>
          )}

          <div className="w-full space-y-2">
            <Label
              htmlFor="logo-upload"
              className="flex items-center justify-center gap-2 w-full bg-dark-gray hover:bg-[#252525] border border-primary/30 text-gray-300 py-2 px-4 rounded-lg cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4" />
              {logoUrl ? "Change Logo" : "Upload Logo"}
            </Label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WebP up to 2MB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
