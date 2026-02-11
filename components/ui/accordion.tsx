import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("rt-border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    chevronClassName?: string;
  }
>(({ className, children, chevronClassName, ...props }, ref) => (
  <AccordionPrimitive.Header className="rt-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "rt-relative rt-flex rt-flex-1 rt-items-center rt-justify-between rt-py-4 rt-text-sm rt-font-medium rt-transition-all hover:rt-underline rt-text-left [&[data-state=open]>svg]:rt-rotate-180",
        className,
      )}
      {...props}
    >
      {children}

      <ChevronDown
        className={cn(
          "rt-h-4 rt-w-4 rt-shrink-0 rt-text-muted-foreground rt-transition-transform rt-duration-200",
          chevronClassName,
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="rt-overflow-hidden rt-text-sm data-[state=closed]:rt-animate-accordion-up data-[state=open]:rt-animate-accordion-down"
    {...props}
  >
    <div className={cn("rt-pb-4 rt-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
