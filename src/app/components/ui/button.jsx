import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/app/lib/utils"

const buttonVariants = cva(
  "btn-enhanced inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-blue-600 focus-visible:ring-blue-600/30 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-gentle-primary text-white shadow-card hover:bg-gradient-gentle-secondary hover:shadow-component transform hover:scale-105",
        destructive:
          "bg-gradient-gentle-warm text-white shadow-card hover:bg-gradient-gentle-warm/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 transform hover:scale-105",
        outline:
          "border border-border bg-gradient-gentle-neutral/50 shadow-card hover:bg-gradient-gentle-primary/20 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transform hover:scale-105",
        secondary:
          "bg-gradient-gentle-secondary text-secondary-foreground shadow-card hover:bg-gradient-gentle-secondary/80 transform hover:scale-105",
        ghost:
          "hover:bg-gradient-gentle-accent/20 hover:text-accent-foreground dark:hover:bg-accent/50 transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
