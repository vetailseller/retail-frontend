/**
 * Animated Input Component
 * Input with floating placeholder animation
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, label, error, startIcon, endIcon, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const isFloating =
      isFocused || hasValue || props.value || props.defaultValue;

    return (
      <div className="w-full">
        <div className={cn("relative", className)}>
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
              {startIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "peer w-full rounded-10 border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-all",
              "placeholder:text-transparent",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive",
              startIcon && "pl-10",
              endIcon && "pr-10",
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {label && (
            <label
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "pointer-events-none font-secondary text-14px text-muted",
                "transition-all duration-200 ease-linear",
                "bg-white px-1",
                isFloating && "top-0 text-xs",
                error && isFloating && "text-destructive",
                startIcon && !isFloating && "left-10",
                startIcon && isFloating && "left-5",
              )}
            >
              {label}
            </label>
          )}

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
              {endIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
      </div>
    );
  },
);

AnimatedInput.displayName = "AnimatedInput";

export { AnimatedInput };
