"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

type Product = {
  id: number
  name: string
  price: number
  stock: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Rice (5kg)", price: 850, stock: 45 },
    { id: 2, name: "Cooking Oil (1L)", price: 420, stock: 32 },
    { id: 3, name: "Sugar (1kg)", price: 120, stock: 67 },
    { id: 4, name: "Tea Bags (100pcs)", price: 340, stock: 28 },
    { id: 5, name: "Flour (5kg)", price: 680, stock: 51 },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const handleAddProduct = () => {
    if (formData.name && formData.price && formData.stock) {
      const newProduct: Product = {
        id: products.length + 1,
        name: formData.name,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      }
      setProducts([...products, newProduct])
      setFormData({ name: "", price: "", stock: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditProduct = () => {
    if (editingProduct && formData.name && formData.price && formData.stock) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                price: Number.parseFloat(formData.price),
                stock: Number.parseInt(formData.stock),
              }
            : p,
        ),
      )
      setFormData({ name: "", price: "", stock: "" })
      setEditingProduct(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
          <p className="text-gray-400">Manage your products, prices, and stock levels.</p>
        </div>
        <Button
          onClick={() => {
            setFormData({ name: "", price: "", stock: "" })
            setIsAddDialogOpen(true)
          }}
          className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="md:col-span-3 bg-[#0a0a0a] border-[#D4AF37]">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{products.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">ID</TableHead>
                <TableHead className="text-[#D4AF37]">Product Name</TableHead>
                <TableHead className="text-[#D4AF37]">Price (Rs.)</TableHead>
                <TableHead className="text-[#D4AF37]">Stock</TableHead>
                <TableHead className="text-[#D4AF37] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-[#D4AF37]/30">
                  <TableCell className="text-gray-300">{product.id}</TableCell>
                  <TableCell className="text-white font-medium">{product.name}</TableCell>
                  <TableCell className="text-gray-300">Rs. {product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock < 10
                          ? "bg-red-500/10 text-red-400"
                          : product.stock < 30
                            ? "bg-orange-500/10 text-orange-400"
                            : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      className="text-[#D4AF37] hover:bg-[#1a1a1a]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
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

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-[#D4AF37]">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Product</DialogTitle>
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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
            <Button onClick={handleAddProduct} className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-[#D4AF37]">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-gray-300">
                Product Name
              </Label>
              <Input
                id="edit-name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price" className="text-gray-300">
                Price (Rs.)
              </Label>
              <Input
                id="edit-price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock" className="text-gray-300">
                Stock Quantity
              </Label>
              <Input
                id="edit-stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#D4AF37]/30 text-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct} className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
