import React, { Dispatch, SetStateAction } from "react";

import { PAY_OPTIONS } from "@/common/constants/payment";
import { PayType, RecordItem, RecordReportQuery } from "@/common/types";
import If from "@/components/If";
import { Button } from "@/components/ui/button";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import Image from "next/image";
import { FormDatePicker } from "@/components/form";
import { CalendarIcon } from "lucide-react";
import { Control, FieldErrors } from "react-hook-form";

export interface RecordsFilterProps {
  control: Control<RecordReportQuery>;
  errors: FieldErrors<RecordReportQuery>;
  selectedPay: PayType | null;
  setSelectedPay: Dispatch<SetStateAction<PayType | null>>;
}

export function RecordsFilter({
  control,
  errors,
  selectedPay,
  setSelectedPay,
}: RecordsFilterProps) {
  return (
    <div className="py-[15px] px-5 bg-white flex flex-col gap-5">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <FormDatePicker
          name="startDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
          floatingLabel={false}
          error={errors.startDate?.message}
          showOkButton
          showCancelButton
          showClearButton
          className="text-primary hover:text-primary"
          btnClassName="hover:text-primary"
        />
        <span className="px-6 text-muted font-primary">မှ</span>
        <FormDatePicker
          name="endDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
          floatingLabel={false}
          error={errors.endDate?.message}
          showOkButton
          showCancelButton
          showClearButton
          className="text-primary hover:text-primary"
          btnClassName="hover:text-primary"
        />
      </div>
      <div>
        <div className="flex items-center gap-[12px]">
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay(null)}
            className="relative"
          >
            <span className="px-[14px] py-[9.5px] text-center bg-primary text-white rounded-5 text-11px">
              All
            </span>
            <If
              isTrue={selectedPay === null}
              ifBlock={
                <CheckCircleSmIcon className="w-[5px]! h-[5px]! absolute -right-2 -top-2" />
              }
            />
          </Button>
          {PAY_OPTIONS.map((pay) => (
            <Button
              type="button"
              variant="plain"
              size="plain"
              onClick={() => setSelectedPay(pay.value as PayType)}
              key={pay.value}
              className="relative"
            >
              <Image
                src={pay.image}
                width={43.02}
                height={43.02}
                alt={pay.value}
                className="rounded-5"
              />
              <If
                isTrue={selectedPay === (pay.value as PayType)}
                ifBlock={
                  <CheckCircleSmIcon className="w-[5px]! h-[5px]! absolute -right-2 -top-2" />
                }
              />
            </Button>
          ))}
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay("other")}
            className="relative"
          >
            <span className="px-[5.1px] py-[10px] text-center bg-primary text-white rounded-5 text-11px">
              အခြား
            </span>
            <If
              isTrue={selectedPay === "other"}
              ifBlock={
                <CheckCircleSmIcon className="w-[5px]! h-[5px]! absolute -right-2 -top-2" />
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
