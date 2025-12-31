"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import ProductModal from "@/components/products/productModal";
import ProductList from "@/components/products/product-list";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Rice (5kg)", price: 850, stock: 45 },
    { id: 2, name: "Cooking Oil (1L)", price: 420, stock: 32 },
    { id: 3, name: "Sugar (1kg)", price: 120, stock: 67 },
    { id: 4, name: "Tea Bags (100pcs)", price: 340, stock: 28 },
    { id: 5, name: "Flour (5kg)", price: 680, stock: 51 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleAddProduct = () => {
    if (formData.name && formData.price && formData.stock) {
      const newProduct: Product = {
        id: products.length + 1,
        name: formData.name,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      };
      setProducts([...products, newProduct]);
      setFormData({ name: "", price: "", stock: "" });
      setIsAddDialogOpen(false);
    }
  };

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
            : p
        )
      );
      setFormData({ name: "", price: "", stock: "" });
      setEditingProduct(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({ name: "", price: "", stock: "" });
    setIsAddDialogOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Product Management
          </h1>
          <p className="text-gray-400">
            Manage your products, prices, and stock levels.
          </p>
        </div>
        <Button
          onClick={openAddDialog}
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
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {products.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <ProductList
        products={filteredProducts}
        onEdit={openEditDialog}
        onDelete={handleDeleteProduct}
      />

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <ProductModal
          title="Add New Product"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddProduct}
          submitButtonText="Add Product"
        />
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <ProductModal
          title="Edit Product"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => {
            setIsEditDialogOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleEditProduct}
          submitButtonText="Save Changes"
        />
      </Dialog>
    </div>
  );
}
