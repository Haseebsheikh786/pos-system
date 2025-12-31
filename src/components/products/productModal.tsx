import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  price: string;
  stock: string;
}

interface ProductModalProps {
  title: string;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitButtonText: string;
}

export default function ProductModal({
  title,
  formData,
  onFormChange,
  onCancel,
  onSubmit,
  submitButtonText,
}: ProductModalProps) {
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
            Product Name
          </Label>
          <Input
            id="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" className="text-gray-300">
            Price (Rs.)
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock" className="text-gray-300">
            Stock Quantity
          </Label>
          <Input
            id="stock"
            type="number"
            placeholder="Enter stock quantity"
            value={formData.stock}
            onChange={(e) => handleInputChange("stock", e.target.value)}
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
