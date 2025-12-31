"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import CustomerList from "@/components/customers/customer-list";
import CustomerModal from "@/components/customers/customer-modal";
import CustomerStats from "@/components/customers/customer-stats";

type Payment = {
  date: string;
  amount: number;
  type: "paid" | "credit";
};

type Customer = {
  id: number;
  name: string;
  phone: string;
  address: string;
  creditBalance: number;
  totalPurchases: number;
  payments: Payment[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Ahmed Khan",
      phone: "0300-1234567",
      address: "Shop 12, Main Market",
      creditBalance: 1500,
      totalPurchases: 25000,
      payments: [
        { date: "2024-01-10", amount: 2000, type: "paid" },
        { date: "2024-01-08", amount: 1500, type: "credit" },
      ],
    },
    {
      id: 2,
      name: "Fatima Ali",
      phone: "0321-9876543",
      address: "House 45, Block B",
      creditBalance: 0,
      totalPurchases: 15000,
      payments: [{ date: "2024-01-09", amount: 3000, type: "paid" }],
    },
    {
      id: 3,
      name: "Hassan Raza",
      phone: "0345-5551234",
      address: "Flat 8, Green Plaza",
      creditBalance: 3200,
      totalPurchases: 42000,
      payments: [
        { date: "2024-01-11", amount: 5000, type: "paid" },
        { date: "2024-01-05", amount: 3200, type: "credit" },
      ],
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleAddCustomer = () => {
    if (formData.name && formData.phone) {
      const newCustomer: Customer = {
        id: customers.length + 1,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        creditBalance: 0,
        totalPurchases: 0,
        payments: [],
      };
      setCustomers([...customers, newCustomer]);
      setFormData({ name: "", phone: "", address: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCustomer = (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const openViewDialog = (customer: Customer) => {
    setViewingCustomer(customer);
  };

  const openAddDialog = () => {
    setFormData({ name: "", phone: "", address: "" });
    setIsAddDialogOpen(true);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Customer Management
          </h1>
          <p className="text-gray-400">
            Manage customers and track credit (Udhaar).
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Grid */}
      <CustomerStats customers={customers} />

      {/* Search */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <CustomerList
        customers={filteredCustomers}
        onView={openViewDialog}
        onDelete={handleDeleteCustomer}
      />

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <CustomerModal
          title="Add New Customer"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddCustomer}
          submitButtonText="Add Customer"
        />
      </Dialog>
    </div>
  );
}
