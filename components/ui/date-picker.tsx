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
    <div className={cn("rt-w-full", className)}>
      <div className="rt-relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "rt-w-full rt-justify-start rt-text-left rt-font-normal rt-px-3 rt-py-6 rt-h-auto",
                !value && "rt-text-muted-foreground",
                error && "rt-border-destructive",
              )}
            >
              <CalendarIcon className="rt-mr-2 rt-h-4 rt-w-4" />
              {value ? format(value, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="rt-w-auto rt-p-0" align="start">
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
              "rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2",
              "rt-text-muted-foreground rt-pointer-events-none",
              "rt-transition-all rt-duration-200 rt-ease-linear",
              "rt-bg-background rt-px-1",
              isFloating && "rt-top-0 rt-text-xs",
              error && isFloating && "rt-text-destructive",
            )}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="rt-text-sm rt-text-destructive rt-mt-1.5">{error}</p>
      )}
    </div>
  );
}
