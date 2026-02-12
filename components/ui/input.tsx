import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rt-flex rt-h-9 rt-w-full rt-rounded-md rt-border rt-border-input rt-bg-transparent rt-px-3 rt-py-1 rt-text-base rt-shadow-sm rt-transition-colors file:rt-border-0 file:rt-bg-transparent file:rt-text-sm file:rt-font-medium file:rt-text-foreground placeholder:rt-text-muted-foreground focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring disabled:rt-cursor-not-allowed disabled:rt-opacity-50 md:rt-text-sm hide-number-stepper",
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
