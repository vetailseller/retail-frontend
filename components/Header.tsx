import Link from "next/link";
import LeftArrowIcon from "@/components/icons/left-arrow.svg";
import CrossIcon from "@/components/icons/cross.svg";
import If from "./If";
import { Button } from "./ui/button";
import { cn } from "@/common/utils";
import { Info, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  navLabel: string;
  navLink: string;
  enableDownload?: boolean;
  enableInstructionModal?: boolean;
  longHeader?: boolean;
}

const Header = ({
  navLabel,
  navLink,
  enableDownload = false,
  enableInstructionModal = false,
  longHeader = false,
}: Props) => {
  const [showInstructionModal, setShowInstructionModal] = useState(false);

  return (
    <header
      className={cn(
        "bg-primary text-white border-b font-bold font-secondary px-[19px] pt-4 pb-4 relative",
        longHeader ? "h-[185px]" : "h-[65px]",
      )}
    >
      <div className="flex justify-between items-center">
        <Link href={navLink} className="flex items-center">
          <LeftArrowIcon className="w-9 h-9" />
          <p className="text-17px">{navLabel}</p>
        </Link>
        <If
          isTrue={enableDownload}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="flex items-center gap-[5px] [&_svg]:w-4 [&_svg]:h-4"
            >
              <Info />
              <span className="font-bold text-12px mt-[6px]">
                ဒေါင်းလုပ်ဆွဲမည်
              </span>
            </Button>
          }
        />
        <If
          isTrue={enableInstructionModal}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="flex items-center gap-[5px] [&_svg]:w-4 [&_svg]:h-4"
              onClick={() => setShowInstructionModal((state) => !state)}
            >
              <Info />
              <span className="font-bold text-12px mt-[6px]">
                လွှဲခထည့်နည်း
              </span>
            </Button>
          }
        />
      </div>
      <If
        isTrue={showInstructionModal}
        ifBlock={
          <Card className="absolute left-1/2 -bottom-[218px] -translate-x-1/2 -translate-y-1/2 w-11/12 bg-primary text-white rounded-5 shadow-none border-0 z-10 p-0 font-primary">
            <CardHeader className="px-[15px] py-[10px] flex flex-row items-center justify-between">
              <CardTitle className="text-16px font-bold flex items-center gap-[10px]">
                <Info className="w-5 h-5" />
                <span className="font-bold text-13px mt-[6px] mb-1">
                  လွှဲခထည့်နည်း
                </span>
              </CardTitle>
              <Button
                variant="plain"
                size="plain"
                onClick={() => setShowInstructionModal(false)}
                className="!m-0"
              >
                <CrossIcon className="text-white" />
              </Button>
            </CardHeader>
            <CardContent className="px-[15px] pb-[15px] mt-[1px]">
              <p className="text-13px font-normal">
                ၁၀၀၀ မှ ၁၀၀၀၀ အတွင်းကို လွှဲခ ၅၀၀ ကောက်လိုပါက ၁၀၀၀ ကို “မှ”
                တွင်ထည့်၍ ၁၀၀၀၀ ကို “သို့” တွင်ထည့်ပါ။ ၅၀၀ ကို “လွှဲခ”
                တွင်ထည့်ပါ။
              </p>
            </CardContent>
          </Card>
        }
      />
    </header>
  );
};

export default Header;
