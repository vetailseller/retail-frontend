"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  floatingLabel?: boolean;
  error?: string;
  options: FormSelectOption[];
  required?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  className,
  startIcon,
  endIcon,
  floatingLabel = true,
  error,
  options,
  required = false,
  helperText,
  onChange,
}: FormSelectProps<TFieldValues>) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const isFloating =
          floatingLabel && (isFocused || hasValue || field.value);

        const handleFocus = () => {
          setIsFocused(true);
        };

        const handleBlur = () => {
          setIsFocused(false);
          setHasValue(!!field.value);
          field.onBlur();
        };

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value;
          setHasValue(!!value);
          field.onChange(value);
          if (onChange) {
            onChange(value);
          }
        };

        // Floating label implementation
        if (floatingLabel) {
          return (
            <div className={cn("w-full", className)}>
              <div className="relative">
                {startIcon && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                    {startIcon}
                  </div>
                )}

                <select
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  className={cn(
                    "peer w-full rounded-10 border border-input bg-transparent px-4 py-[10px] text-base shadow-sm transition-all appearance-none cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    errorMessage &&
                      "border-destructive focus-visible:ring-destructive",
                    startIcon && "pl-11",
                    (endIcon || helperText) && "pr-10",
                    endIcon && helperText && "pr-32",
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

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

                {helperText && !errorMessage && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10 text-11px whitespace-nowrap">
                    {helperText}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-11px text-destructive mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above select
        return (
          <div className={cn("w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "text-destructive",
                  "font-primary text-13px text-[#4C4C4C] font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="relative mt-2">
              {startIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                  {startIcon}
                </div>
              )}

              <select
                {...field}
                value={field.value ?? ""}
                id={name}
                disabled={disabled}
                className={cn(
                  "peer w-full rounded-10 border border-input bg-white px-4 py-[12px] text-base shadow-sm transition-all h-[46px] appearance-none cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  errorMessage &&
                    "border-destructive focus-visible:ring-destructive",
                  startIcon && "pl-11",
                  (endIcon || helperText) && "pr-10",
                  endIcon && helperText && "pr-32",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  {placeholder}
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {endIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
                  {endIcon}
                </div>
              )}

              {helperText && !errorMessage && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10 text-11px whitespace-nowrap">
                  {helperText}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-11px text-destructive mt-1">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
