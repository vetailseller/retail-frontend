import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/plus.svg";
import Image from "next/image";
import { UseFieldArrayAppend } from "react-hook-form";
import { Fee } from "@/common/types";

export interface InfoCardProps {
  append: UseFieldArrayAppend<{ fees: Fee[] }>;
}

export function InfoCard({ append }: InfoCardProps) {
  return (
    <div className="px-5 border-0 shadow-none flex flex-col items-center justify-center gap-6 font-primary">
      <div>
        <Image
          src="/images/add-fee-logo.png"
          alt="Info"
          width={105}
          height={106.54}
        />
      </div>
      <p className="text-17px font-medium">ငွေလွှဲငွေထုတ်အတွက် လွှဲခထည့်ရန်</p>
      <Button
        variant="secondary"
        className="bg-secondary-light py-3 px-[25px] rounded-full text-13px font-medium"
        onClick={() =>
          append({ id: `temp-id-${Date.now()}`, fee: "0", from: "0", to: "0" })
        }
      >
        <PlusIcon />
        လွှဲခထပ်ထည့်မည်
      </Button>
    </div>
  );
}
