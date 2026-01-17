import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
      <DialogContent
        className="sm:max-w-md flex flex-col items-center justify-center text-center [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none !block z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}

        <DialogHeader className="flex flex-col items-center space-y-3 text-center">
          {icon && <div className="flex justify-center mb-2">{icon}</div>}
          <DialogTitle className="text-center">{title}</DialogTitle>
          {subtitle && (
            <DialogDescription className="text-center">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-col gap-2 w-full items-center justify-center mt-4">
          <Button
            onClick={onPrimaryClick}
            disabled={primaryButtonDisabled}
            className="w-full sm:w-auto"
          >
            {primaryButtonText}
          </Button>

          {secondaryButtonHref ? (
            <Button
              asChild
              variant="plain"
              size="plain"
              className="w-full sm:w-auto"
            >
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          ) : (
            <Button
              onClick={handleSecondaryClick}
              variant="plain"
              size="plain"
              className="w-full sm:w-auto"
            >
              {secondaryButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
