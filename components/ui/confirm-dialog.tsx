import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/common/utils";
import { MutableRefObject } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  secondaryButtonHref?: string;
  showCloseButton?: boolean;
  primaryButtonDisabled?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  icon,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  secondaryButtonHref,
  showCloseButton = false,
  primaryButtonDisabled = false,
}: ConfirmDialogProps) {
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-[335px] translate-x-[-50%] translate-y-[-50%] gap-3 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-20 flex flex-col items-center justify-center text-center font-primary"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {showCloseButton && (
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

          <DialogHeader
            className={cn(
              "flex flex-col items-center space-y-3 text-center w-full",
              showCloseButton && "mt-3",
              !subtitle ? "mb-3" : "mb-2",
            )}
          >
            {icon && (
              <div
                className={cn(
                  "flex justify-center",
                  subtitle ? "mb-3" : "mb-5",
                )}
              >
                {icon}
              </div>
            )}
            <DialogTitle className="text-center text-16px font-semibold">
              {title}
            </DialogTitle>
            {subtitle && (
              <DialogDescription className="text-12px text-center text-muted">
                {subtitle}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-col gap-2 w-full items-center justify-center mt-1 font-primary">
            <Button
              onClick={onPrimaryClick}
              disabled={primaryButtonDisabled}
              className="w-full text-white"
            >
              <span className="text-16px w-full font-medium">
                {primaryButtonText}
              </span>
            </Button>

            {secondaryButtonHref ? (
              <Button
                asChild
                variant="plain"
                size="plain"
                className="w-full py-[11px] px-[77px] text-15px hover:text-gray-700"
              >
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            ) : (
              <Button
                onClick={handleSecondaryClick}
                variant="plain"
                className="w-full m-0 font-normal hover:text-gray-700"
              >
                {secondaryButtonText}
              </Button>
            )}
          </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
