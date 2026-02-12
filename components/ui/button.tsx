import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "tr-inline-flex tr-items-center tr-justify-center tr-gap-2 tr-whitespace-nowrap tr-rounded-md tr-text-sm tr-font-medium tr-transition-colors focus-visible:tr-outline-none focus-visible:tr-ring-1 focus-visible:tr-ring-ring disabled:tr-pointer-events-none disabled:tr-opacity-50 [&_svg]:tr-pointer-events-none [&_svg]:tr-size-4 [&_svg]:tr-shrink-0",
  {
    variants: {
      variant: {
        default:
          "tr-bg-primary tr-text-white tr-shadow [&_svg]:tr-size-auto [&_svg]:tr-shrink-0",
        destructive:
          "tr-bg-destructive tr-text-destructive-foreground tr-shadow-sm hover:tr-bg-destructive/90",
        outline:
          "tr-border tr-border-input tr-bg-background tr-shadow-sm hover:tr-bg-accent hover:tr-text-accent-foreground",
        secondary:
          "tr-bg-secondary tr-text-secondary-foreground tr-shadow-sm hover:tr-bg-secondary/80",
        ghost: "hover:tr-bg-accent hover:tr-text-accent-foreground",
        link: "tr-text-primary tr-underline-offset-4 hover:tr-underline",
        plain:
          "tr-bg-transparent hover:tr-bg-transparent hover:tr-text-gray-100 [&_svg]:tr-pointer-events-none [&_svg]:tr-size-auto [&_svg]:tr-shrink-0",
      },
      size: {
        default: "tr-py-[11px] tr-px-[77px] tr-text-15px tr-font-bold",
        sm: "tr-h-8 tr-rounded-md tr-px-3 tr-text-xs",
        lg: "tr-h-10 tr-rounded-md tr-px-8",
        icon: "tr-h-9 tr-w-9",
        plain: "tr-p-0 tr-w-auto tr-h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
