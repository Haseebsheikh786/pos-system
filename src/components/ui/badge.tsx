import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",

        // payment
        paid: "bg-green-500/10 text-green-400 border-green-500/30  ",
        partial: "bg-amber-500/10 text-amber-400 border-amber-500/30 ",
        pending: "bg-red-500/10 text-red-400 border-red-500/30 ",

        // dues
        pending_dues: "bg-orange-500/10 text-orange-400 border-orange-500 ",
        zero_dues: "bg-green-500/10 text-green-400 border-green-500 ",

        // stock
        out_of_stock: "bg-red-500/20 text-red-400 border-red-500 ",
        critical_stock: "bg-red-500/10 text-red-400 border-red-500 ",
        good_stock: "bg-green-500/10 text-green-400 border-green-500 ",
        low_stock: "bg-orange-500/10 text-orange-400 border-orange-500 ",
        normal_stock: "bg-blue-500/10 text-blue-400 border-blue-500 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
