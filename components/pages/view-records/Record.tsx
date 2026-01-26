import { PAYMENT_IMAGES } from "@/common/constants/payment";
import type { RecordItem } from "@/common/types";
import { cn, formatNumber } from "@/common/utils";
import Image from "next/image";

export interface RecordProps {
  record: Partial<RecordItem>;
  className?: string;
}

export function Record({ record, className }: RecordProps) {
  const PaymentImage = PAYMENT_IMAGES[record.pay!];

  return (
    <div
      key={record.id}
      className={cn(
        "w-full border-b last:border-0 pb-[15px] px-[15px] hover:bg-gray-50 flex flex-col bg-white",
        PaymentImage ? "pt-[12.75px] gap-[12.75px]" : "pt-5 gap-5",
        className,
      )}
    >
      <div className=" flex justify-between items-center">
        {PaymentImage ? (
          <Image
            src={PaymentImage}
            alt={record.pay!}
            width={27}
            height={27}
            className="rounded-5"
          />
        ) : (
          <span className="font-primary font-medium text-[13px] leading-none">
            {record.description}
          </span>
        )}
        <span className="font-inter text-15px leading-none">
          {formatNumber(record.amount!)} Ks
        </span>
      </div>
      <div className="font-inter text-15px flex justify-between items-center leading-none">
        <span>{record.phoneNo}</span>
        <span className="text-accent">{formatNumber(record.fee!)} Ks</span>
      </div>
    </div>
  );
}
