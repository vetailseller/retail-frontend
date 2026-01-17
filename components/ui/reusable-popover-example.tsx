/**
 * Example usage of ReusablePopover component
 * This file demonstrates how to use the reusable popover
 */

import React from "react";
import { ReusablePopover } from "@/components/ui/reusable-popover";
import { Button } from "@/components/ui/button";
import { AlertCircle, Info, CheckCircle } from "lucide-react";

export function ReusablePopoverExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">Reusable Popover Examples</h1>

      {/* Example 1: Basic popover with close button */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Example 1: With Close Button</h2>
        <ReusablePopover
          trigger={<Button>Open Popover with Close</Button>}
          icon={<Info className="w-8 h-8 text-blue-500" />}
          title="Information"
          subtitle="This is a reusable popover with a close button in the top-right corner."
          primaryButton={{
            label: "Got it!",
            onClick: () => console.log("Primary button clicked"),
          }}
          secondaryButton={{
            label: "Cancel",
            onClick: () => console.log("Secondary button clicked"),
          }}
          showCloseButton={true}
        />
      </div>

      {/* Example 2: Popover without close button */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Example 2: Without Close Button</h2>
        <ReusablePopover
          trigger={<Button variant="outline">Open Popover without Close</Button>}
          icon={<CheckCircle className="w-8 h-8 text-green-500" />}
          title="Success!"
          subtitle="Your action has been completed successfully."
          primaryButton={{
            label: "Continue",
            onClick: () => console.log("Continue clicked"),
          }}
          secondaryButton={{
            label: "Dismiss",
            onClick: () => console.log("Dismiss clicked"),
          }}
          showCloseButton={false}
        />
      </div>

      {/* Example 3: Popover with Next Link navigation */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Example 3: With Navigation Link</h2>
        <ReusablePopover
          trigger={<Button variant="secondary">Open with Link</Button>}
          icon={<AlertCircle className="w-8 h-8 text-orange-500" />}
          title="Navigate to Another Page"
          subtitle="Click the button below to navigate to the home page."
          primaryButton={{
            label: "Go to Home",
            href: "/",
          }}
          secondaryButton={{
            label: "Stay Here",
            onClick: () => console.log("Stay here clicked"),
          }}
          showCloseButton={true}
        />
      </div>

      {/* Example 4: Simple popover without icon or subtitle */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Example 4: Minimal Popover</h2>
        <ReusablePopover
          trigger={<Button variant="ghost">Open Minimal</Button>}
          title="Confirm Action"
          primaryButton={{
            label: "Confirm",
            onClick: () => console.log("Confirmed"),
          }}
          secondaryButton={{
            label: "Cancel",
            onClick: () => console.log("Cancelled"),
          }}
          showCloseButton={false}
        />
      </div>

      {/* Example 5: Custom button variants and sizes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Example 5: Custom Button Styles</h2>
        <ReusablePopover
          trigger={<Button variant="destructive">Delete Item</Button>}
          icon={<AlertCircle className="w-8 h-8 text-red-500" />}
          title="Delete Confirmation"
          subtitle="Are you sure you want to delete this item? This action cannot be undone."
          primaryButton={{
            label: "Delete",
            variant: "destructive",
            onClick: () => console.log("Item deleted"),
          }}
          secondaryButton={{
            label: "Cancel",
            variant: "outline",
            size: "default",
            onClick: () => console.log("Deletion cancelled"),
          }}
          showCloseButton={true}
        />
      </div>
    </div>
  );
}
