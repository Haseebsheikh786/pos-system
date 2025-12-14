"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Trash2, Search, DollarSign } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

type Payment = {
  date: string
  amount: number
  type: "paid" | "credit"
}

type Customer = {
  id: number
  name: string
  phone: string
  address: string
  creditBalance: number
  totalPurchases: number
  payments: Payment[]
}

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
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  })

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
      }
      setCustomers([...customers, newCustomer])
      setFormData({ name: "", phone: "", address: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteCustomer = (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id))
    }
  }

  const openViewDialog = (customer: Customer) => {
    setViewingCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalCredit = customers.reduce((sum, c) => sum + c.creditBalance, 0)
  const customersWithCredit = customers.filter((c) => c.creditBalance > 0).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customer Management</h1>
          <p className="text-gray-400">Manage customers and track credit (Udhaar).</p>
        </div>
        <Button
          onClick={() => {
            setFormData({ name: "", phone: "", address: "" })
            setIsAddDialogOpen(true)
          }}
          className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customers.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Credit (Udhaar)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">Rs. {totalCredit.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Customers with Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customersWithCredit}</div>
          </CardContent>
        </Card>
      </div>

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
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">ID</TableHead>
                <TableHead className="text-[#D4AF37]">Name</TableHead>
                <TableHead className="text-[#D4AF37]">Phone</TableHead>
                <TableHead className="text-[#D4AF37]">Address</TableHead>
                <TableHead className="text-[#D4AF37]">Credit Balance</TableHead>
                <TableHead className="text-[#D4AF37]">Total Purchases</TableHead>
                <TableHead className="text-[#D4AF37] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-[#D4AF37]/30">
                  <TableCell className="text-gray-300">{customer.id}</TableCell>
                  <TableCell className="text-white font-medium">{customer.name}</TableCell>
                  <TableCell className="text-gray-300">{customer.phone}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{customer.address}</TableCell>
                  <TableCell>
                    {customer.creditBalance > 0 ? (
                      <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
                        Rs. {customer.creditBalance.toLocaleString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500">Paid</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">Rs. {customer.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(customer)}
                      className="text-[#D4AF37] hover:bg-[#1a1a1a]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="text-red-400 hover:bg-[#1a1a1a]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-[#D4AF37]">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Customer</DialogTitle>
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-[#D4AF37]/30 text-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={handleAddCustomer} className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-[#D4AF37] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Customer Details</DialogTitle>
          </DialogHeader>
          {viewingCustomer && (
            <div className="space-y-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-gray-400 text-sm">Name</Label>
                  <p className="text-white font-medium mt-1">{viewingCustomer.name}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Phone</Label>
                  <p className="text-white font-medium mt-1">{viewingCustomer.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-400 text-sm">Address</Label>
                  <p className="text-white font-medium mt-1">{viewingCustomer.address}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Credit Balance (Udhaar)</Label>
                  <p className="text-orange-400 font-bold text-xl mt-1">
                    Rs. {viewingCustomer.creditBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Total Purchases</Label>
                  <p className="text-white font-bold text-xl mt-1">
                    Rs. {viewingCustomer.totalPurchases.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-gray-400 text-sm mb-3 block">Payment History</Label>
                <div className="space-y-2">
                  {viewingCustomer.payments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#D4AF37]/30"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-4 w-4 text-[#D4AF37]" />
                        <div>
                          <p className="text-white text-sm">{payment.date}</p>
                          <Badge
                            className={
                              payment.type === "paid"
                                ? "bg-green-500/10 text-green-400 border-green-500 mt-1"
                                : "bg-orange-500/10 text-orange-400 border-orange-500 mt-1"
                            }
                          >
                            {payment.type === "paid" ? "Paid" : "Credit"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-white font-medium">Rs. {payment.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)} className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
