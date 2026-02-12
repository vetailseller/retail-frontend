"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, removeNumberComma } from "@/common/utils";

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
  isCurrency?: boolean;
  error?: string;
  onChange?: (value: string) => void;
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
  isCurrency = false,
  error,
  onChange,
}: FormInputProps<TFieldValues>) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const isFloating =
          floatingLabel && (isFocused || hasValue || field.value);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          field.onBlur();
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let rawValue = e.target.value;

          if (isCurrency && !isNaN(Number(removeNumberComma(rawValue)))) {
            const formatted = formatNumber(Number(removeNumberComma(rawValue)));
            setHasValue(!!formatted);
            field.onChange(formatted);
          } else {
            setHasValue(!!rawValue);
            field.onChange(e);
          }
          if (onChange) {
            onChange(e.target.value);
          }
        };

        // Floating label implementation
        if (floatingLabel) {
          return (
            <div className={cn("rt-w-full", className)}>
              <div className="rt-relative">
                {startIcon && (
                  <div className="rt-absolute rt-left-4 rt-top-1/2 -rt-translate-y-1/2 rt-text-muted rt-pointer-events-none rt-z-10">
                    {startIcon}
                  </div>
                )}

                <input
                  {...field}
                  value={field.value ?? ""}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={cn(
                    "rt-hide-number-stepper rt-peer rt-w-full rt-rounded-10 rt-border rt-border-input rt-bg-transparent rt-px-4 rt-py-[10px] rt-text-base rt-shadow-sm rt-transition-all rt-no-autofill-bg",
                    "placeholder:rt-text-transparent rt-overflow-hidden rt-whitespace-nowrap rt-leading-none rt-h-[46px]",
                    "focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring",
                    "disabled:rt-cursor-not-allowed disabled:rt-opacity-50",
                    errorMessage &&
                      "rt-border-destructive focus-visible:rt-ring-destructive",
                    startIcon && "rt-pl-11",
                    endIcon && "rt-pr-10",
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {label && (
                  <label
                    className={cn(
                      "rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2",
                      "rt-pointer-events-none rt-font-secondary rt-text-[0.875rem] rt-leading-[1.0625rem] rt-text-muted",
                      "rt-transition-all rt-duration-200 rt-ease-linear",
                      "rt-bg-white rt-px-1",
                      isFloating && "rt-top-0 rt-text-[0.6875rem] rt-leading-[1.5rem]",
                      errorMessage && isFloating && "rt-text-destructive",
                      startIcon && !isFloating && "rt-left-10",
                      startIcon && isFloating && "rt-left-5",
                    )}
                  >
                    {label}
                  </label>
                )}

                {endIcon && (
                  <div className="rt-absolute rt-right-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-muted rt-pointer-events-none rt-z-10">
                    {endIcon}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="rt-text-[0.6875rem] rt-leading-[1.5rem] rt-text-destructive rt-mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("rt-w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "rt-text-destructive",
                  "rt-font-primary rt-text-[0.8125rem] rt-leading-[1.375rem] rt-text-[#4C4C4C] rt-font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="rt-relative rt-mt-2">
              {startIcon && (
                <div className="rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-muted rt-pointer-events-none rt-z-10">
                  {startIcon}
                </div>
              )}

              <Input
                {...field}
                value={field.value ?? ""}
                id={name}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete="one-time-code"
                className={cn(
                  "rt-hide-number-stepper rt-peer rt-w-full rt-rounded-10 rt-border rt-border-input rt-bg-white rt-px-4 rt-py-[12px] rt-text-base rt-shadow-sm rt-transition-all rt-h-[46px] focus:rt-ring-0",
                  "placeholder:rt-text-muted",
                  "focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-ring",
                  "disabled:rt-cursor-not-allowed disabled:rt-opacity-50",
                  errorMessage &&
                    "rt-border-destructive focus-visible:rt-ring-destructive",
                  startIcon && "rt-pl-10",
                  endIcon && "rt-pr-10",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {endIcon && (
                <div className="rt-absolute rt-right-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-muted rt-pointer-events-none rt-z-10">
                  {endIcon}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="rt-text-[0.6875rem] rt-leading-[1.5rem] rt-text-destructive rt-mt-1">
                {errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
