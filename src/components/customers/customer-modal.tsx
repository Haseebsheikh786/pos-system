"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomerFormData } from "@/types/customer";

interface CustomerModalProps {
  title: string;
  formData: CustomerFormData;
  onFormChange: (data: CustomerFormData) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitButtonText: string;
  isSubmitting?: boolean;
}

export default function CustomerModal({
  title,
  formData,
  onFormChange,
  onCancel,
  onSubmit,
  submitButtonText,
  isSubmitting = false,
}: CustomerModalProps) {
  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  const handleSelectChange = (field: keyof CustomerFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <DialogContent className="bg-[#0a0a0a] border-[#D4AF37] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-white">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Customer Name
          </Label>
          <Input
            id="name"
            placeholder="Enter customer name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="03XX-XXXXXXX"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-300">
            Address
          </Label>
          <Textarea
            id="address"
            placeholder="Enter customer address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white min-h-[80px]"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[#D4AF37]/30 text-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : submitButtonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
