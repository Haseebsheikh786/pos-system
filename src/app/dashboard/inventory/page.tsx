"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Search, Loader2, X, Plus } from "lucide-react";
import InventoryList from "@/components/inventory/inventory-list";
import InventoryStats from "@/components/inventory/inventory-stats";
import {
  fetchInventory,
  fetchInventoryStats,
  searchInventory,
  setSearchQuery,
  updateStock,
} from "@/store/inventorySlice";
import { Product } from "@/types/product";

export default function InventoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    items: inventory,
    loading,
    error,
    searchQuery,
    stats,
    statsLoading,
    statsError,
  } = useSelector((state: RootState) => state.inventory);

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
  const [criticalStockItems, setCriticalStockItems] = useState<Product[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<Product[]>([]);

  // Use ref for debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch inventory and stats on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchInventory(user.id));
      dispatch(fetchInventoryStats(user.id));
    }
  }, [dispatch, user?.id]);

  // Sync local search query with Redux state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Calculate low stock items from inventory
  useEffect(() => {
    if (inventory.length > 0) {
      const lowStock = inventory.filter(
        (item) => item.stock <= item.min_stock_level
      );
      const criticalStock = inventory.filter((item) => item.stock < 10);
      const outOfStock = inventory.filter((item) => item.stock === 0);

      setLowStockItems(lowStock);
      setCriticalStockItems(criticalStock);
      setOutOfStockItems(outOfStock);
    }
  }, [inventory]);

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
            // If query is empty, fetch all inventory
            dispatch(fetchInventory(user.id));
          } else {
            // Otherwise, search with the query
            dispatch(searchInventory({ shopId: user.id, query }));
          }
        }
      }, 500); // 500ms delay
    },
    [dispatch, user?.id]
  );

  const clearSearch = () => {
    setLocalSearchQuery("");
    dispatch(setSearchQuery(""));
    if (user?.id) {
      dispatch(fetchInventory(user.id));
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    if (!user?.id || newStock < 0) return;

    try {
      await dispatch(
        updateStock({
          productId,
          shopId: user.id,
          newStock,
        })
      ).unwrap();

      // Refresh stats after stock update
      dispatch(fetchInventoryStats(user.id));
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    }
  };

  const navigateToProducts = () => {
    window.location.href = "/dashboard/products";
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Inventory Management
          </h1>
          <p className="text-gray-400">
            Monitor stock levels and get low-stock alerts.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={navigateToProducts}
            className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
            disabled={loading}
          >
            <Plus className="mr-2 h-4 w-4" />
            Manage Products
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={localSearchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="pl-10 pr-10 bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
              disabled={loading}
            />
            {localSearchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                type="button"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <InventoryStats stats={stats || undefined} loading={statsLoading} />

      {/* Error Messages */}
      {(error || statsError) && (
        <Card className="mb-6 p-4 bg-red-500/10 border-red-500/30">
          <CardContent className="text-red-400">
            {error || statsError}
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="bg-orange-500/10 border-orange-500 mb-6">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-300 text-sm">
              You have {lowStockItems.length} item(s) below minimum stock level.
              {criticalStockItems.length > 0 &&
                ` ${criticalStockItems.length} of them are critical (less than 10 units).`}
              Consider restocking soon.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Out of Stock Alert */}
      {outOfStockItems.length > 0 && (
        <Card className="bg-red-500/10 border-red-500 mb-6">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Out of Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-300 text-sm">
              You have {outOfStockItems.length} item(s) that are completely out
              of stock. Urgent restocking required.
            </p>
            {outOfStockItems.length > 0 && (
              <div className="mt-3">
                <p className="text-red-300 text-sm font-medium">
                  Out of stock items:
                </p>
                <ul className="text-red-300 text-sm mt-1 list-disc list-inside">
                  {outOfStockItems.slice(0, 5).map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                  {outOfStockItems.length > 5 && (
                    <li>...and {outOfStockItems.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading State for Inventory */}
      {loading && inventory.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
          <span className="ml-3 text-gray-400">Loading inventory...</span>
        </div>
      ) : (
        /* Inventory Table */
        <InventoryList inventory={inventory} loading={loading} />
      )}
    </div>
  );
}
