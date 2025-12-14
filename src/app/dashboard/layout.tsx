"use client";

import type React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { PosSidebar } from "@/components/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black">
      <div className="hidden lg:block">
        <PosSidebar />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-black border-b border-[#D4AF37] flex items-center justify-between px-4">
        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
            <span className="text-black font-bold text-xl">P</span>
          </div>
          <span className="text-white font-bold text-xl">POS System</span>
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#D4AF37] hover:bg-[#1a1a1a] w-12 h-12"
            >
              <Menu className="w-7 h-7" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="p-0 w-64 bg-black border-[#D4AF37]"
          >
            <PosSidebar onNavigate={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">{children}</main>
    </div>
  );
}
