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
            <div className={cn("tr-w-full", className)}>
              <div className="tr-relative">
                {startIcon && (
                  <div className="tr-absolute tr-left-4 tr-top-1/2 -tr-translate-y-1/2 tr-text-muted tr-pointer-events-none tr-z-10">
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
                    "hide-number-stepper peer tr-w-full tr-rounded-10 tr-border tr-border-input tr-bg-transparent tr-px-4 tr-py-[10px] tr-text-base tr-shadow-sm tr-transition-all no-autofill-bg",
                    "placeholder:tr-text-transparent tr-overflow-hidden tr-whitespace-nowrap tr-leading-none tr-h-[46px]",
                    "focus-visible:tr-outline-none focus-visible:tr-ring-1 focus-visible:tr-ring-ring",
                    "disabled:tr-cursor-not-allowed disabled:tr-opacity-50",
                    errorMessage &&
                      "tr-border-destructive focus-visible:tr-ring-destructive",
                    startIcon && "tr-pl-11",
                    endIcon && "tr-pr-10",
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {label && (
                  <label
                    className={cn(
                      "tr-absolute tr-left-3 tr-top-1/2 -tr-translate-y-1/2",
                      "tr-pointer-events-none tr-font-secondary tr-text-14px tr-text-muted",
                      "tr-transition-all tr-duration-200 tr-ease-linear",
                      "tr-bg-white tr-px-1",
                      isFloating && "tr-top-0 tr-text-xs",
                      errorMessage && isFloating && "tr-text-destructive",
                      startIcon && !isFloating && "tr-left-10",
                      startIcon && isFloating && "tr-left-5",
                    )}
                  >
                    {label}
                  </label>
                )}

                {endIcon && (
                  <div className="tr-absolute tr-right-3 tr-top-1/2 -tr-translate-y-1/2 tr-text-muted tr-pointer-events-none tr-z-10">
                    {endIcon}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="tr-text-11px tr-text-destructive tr-mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("tr-w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "tr-text-destructive",
                  "tr-font-primary tr-text-13px tr-text-[#4C4C4C] tr-font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="tr-relative tr-mt-2">
              {startIcon && (
                <div className="tr-absolute tr-left-3 tr-top-1/2 -tr-translate-y-1/2 tr-text-muted tr-pointer-events-none tr-z-10">
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
                  "hide-number-stepper peer tr-w-full tr-rounded-10 tr-border tr-border-input tr-bg-white tr-px-4 tr-py-[12px] tr-text-base tr-shadow-sm tr-transition-all tr-h-[46px] focus:tr-ring-0",
                  "placeholder:tr-text-muted",
                  "focus-visible:tr-outline-none focus-visible:tr-ring-1 focus-visible:tr-ring-ring",
                  "disabled:tr-cursor-not-allowed disabled:tr-opacity-50",
                  errorMessage &&
                    "tr-border-destructive focus-visible:tr-ring-destructive",
                  startIcon && "tr-pl-10",
                  endIcon && "tr-pr-10",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {endIcon && (
                <div className="tr-absolute tr-right-3 tr-top-1/2 -tr-translate-y-1/2 tr-text-muted tr-pointer-events-none tr-z-10">
                  {endIcon}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="tr-text-11px tr-text-destructive tr-mt-1">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
