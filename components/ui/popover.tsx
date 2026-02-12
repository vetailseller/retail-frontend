import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "rt-z-50 rt-w-72 rt-rounded-md rt-border rt-bg-popover rt-p-4 rt-text-popover-foreground rt-shadow-md rt-outline-none data-[state=open]:rt-animate-in data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=open]:rt-fade-in-0 data-[state=closed]:rt-zoom-out-95 data-[state=open]:rt-zoom-in-95 data-[side=bottom]:rt-slide-in-from-top-2 data-[side=left]:rt-slide-in-from-right-2 data-[side=right]:rt-slide-in-from-left-2 data-[side=top]:rt-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
