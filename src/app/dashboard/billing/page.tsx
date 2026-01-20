"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
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
import { fetchProducts } from "@/store/productSlice";
import { fetchCustomers } from "@/store/customerSlice";
import type { Product } from "@/types/product";
import type { Customer } from "@/types/customer";
import useInvoiceDownloader from "@/hooks/useInvoiceDownloader";
import { fetchProfile } from "@/store/profileSlice";
import { Invoice, InvoiceItem } from "@/types/invoice";
import { getCurrencySymbol } from "@/lib/currency";

type BillItem = {
  id: number;
  productId: string; // Changed to string to match UUID
  productName: string;
  price: number;
  quantity: number;
  total: number;
  currentStock: number; // To track available stock
};

export default function BillingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { downloadInvoice } = useInvoiceDownloader();

  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);

  // Get products from Redux store
  const { items: products, loading: productsLoading } = useSelector(
    (state: RootState) => state.products,
  );

  // Get customers from Redux store
  const { items: customers, loading: customersLoading } = useSelector(
    (state: RootState) => state.customers,
  );

  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const generateInvoiceNumber = (shopId?: string): string => {
    const prefix = "INV-";

    const shopCode = shopId
      ? shopId.slice(0, 2).toUpperCase()
      : Math.random().toString(36).substring(2, 4).toUpperCase();

    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = now
      .getMilliseconds()
      .toString()
      .padStart(3, "0")
      .slice(0, 2);

    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");

    return `${prefix}${shopCode}${seconds}${milliseconds}${random}`;
  };

  const invoiceNumber = generateInvoiceNumber(user?.id);

  // Fetch products and customers on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProducts(user.id));
      dispatch(fetchCustomers(user.id));
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id]);

  const addItemToBill = () => {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) {
      alert("Product not found");
      return;
    }

    const qty = Number.parseInt(quantity) || 1;

    // Check stock availability
    if (qty > product.stock) {
      alert(`Only ${product.stock} units available in stock`);
      return;
    }

    // Check if item already exists in bill
    const existingItem = billItems.find(
      (item) => item.productId === selectedProduct,
    );

    if (existingItem) {
      // Check if total quantity exceeds stock
      const newTotalQty = existingItem.quantity + qty;
      if (newTotalQty > product.stock) {
        alert(
          `Cannot add more. Only ${
            product.stock - existingItem.quantity
          } more units available`,
        );
        return;
      }

      setBillItems(
        billItems.map((item) =>
          item.productId === selectedProduct
            ? {
                ...item,
                quantity: item.quantity + qty,
                total: (item.quantity + qty) * item.price,
              }
            : item,
        ),
      );
    } else {
      const newItem: BillItem = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty,
        currentStock: product.stock,
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

    const item = billItems.find((item) => item.id === id);
    if (!item) return;

    // Find the product to check stock
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;

    // Check if new quantity exceeds stock
    if (newQty > product.stock) {
      alert(`Only ${product.stock} units available in stock`);
      return;
    }

    setBillItems(
      billItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQty, total: item.price * newQty }
          : item,
      ),
    );
  };

  const handleClearBill = () => {
    if (confirm("Are you sure you want to clear the bill?")) {
      setBillItems([]);
      setSelectedCustomer("");
      setCustomerName("");
      setCustomerPhone("");
    }
  };

  const handleGenerateInvoice = () => {
    if (billItems.length === 0) {
      alert("Please add items to the bill first");
      return;
    }
    setIsInvoiceOpen(true);
  };

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setCustomerName(customer.name);
      setCustomerPhone(customer.phone);
    } else {
      setCustomerName("");
      setCustomerPhone("");
    }
  };

  const generateTempInvoice = (): Invoice => {
    const now = new Date();

    const tempInvoiceItems: InvoiceItem[] = billItems.map((item) => ({
      id: String(item.id), // unique identifier
      invoice_id: `TMP-${Date.now()}`,
      product_id: item.productId,
      product_name: item.productName,
      price: item.price,
      product_price: item.price,
      quantity: item.quantity,
      created_at: now.toISOString(),
    }));

    const totalAmount = tempInvoiceItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      id: String(Date.now()),
      shop_id: profile?.id || "shop-temp",
      customer_id: selectedCustomer || "guest",
      invoice_number: invoiceNumber,
      invoice_date: now.toISOString(),
      customer_name: customerName || "Walk-in Customer",
      customer_phone: customerPhone || "N/A",
      subtotal: totalAmount,
      discount_amount: 0,
      tax_amount: 0,
      total: totalAmount,
      payment_status: "pending",
      amount_paid: 0,
      due_amount: totalAmount,
      status: "pending",
      notes: null,
      items: tempInvoiceItems,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };
  };

  const handlePrintInvoice = () => {
    if (!profile || billItems.length === 0) {
      alert("Please add items to the bill first");
      return;
    }

    const invoice = generateTempInvoice();

    downloadInvoice({
      invoice,
      items: invoice.items || [],
      profile,
    });
  };

  const selectedCustomerData = customers?.find(
    (c) => c.id === selectedCustomer,
  );

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const tax = 0; // No tax for MVP
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  // Filter out products that are already in the bill (optional)
  const availableProducts = products.filter(
    (product) =>
      product.is_active &&
      product.stock > 0 &&
      !billItems.some((item) => item.productId === product.id),
  );

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">Billing System (POS)</h1>
        <p className="text-gray-400">Create invoices and process payments.</p>
      </div>

      {/* Loading States */}
      {(productsLoading || customersLoading) && (
        <div className="mb-6 p-4 bg-dark-gray rounded-lg border border-primary/30">
          <p className="text-gray-400">
            Loading {productsLoading ? "products" : ""}{" "}
            {productsLoading && customersLoading ? "and" : ""}{" "}
            {customersLoading ? "customers" : ""}...
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Add Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Product Section */}
          <Card className="bg-card border-primary">
            <CardHeader>
              <CardTitle className="">Add Products to Bill</CardTitle>
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
                    disabled={productsLoading}
                  >
                    <SelectTrigger className="bg-dark-gray border-primary/30 ">
                      <SelectValue
                        placeholder={
                          productsLoading
                            ? "Loading products..."
                            : products.length === 0
                              ? "No products available"
                              : "Choose a product"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary max-h-60">
                      {availableProducts.length === 0 ? (
                        <SelectItem
                          value="no-products"
                          disabled
                          className="text-gray-400"
                        >
                          {productsLoading
                            ? "Loading..."
                            : "No available products"}
                        </SelectItem>
                      ) : (
                        availableProducts.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id}
                            className=" hover:bg-dark-gray"
                          >
                            <div className="flex flex-col">
                              <span>{product.name}</span>
                              <span className="text-xs text-gray-400">
                                Price: {currencySymbol}
                                {product.price.toLocaleString()} | Stock:{" "}
                                {product.stock}
                                {product.stock <= product.min_stock_level && (
                                  <span className="text-orange-400 ml-1">
                                    (Low Stock)
                                  </span>
                                )}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
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
                      className="bg-dark-gray border-primary/30 "
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addItemToBill();
                        }
                      }}
                    />
                    <Button
                      onClick={addItemToBill}
                      className=""
                      disabled={!selectedProduct}
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
            products={products}
            profile={profile || { currency: "pkr" }}
          />
        </div>

        {/* Right: Bill Summary */}
        <div className="space-y-6">
          <Card className="bg-card border-primary">
            <CardHeader>
              <CardTitle className="">Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">
                  Select Customer (Optional)
                </Label>
                <Select
                  value={selectedCustomer}
                  onValueChange={handleCustomerSelect}
                  disabled={customersLoading}
                >
                  <SelectTrigger className="bg-dark-gray border-primary/30 ">
                    <SelectValue
                      placeholder={
                        customersLoading
                          ? "Loading customers..."
                          : "Walk-in customer"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary max-h-60">
                    <SelectItem value="walk-in" className=" hover:bg-dark-gray">
                      Walk-in Customer
                    </SelectItem>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id}
                        className=" hover:bg-dark-gray"
                      >
                        <div className="flex flex-col">
                          <span>{customer.name}</span>
                          <span className="text-xs text-gray-400">
                            {customer.phone}
                            {customer.total_due_amount > 0 && (
                              <span className="text-orange-400 ml-1">
                                (Due: {currencySymbol}
                                {customer.total_due_amount.toLocaleString()})
                              </span>
                            )}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCustomer !== "walk-in" && (
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    Selected Customer
                  </Label>
                  <div className="p-3 bg-dark-gray rounded-lg border border-primary/30">
                    <p className="">{customerName}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {customers.find((c) => c.id === selectedCustomer)
                        ?.phone || ""}
                    </p>
                    {(selectedCustomerData?.total_due_amount ?? 0) > 0 && (
                      <p className="text-orange-400 text-sm mt-1">
                        Outstanding: {currencySymbol}
                        {customers
                          .find((c) => c.id === selectedCustomer)
                          ?.total_due_amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-primary">
            <CardHeader>
              <CardTitle className="">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {billItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-300 text-sm"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>
                      {currencySymbol}
                      {item.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-primary/30" />

              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>
                  {currencySymbol}
                  {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax:</span>
                <span>
                  {currencySymbol}
                  {tax}
                </span>
              </div>
              <div className="h-px bg-primary/30" />
              <div className="flex justify-between  text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  {currencySymbol}
                  {total.toLocaleString()}
                </span>
              </div>

              {/* Items count */}
              <div className="text-gray-400 text-sm">
                {billItems.length} item{billItems.length !== 1 ? "s" : ""} in
                bill
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleGenerateInvoice}
                  className="w-full "
                  disabled={billItems.length === 0}
                >
                  Generate Invoice
                </Button>

                {billItems.length > 0 && (
                  <Button
                    onClick={handleClearBill}
                    variant="outline"
                    className="w-full border-primary/30 text-gray-300 hover:"
                  >
                    Clear Bill
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice Preview Dialog */}
      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <InvoicePreview
          billItems={billItems}
          customerId={selectedCustomer !== "walk-in" ? selectedCustomer : null}
          customerName={customerName}
          customerPhone={customerPhone}
          subtotal={subtotal}
          total={total}
          invoiceNumber={invoiceNumber}
          onPrint={handlePrint}
          onDownload={handlePrintInvoice}
          onClose={() => setIsInvoiceOpen(false)}
          onSaveSuccess={() => {
            // Clear the bill after successful save
            setBillItems([]);
            setSelectedCustomer("");
            setCustomerName("");
            setCustomerPhone("");
            alert("Invoice saved successfully!");
          }}
          profile={profile || { currency: "pkr" }}
        />
      </Dialog>
    </div>
  );
}
