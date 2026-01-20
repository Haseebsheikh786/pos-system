import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProductFormData } from "@/types/product";

interface ProductModalProps {
  title: string;
  formData: ProductFormData;
  onFormChange: (data: ProductFormData) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitButtonText: string;
  isSubmitting?: boolean;
}

export default function ProductModal({
  title,
  formData,
  onFormChange,
  onCancel,
  onSubmit,
  submitButtonText,
  isSubmitting = false,
}: ProductModalProps) {
  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <DialogContent className="bg-card border-primary max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Product Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-dark-gray border-primary/30 "
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Barcode *
            </Label>
            <Input
              id="name"
              placeholder="Enter barcode"
              value={formData.barcode}
              onChange={(e) => handleInputChange("barcode", e.target.value)}
              className="bg-dark-gray border-primary/30 "
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-300">
              Selling Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter selling price"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="bg-dark-gray border-primary/30 "
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost_price" className="text-gray-300">
              Cost Price
            </Label>
            <Input
              id="cost_price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter cost price"
              value={formData.cost_price}
              onChange={(e) => handleInputChange("cost_price", e.target.value)}
              className="bg-dark-gray border-primary/30 "
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock" className="text-gray-300">
              Current Stock
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              className="bg-dark-gray border-primary/30 "
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min_stock_level" className="text-gray-300">
              Minimum Stock Level
            </Label>
            <Input
              id="min_stock_level"
              type="number"
              min="0"
              placeholder="Enter minimum stock"
              value={formData.min_stock_level}
              onChange={(e) =>
                handleInputChange("min_stock_level", e.target.value)
              }
              className="bg-dark-gray border-primary/30 "
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-primary/30 text-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} className="" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : submitButtonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
