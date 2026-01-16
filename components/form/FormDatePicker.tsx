/**
 * FormDatePicker Component
 * Reusable date picker wrapper with RHF integration, optional floating labels, and validation
 */

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  floatingLabel?: boolean;
  error?: string;
  dateFormat?: string;
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Pick a date",
  disabled = false,
  className,
  startIcon,
  floatingLabel = true,
  error,
  dateFormat = "yyyy-MM-dd",
}: FormDatePickerProps<TFieldValues>) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const dateValue = field.value ? new Date(field.value) : undefined;
        const isFloating = floatingLabel && (isOpen || !!field.value);

        const handleOpenChange = (open: boolean) => {
          setIsOpen(open);
          if (!open) {
            // Log validation state when closing the popover
            console.log(`[${name}] Validation State:`, {
              error: errorMessage,
              isDirty: fieldState.isDirty,
              isTouched: fieldState.isTouched,
              isValid: !fieldState.error,
            });
          }
        };

        const handleDateChange = (date: Date | undefined) => {
          const formattedDate = date ? format(date, dateFormat) : "";
          field.onChange(formattedDate);
          setIsOpen(false);

          // Log change state
          console.log(`[${name}] Change State:`, {
            value: formattedDate,
            date: date,
          });
          
          // Log validation state after change
          console.log(`[${name}] Validation State:`, {
            error: errorMessage,
            isDirty: fieldState.isDirty,
            isTouched: fieldState.isTouched,
            isValid: !fieldState.error,
          });
        };

        // Floating label implementation
        if (floatingLabel) {
          return (
            <div className={cn("w-full", className)}>
              <div className="relative">
                <Popover open={isOpen} onOpenChange={handleOpenChange}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={disabled}
                      className={cn(
                        "w-full justify-start text-left font-normal px-3 py-6 h-auto rounded-10 border-input",
                        !dateValue && "text-muted-foreground",
                        errorMessage && "border-destructive",
                        startIcon && "pl-10"
                      )}
                    >
                      {startIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                          {startIcon}
                        </div>
                      )}
                      {dateValue ? (
                        format(dateValue, "PPP")
                      ) : (
                        <span className="text-transparent">{placeholder}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Floating Label */}
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

            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateValue && "text-muted-foreground",
                    errorMessage && "border-destructive focus-visible:ring-destructive",
                    startIcon && "pl-10"
                  )}
                >
                  {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      {startIcon}
                    </div>
                  )}
                  {!startIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
                  {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

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
