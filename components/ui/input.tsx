import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rt-flex rt-h-9 rt-w-full rt-rounded-md rt-border rt-border-input rt-bg-transparent rt-px-3 rt-py-1 rt-text-base rt-shadow-sm rt-transition-colors rt-file:rt-border-0 rt-file:rt-bg-transparent rt-file:rt-text-sm rt-file:rt-font-medium rt-file:rt-text-foreground rt-placeholder:rt-text-muted-foreground focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring disabled:rt-cursor-not-allowed disabled:rt-opacity-50 md:rt-text-sm rt-hide-number-stepper",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
