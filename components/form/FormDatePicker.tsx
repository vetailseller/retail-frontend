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
import { formatCalendarDate } from "@/common/utils";

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
  showClearButton?: boolean;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  onClear?: () => void;
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
  showClearButton = false,
  showOkButton = false,
  showCancelButton = false,
  onClear,
}: FormDatePickerProps<TFieldValues>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>(undefined);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const dateValue = field.value ? new Date(field.value) : undefined;
        const isFloating = floatingLabel && (isOpen || !!field.value);

        const handleOpenChange = (open: boolean) => {
          if (open) {
            setTempDate(dateValue);
          }
          setIsOpen(open);
          if (!open) {
            setTempDate(undefined);
          }
        };

        const handleDateSelect = (date: Date | undefined) => {
          if (!date) return;

          if (showOkButton || showCancelButton) {
            // If action buttons are shown, just update temp date
            setTempDate(date);
          } else {
            // If no action buttons, apply change immediately
            handleDateChange(date);
          }
        };

        const handleDateChange = (date: Date | undefined) => {
          const formattedDate = date ? formatCalendarDate(date) : "";
          field.onChange(formattedDate);
          setIsOpen(false);
        };

        const handleOk = () => {
          handleDateChange(tempDate);
        };

        const handleCancel = () => {
          setTempDate(undefined);
          setIsOpen(false);
        };

        const handleClear = () => {
          field.onChange("");
          setTempDate(undefined);
          setIsOpen(false);
          onClear?.();
        };

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
                        "w-full justify-start text-left font-normal px-3 py-[10px] h-auto rounded-10 border-input bg-white hover:bg-white hover:text-black",
                        !dateValue && "text-muted-foreground",
                        errorMessage && "border-destructive",
                        startIcon && "pl-10",
                      )}
                    >
                      {startIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                          {startIcon}
                        </div>
                      )}
                      {dateValue ? (
                        formatCalendarDate(dateValue)
                      ) : (
                        <span className="text-transparent">{placeholder}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      navLayout="after"
                      selected={tempDate || dateValue}
                      onSelect={handleDateSelect}
                      autoFocus
                    />
                    {(showClearButton || showOkButton || showCancelButton) && (
                      <div className="flex gap-2 p-3 border-t">
                        {showClearButton && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleClear}
                            className="flex-1"
                          >
                            Clear
                          </Button>
                        )}
                        {showCancelButton && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        )}
                        {showOkButton && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleOk}
                            className="flex-1"
                          >
                            Ok
                          </Button>
                        )}
                      </div>
                    )}
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
                      startIcon && isFloating && "left-5",
                    )}
                  >
                    {label}
                  </label>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className=" text-11px text-destructive mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("w-full space-y-2", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(errorMessage && "text-destructive")}
              >
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
                    errorMessage &&
                      "border-destructive focus-visible:ring-destructive",
                    startIcon && "pl-10",
                  )}
                >
                  {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      {startIcon}
                    </div>
                  )}
                  {!startIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
                  {dateValue ? (
                    formatCalendarDate(dateValue)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempDate || dateValue}
                  onSelect={handleDateSelect}
                  autoFocus
                />
                {(showClearButton || showOkButton || showCancelButton) && (
                  <div className="flex gap-2 p-3 border-t">
                    {showClearButton && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                    )}
                    {showCancelButton && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    )}
                    {showOkButton && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleOk}
                        className="flex-1"
                      >
                        Ok
                      </Button>
                    )}
                  </div>
                )}
              </PopoverContent>
            </Popover>

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
