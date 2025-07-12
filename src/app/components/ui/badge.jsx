import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/app/lib/utils"

const badgeVariants = cva(
  "hover-lift inline-flex items-center justify-center rounded-lg border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-blue-600 focus-visible:ring-blue-600/30 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 ease-in-out overflow-hidden shadow-card",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-gentle-primary text-white [a&]:hover:bg-gradient-gentle-secondary transform hover:scale-105",
        secondary:
          "border-transparent bg-gradient-gentle-secondary text-secondary-foreground [a&]:hover:bg-gradient-gentle-secondary/90 transform hover:scale-105",
        destructive:
          "border-transparent bg-gradient-gentle-warm text-white [a&]:hover:bg-gradient-gentle-warm/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 transform hover:scale-105",
        outline:
          "text-foreground bg-gradient-gentle-neutral/50 [a&]:hover:bg-gradient-gentle-accent/20 [a&]:hover:text-accent-foreground transform hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
