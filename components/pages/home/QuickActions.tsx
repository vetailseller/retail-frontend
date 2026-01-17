/**
 * Quick Actions Component
 * Displays quick action buttons for common tasks
 */

import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/common/constants";
import NoteBookIcon from "@/components/icons/note-book.svg";
import NotePencilIcon from "@/components/icons/note-pencil.svg";
import GearSixIcon from "@/components/icons/gear-six.svg";
import Link from "next/link";

const actions = [
  {
    label: "စာရင်းမှတ်မည်",
    route: ROUTES.ADD_RECORD,
    icon: NotePencilIcon,
  },
  {
    label: "စာရင်းကြည့်မည်",
    route: ROUTES.VIEW_RECORDS,
    icon: NoteBookIcon,
  },
  {
    label: "လွှဲခထည့်မည်",
    route: ROUTES.ADD_FEE,
    icon: GearSixIcon,
  },
];

export function QuickActions() {
  return (
    <Card className="w-[360px] mx-auto border-0 shadow-none rounded-10">
      <CardContent className="flex justify-between font-primary px-[15px] py-[13px]">
        {actions.map((action) => (
          <Link
            key={action.route}
            href={action.route}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[52px] h-[52px] bg-primary-light flex items-center justify-center rounded-full">
              <action.icon className="w-6 text-primary-muted" />
            </div>
            <span className="text-12px">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
