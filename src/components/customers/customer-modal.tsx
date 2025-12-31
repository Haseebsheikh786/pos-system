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

interface FormData {
  name: string;
  phone: string;
  address: string;
}

interface CustomerModalProps {
  title: string;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitButtonText: string;
}

export default function CustomerModal({
  title,
  formData,
  onFormChange,
  onCancel,
  onSubmit,
  submitButtonText,
}: CustomerModalProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <DialogContent className="bg-[#0a0a0a] border-[#D4AF37]">
      <DialogHeader>
        <DialogTitle className="text-white">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Customer Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter customer name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            Phone Number *
          </Label>
          <Input
            id="phone"
            placeholder="03XX-XXXXXXX"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
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
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[#D4AF37]/30 text-gray-300"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
        >
          {submitButtonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
