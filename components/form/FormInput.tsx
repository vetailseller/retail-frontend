/**
 * FormInput Component
 * Reusable form input wrapper with RHF integration, optional floating labels, and validation
 */

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  floatingLabel?: boolean;
  validateOnChange?: boolean;
  error?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className,
  startIcon,
  endIcon,
  floatingLabel = true,
  validateOnChange = false,
  error,
}: FormInputProps<TFieldValues>) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const isFloating = floatingLabel && (isFocused || hasValue || field.value);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          field.onBlur();
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          field.onBlur();
          
          // Log validation state on blur
          console.log(`[${name}] Validation State:`, {
            error: errorMessage,
            isDirty: fieldState.isDirty,
            isTouched: fieldState.isTouched,
            isValid: !fieldState.error,
          });
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setHasValue(!!e.target.value);
          field.onChange(e);
          
          // Log change state
          console.log(`[${name}] Change State:`, {
            value: e.target.value,
            hasValue: !!e.target.value,
          });
        };

        // Floating label implementation
        if (floatingLabel) {
          return (
            <div className={cn("w-full", className)}>
              <div className="relative">
                {startIcon && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                    {startIcon}
                  </div>
                )}

                <input
                  {...field}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={cn(
                    "peer w-full rounded-10 border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-all",
                    "placeholder:text-transparent",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    errorMessage && "border-destructive focus-visible:ring-destructive",
                    startIcon && "pl-10",
                    endIcon && "pr-10"
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {label && (
                  <label
                    className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2",
                      "pointer-events-none font-secondary text-14px text-muted",
                      "transition-all duration-200 ease-linear",
                      "bg-white px-1",
                      isFloating && "top-0 text-xs",
                      errorMessage && isFloating && "text-destructive",
                      startIcon && !isFloating && "left-10",
                      startIcon && isFloating && "left-5"
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
              {errorMessage && (
                <p className="text-sm text-destructive mt-1.5">{errorMessage}</p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("w-full space-y-2", className)}>
            {label && (
              <Label htmlFor={name} className={cn(errorMessage && "text-destructive")}>
                {label}
              </Label>
            )}

            <div className="relative">
              {startIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                  {startIcon}
                </div>
              )}

              <Input
                {...field}
                id={name}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                className={cn(
                  errorMessage && "border-destructive focus-visible:ring-destructive",
                  startIcon && "pl-10",
                  endIcon && "pr-10"
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {endIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                  {endIcon}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-sm text-destructive mt-1.5">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
