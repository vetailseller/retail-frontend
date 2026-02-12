import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "tr-flex tr-h-10 tr-w-full tr-items-center tr-justify-between tr-rounded-md tr-border tr-border-input tr-bg-background tr-px-3 tr-py-2 tr-text-sm tr-ring-offset-background placeholder:tr-text-muted-foreground focus:tr-outline-none focus:tr-ring-1 focus:tr-ring-ring focus:tr-ring-offset-2 disabled:tr-cursor-not-allowed [&>span]:tr-line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="tr-h-4 tr-w-4 tr-opacity-50 tr-text-primary" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "tr-flex tr-cursor-default tr-items-center tr-justify-center tr-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="tr-h-4 tr-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "tr-flex tr-cursor-default tr-items-center tr-justify-center tr-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="tr-h-4 tr-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "tr-relative tr-z-50 tr-max-h-96 tr-min-w-[8rem] tr-overflow-hidden tr-rounded-md tr-border tr-bg-popover tr-text-popover-foreground tr-shadow-md data-[state=open]:tr-animate-in data-[state=closed]:tr-animate-out data-[state=closed]:tr-fade-out-0 data-[state=open]:tr-fade-in-0 data-[state=closed]:tr-zoom-out-95 data-[state=open]:tr-zoom-in-95 data-[side=bottom]:tr-slide-in-from-top-2 data-[side=left]:tr-slide-in-from-right-2 data-[side=right]:tr-slide-in-from-left-2 data-[side=top]:tr-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:tr-translate-y-1 data-[side=left]:-tr-translate-x-1 data-[side=right]:tr-translate-x-1 data-[side=top]:-tr-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "tr-p-1",
          position === "popper" &&
            "tr-h-[var(--radix-select-trigger-height)] tr-w-full tr-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("tr-py-1.5 tr-pl-8 tr-pr-2 tr-text-sm tr-font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "tr-relative tr-flex tr-w-full tr-cursor-default tr-select-none tr-items-center tr-rounded-sm tr-py-1.5 tr-pl-8 tr-pr-2 tr-text-sm tr-outline-none focus:tr-bg-background focus:tr-text-black data-[disabled]:tr-pointer-events-none data-[disabled]:tr-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="tr-absolute tr-left-2 tr-flex tr-h-3.5 tr-w-3.5 tr-items-center tr-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="tr-h-4 tr-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-tr-mx-1 tr-my-1 tr-h-px tr-bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
