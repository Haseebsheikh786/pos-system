"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Box,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase-client";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: ShoppingCart },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Inventory", href: "/dashboard/inventory", icon: Box },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface PosSidebarProps {
  onNavigate?: () => void;
}

export function PosSidebar({ onNavigate }: PosSidebarProps = {}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-black border-r border-[#D4AF37]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[#D4AF37] px-6">
        <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
          <span className="text-black font-bold text-xl">P</span>
        </div>
        <span className="text-white font-bold text-xl">POS System</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#D4AF37] text-black"
                  : "text-gray-300 hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#D4AF37] p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-[#1a1a1a] hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
