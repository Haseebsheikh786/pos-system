"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Plus, Search, Loader2, X } from "lucide-react";
import ProductModal from "@/components/products/product-modal";
import ProductList from "@/components/products/product-list";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  setSearchQuery,
} from "@/store/productSlice";
import { ProductFormData, Product } from "@/types/product";
import { fetchProfile } from "@/store/profileSlice";
import { getCurrencySymbol } from "@/lib/currency";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);
  const {
    items: products,
    loading,
    error,
    searchQuery,
  } = useSelector((state: RootState) => state.products);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    cost_price: "",
    stock: "",
    min_stock_level: "",
    barcode: "",
    sku: "",
    category: "",
    image_url: "",
  });

  // Use ref for debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  // Fetch products on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProducts(user.id));
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id]);

  // Sync local search query with Redux state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Debounced search function
  const handleSearchInput = useCallback(
    (query: string) => {
      // Update local state immediately for responsive UI
      setLocalSearchQuery(query);

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer for debounced search
      debounceTimerRef.current = setTimeout(() => {
        // Update Redux state
        dispatch(setSearchQuery(query));

        if (user?.id) {
          if (query.trim() === "") {
            // If query is empty, fetch all products
            dispatch(fetchProducts(user.id));
          } else {
            // Otherwise, search with the query
            dispatch(searchProducts({ shopId: user.id, query }));
          }
        }
      }, 500); // 500ms delay
    },
    [dispatch, user?.id],
  );

  const clearSearch = () => {
    setLocalSearchQuery("");
    dispatch(setSearchQuery(""));
    if (user?.id) {
      dispatch(fetchProducts(user.id));
    }
  };

  const handleAddProduct = async () => {
    if (
      !user?.id ||
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.min_stock_level
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        createProduct({
          shopId: user.id,
          productData: formData,
        }),
      ).unwrap();

      setFormData({
        name: "",
        description: "",
        price: "",
        cost_price: "",
        stock: "",
        min_stock_level: "5",
        barcode: "",
        sku: "",
        category: "",
        image_url: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async () => {
    if (
      !user?.id ||
      !editingProduct?.id ||
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.min_stock_level
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateProduct({
          id: editingProduct.id,
          shopId: user.id,
          productData: formData,
        }),
      ).unwrap();

      setFormData({
        name: "",
        description: "",
        price: "",
        cost_price: "",
        stock: "",
        min_stock_level: "5",
        barcode: "",
        sku: "",
        category: "",
        image_url: "",
      });
      setEditingProduct(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!user?.id) return;

    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct({ id, shopId: user.id })).unwrap();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      cost_price: product.cost_price?.toString() || "",
      stock: product.stock.toString(),
      min_stock_level: product.min_stock_level.toString(),
      barcode: product.barcode || "",
      sku: product.sku || "",
      category: product.category || "",
      image_url: product.image_url || "",
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      cost_price: "",
      stock: "",
      min_stock_level: "5",
      barcode: "",
      sku: "",
      category: "",
      image_url: "",
    });
    setIsAddDialogOpen(true);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Calculate statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(
    (p) => p.stock <= p.min_stock_level,
  ).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const totalStockValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold  mb-2">Product Management</h1>
          <p className="text-gray-400">
            Manage your products, prices, and stock levels.
          </p>
        </div>
        <Button onClick={openAddDialog} className="" disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="md:col-span-3 bg-card border-primary">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name or barcode..."
                value={localSearchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                className="pl-10 pr-10 bg-dark-gray border-primary/30 "
                disabled={loading}
              />
              {localSearchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:"
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                totalProducts
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-card border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {loading ? "-" : lowStockProducts}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {loading ? "-" : outOfStockProducts}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Stock Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {loading
                ? "-"
                : `${currencySymbol}${totalStockValue.toLocaleString()}`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-gray-400">Loading products...</span>
        </div>
      ) : (
        /* Products Table */
        <ProductList
          products={products}
          onEdit={openEditDialog}
          onDelete={handleDeleteProduct}
          profile={profile || { currency: "pkr" }}
        />
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <ProductModal
          title="Add New Product"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddProduct}
          submitButtonText="Add Product"
          isSubmitting={isSubmitting}
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
          isSubmitting={isSubmitting}
        />
      </Dialog>
    </div>
  );
}
