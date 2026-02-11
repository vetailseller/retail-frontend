import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "rt-fixed rt-inset-0 rt-z-50 rt-bg-black/80  data-[state=open]:rt-animate-in data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=open]:rt-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "rt-fixed rt-left-[50%] rt-top-[50%] rt-z-50 rt-grid rt-w-full rt-max-w-lg rt-translate-x-[-50%] rt-translate-y-[-50%] rt-gap-4 rt-border rt-bg-background rt-p-6 rt-shadow-lg rt-duration-200 data-[state=open]:rt-animate-in data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=open]:rt-fade-in-0 data-[state=closed]:rt-zoom-out-95 data-[state=open]:rt-zoom-in-95 data-[state=closed]:rt-slide-out-to-left-1/2 data-[state=closed]:rt-slide-out-to-top-[48%] data-[state=open]:rt-slide-in-from-left-1/2 data-[state=open]:rt-slide-in-from-top-[48%] sm:rt-rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="rt-absolute rt-right-4 rt-top-4 rt-rounded-sm rt-opacity-70 rt-ring-offset-background rt-transition-opacity hover:rt-opacity-100 focus:rt-outline-none focus:rt-ring-2 focus:rt-ring-ring focus:rt-ring-offset-2 disabled:rt-pointer-events-none data-[state=open]:rt-bg-accent data-[state=open]:rt-text-muted-foreground">
        <X className="rt-h-4 rt-w-4" />
        <span className="rt-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rt-flex rt-flex-col rt-space-y-1.5 rt-text-center sm:rt-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rt-flex rt-flex-col-reverse sm:rt-flex-row sm:rt-justify-end",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("rt-text-lg rt-leading-none rt-tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("rt-text-sm rt-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
