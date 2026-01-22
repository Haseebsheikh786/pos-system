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

/* ──────────────────────────────────────
   1️⃣ Variants supported by STATUS logic
────────────────────────────────────── */
export type StatusVariant =
  | "paid"
  | "partial"
  | "pending"
  | "pending_dues"
  | "zero_dues"
  | "out_of_stock"
  | "critical_stock"
  | "low_stock"
  | "normal_stock"
  | "good_stock";

/* ──────────────────────────────────────
   2️⃣ Icons (strictly typed)
────────────────────────────────────── */
export const badgeIcons: Record<StatusVariant, React.ReactNode> = {
  paid: <CheckCircle2 className="h-3.5 w-3.5" />,
  partial: <Wallet className="h-3.5 w-3.5" />,
  pending: <Clock className="h-3.5 w-3.5" />,

  pending_dues: <AlertTriangle className="h-3.5 w-3.5" />,
  zero_dues: <CheckCircle2 className="h-3.5 w-3.5" />,

  out_of_stock: <PackageX className="h-3.5 w-3.5" />,
  critical_stock: <AlertTriangle className="h-3.5 w-3.5" />,
  low_stock: <PackageMinus className="h-3.5 w-3.5" />,
  normal_stock: <PackagePlus className="h-3.5 w-3.5" />,
  good_stock: <PackageCheck className="h-3.5 w-3.5" />,
};

/* ──────────────────────────────────────
   3️⃣ Helpers
────────────────────────────────────── */
const formatLabel = (status: string) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const isStatusVariant = (value: string): value is StatusVariant =>
  value in badgeIcons;

/* ──────────────────────────────────────
   4️⃣ Public API (SAFE + CLEAN)
────────────────────────────────────── */
export const getStatusBadge = (status: string, label?: string) => {
  if (!isStatusVariant(status)) {
    return (
      <Badge variant="default" icon={<Info className="h-3.5 w-3.5" />}>
        {label ?? "Unknown"}
      </Badge>
    );
  }

  return (
    <Badge variant={status} icon={badgeIcons[status]}>
      {label ?? formatLabel(status)}
    </Badge>
  );
};
