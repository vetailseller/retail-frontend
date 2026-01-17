/**
 * Reusable Popover Component
 * A customizable popover with icon, title, subtitle, and two action buttons
 */

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ReusablePopoverButton {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "plain";
  size?: "default" | "sm" | "lg" | "icon" | "plain";
}

export interface ReusablePopoverProps {
  /** The trigger element that opens the popover */
  trigger: React.ReactNode;
  /** Icon component or element to display at the top */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Primary button configuration */
  primaryButton: ReusablePopoverButton;
  /** Secondary button configuration (plain variant and size by default) */
  secondaryButton: ReusablePopoverButton;
  /** Whether to show the close button in the top-right corner */
  showCloseButton?: boolean;
  /** Custom class name for the popover content */
  className?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export function ReusablePopover({
  trigger,
  icon,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  showCloseButton = false,
  className,
  open,
  onOpenChange,
}: ReusablePopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const renderButton = (button: ReusablePopoverButton, isPrimary: boolean) => {
    const buttonVariant = button.variant || (isPrimary ? "default" : "plain");
    const buttonSize = button.size || (isPrimary ? "default" : "plain");

    const handleClick = () => {
      button.onClick?.();
      if (!button.href) {
        handleClose();
      }
    };

    if (button.href) {
      return (
        <Button
          asChild
          variant={buttonVariant}
          size={buttonSize}
          onClick={handleClick}
        >
          <Link href={button.href}>{button.label}</Link>
        </Button>
      );
    }

    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={handleClick}
      >
        {button.label}
      </Button>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn("relative", className)}
        onInteractOutside={(e) => {
          // Prevent closing when clicking outside
          e.preventDefault();
        }}
      >
        {/* Optional close button in top-right */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Centered content */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon */}
          {icon && <div className="flex items-center justify-center">{icon}</div>}

          {/* Title */}
          <h3 className="font-semibold text-lg leading-none tracking-tight">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2 w-full mt-2">
            {renderButton(primaryButton, true)}
            {renderButton(secondaryButton, false)}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
