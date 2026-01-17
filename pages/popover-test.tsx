/**
 * Test page for ReusablePopover component
 * Navigate to /popover-test to see the component in action
 */

import { ReusablePopoverExample } from "@/components/ui/reusable-popover-example";
import { Layout } from "@/components/ui/layout";

export default function PopoverTestPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <ReusablePopoverExample />
      </div>
    </Layout>
  );
}
