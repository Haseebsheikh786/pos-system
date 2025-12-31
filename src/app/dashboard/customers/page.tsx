"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Plus, Search, Loader2, X } from "lucide-react";
import CustomerList from "@/components/customers/customer-list";
import CustomerModal from "@/components/customers/customer-modal";
import CustomerStats from "@/components/customers/customer-stats";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  setSearchQuery,
} from "@/store/customerSlice";
import { CustomerFormData } from "@/types/customer";

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    items: customers,
    loading,
    error,
    searchQuery,
  } = useSelector((state: RootState) => state.customers);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<
    (typeof customers)[0] | null
  >(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    phone: "",
    address: "",
    customer_type: "regular",
    notes: "",
  });

  // Use ref for debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch customers on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCustomers(user.id));
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
            // If query is empty, fetch all customers
            dispatch(fetchCustomers(user.id));
          } else {
            // Otherwise, search with the query
            dispatch(searchCustomers({ shopId: user.id, query }));
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
      dispatch(fetchCustomers(user.id));
    }
  };

  const handleAddCustomer = async () => {
    if (!user?.id || !formData.name || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        createCustomer({
          shopId: user.id,
          customerData: formData,
        })
      ).unwrap();

      setFormData({
        name: "",
        phone: "",
        address: "",
        customer_type: "regular",
        notes: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCustomer = async () => {
    if (
      !user?.id ||
      !editingCustomer?.id ||
      !formData.name ||
      !formData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateCustomer({
          id: editingCustomer.id,
          shopId: user.id,
          customerData: formData,
        })
      ).unwrap();

      setFormData({
        name: "",
        phone: "",
        address: "",
        customer_type: "regular",
        notes: "",
      });
      setEditingCustomer(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!user?.id) return;

    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await dispatch(deleteCustomer({ id, shopId: user.id })).unwrap();
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer. Please try again.");
      }
    }
  };

  const openEditDialog = (customer: (typeof customers)[0]) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address || "",
      customer_type: customer.customer_type,
      notes: customer.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      customer_type: "regular",
      notes: "",
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
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Grid */}
      <CustomerStats customers={customers} loading={loading} />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}

      {/* Search */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search customers by name or phone..."
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

      {/* Customers Table */}
      {loading && customers.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
          <span className="ml-3 text-gray-400">Loading customers...</span>
        </div>
      ) : (
        <CustomerList
          customers={customers}
          onEdit={openEditDialog}
          onDelete={handleDeleteCustomer}
          loading={loading}
        />
      )}

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <CustomerModal
          title="Add New Customer"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddCustomer}
          submitButtonText="Add Customer"
          isSubmitting={isSubmitting}
        />
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <CustomerModal
          title="Edit Customer"
          formData={formData}
          onFormChange={setFormData}
          onCancel={() => {
            setIsEditDialogOpen(false);
            setEditingCustomer(null);
          }}
          onSubmit={handleEditCustomer}
          submitButtonText="Save Changes"
          isSubmitting={isSubmitting}
        />
      </Dialog>
    </div>
  );
}
