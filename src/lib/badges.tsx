import React from "react";
import { Badge } from "../components/ui/badge";

import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  PackageX,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  Wallet,
} from "lucide-react";

export const badgeIcons: Record<string, React.ReactNode> = {
  // ───── Payment ─────
  paid: <CheckCircle2 className="h-3.5 w-3.5" />, // ✅ Clear success
  partial: <Wallet className="h-3.5 w-3.5" />, // 💳 Partial payment
  pending: <Clock className="h-3.5 w-3.5" />, // ⏳ Waiting

  // ───── Dues ─────
  pending_dues: <AlertTriangle className="h-3.5 w-3.5" />, // ⚠️ Attention needed
  zero_dues: <CheckCircle2 className="h-3.5 w-3.5" />, // ✅ Clear

  // ───── Stock ─────
  out_of_stock: <PackageX className="h-3.5 w-3.5" />, // 📦❌ No inventory
  critical_stock: <AlertTriangle className="h-3.5 w-3.5" />, // 🚨 Very low
  low_stock: <PackageMinus className="h-3.5 w-3.5" />, // 📉 Low
  normal_stock: <PackagePlus className="h-3.5 w-3.5" />, // 📈 Normal
  good_stock: <PackageCheck className="h-3.5 w-3.5" />, // 📦✅ Healthy

  unknown: <Info className="h-3.5 w-3.5" />, // ℹ️ Fallback
};

const formatLabel = (status: string) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// Helper function to render Badge by status
export const getStatusBadge = (status: string, label?: string) => {
  const icon = badgeIcons[status] || null;
  return (
    <Badge variant={status as any} icon={icon}>
      {label ?? formatLabel(status)}{" "}
    </Badge>
  );
};
