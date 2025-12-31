"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import InvoicePreview from "@/components/billing/invoice-preview";
import ItemList from "@/components/billing/item-list";

type BillItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function BillingPage() {
  const [products] = useState<Product[]>([
    { id: 1, name: "Rice (5kg)", price: 850, stock: 45 },
    { id: 2, name: "Cooking Oil (1L)", price: 420, stock: 32 },
    { id: 3, name: "Sugar (1kg)", price: 120, stock: 67 },
    { id: 4, name: "Tea Bags (100pcs)", price: 340, stock: 28 },
    { id: 5, name: "Flour (5kg)", price: 680, stock: 51 },
  ]);

  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [customerName, setCustomerName] = useState<string>("");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const addItemToBill = () => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.id.toString() === selectedProduct);
    if (!product) return;

    const qty = Number.parseInt(quantity) || 1;
    const existingItem = billItems.find(
      (item) => item.productName === product.name
    );

    if (existingItem) {
      setBillItems(
        billItems.map((item) =>
          item.productName === product.name
            ? {
                ...item,
                quantity: item.quantity + qty,
                total: (item.quantity + qty) * item.price,
              }
            : item
        )
      );
    } else {
      const newItem: BillItem = {
        id: Date.now(),
        productName: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty,
      };
      setBillItems([...billItems, newItem]);
    }

    setSelectedProduct("");
    setQuantity("1");
  };

  const removeItem = (id: number) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setBillItems(
      billItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQty, total: item.price * newQty }
          : item
      )
    );
  };

  const handleClearBill = () => {
    if (confirm("Are you sure you want to clear the bill?")) {
      setBillItems([]);
      setCustomerName("");
    }
  };

  const handleGenerateInvoice = () => {
    if (billItems.length === 0) {
      alert("Please add items to the bill first");
      return;
    }
    setIsInvoiceOpen(true);
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const tax = 0; // No tax for MVP
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Billing System (POS)
        </h1>
        <p className="text-gray-400">Create invoices and process payments.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Add Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Product Section */}
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-white">Add Products to Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Label className="text-gray-300 mb-2 block">
                    Select Product
                  </Label>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-[#D4AF37]">
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                          className="text-white"
                        >
                          {product.name} - Rs. {product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Quantity</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
                    />
                    <Button
                      onClick={addItemToBill}
                      className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Items Table */}
          <ItemList
            billItems={billItems}
            onRemoveItem={removeItem}
            onUpdateQuantity={updateQuantity}
            onClearBill={handleClearBill}
          />
        </div>

        {/* Right: Bill Summary */}
        <div className="space-y-6">
          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-white">Customer Info</CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="text-gray-300 mb-2 block">
                Customer Name (Optional)
              </Label>
              <Input
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </CardContent>
          </Card>

          <Card className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-white">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax:</span>
                <span>Rs. {tax}</span>
              </div>
              <div className="h-px bg-[#D4AF37]/30" />
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#D4AF37]">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleGenerateInvoice}
                  className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white"
                  disabled={billItems.length === 0}
                >
                  Generate Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice Preview Dialog */}
      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <InvoicePreview
          billItems={billItems}
          customerName={customerName}
          subtotal={subtotal}
          total={total}
          onPrint={handlePrint}
          onDownload={() => alert("Download feature - MVP UI only")}
          onClose={() => setIsInvoiceOpen(false)}
        />
      </Dialog>
    </div>
  );
}
