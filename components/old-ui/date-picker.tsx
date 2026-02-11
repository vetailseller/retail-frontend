/**
 * Date Picker Component
 * Date picker with floating label animation
 */

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  label?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  error,
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isFloating = isOpen || !!value;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-start text-left font-normal px-3 py-6 h-auto",
                !value && "text-muted-foreground",
                error && "border-destructive"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange?.(date);
                setIsOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Floating Label */}
        {label && (
          <label
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              "text-muted-foreground pointer-events-none",
              "transition-all duration-200 ease-linear",
              "bg-background px-1",
              isFloating && "top-0 text-xs",
              error && isFloating && "text-destructive"
            )}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
    </div>
  );
}
