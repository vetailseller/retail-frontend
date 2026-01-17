import { Card, CardContent } from "@/components/ui/card";
import InfoIcon from "@/components/icons/info.svg";

export function InfoCard() {
  return (
    <Card className="px-5 border-0 shadow-none">
      <CardContent className="px-[15px] py-[10px] rounded-5  bg-[#DCEBFF] text-primary flex gap-[19px]">
        <div className="mt-[2px]">
          <InfoIcon className="w-5 h-5" />
        </div>
        <p className="font-bold text-13px leading-8">
          မိမိကြိုက်နှစ်သက်ရာငွေလွှဲပုံစံဖြင့်မှတ်လိုပါက “အခြားအမျိုးအစား”
          ကိုနှိပ်ပါ။
        </p>
      </CardContent>
    </Card>
  );
}
