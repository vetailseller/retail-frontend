import React, { Dispatch, SetStateAction } from "react";

import { PAY_OPTIONS } from "@/common/constants/payment";
import { PayType, RecordItem, RecordReportQuery } from "@/common/types";
import If from "@/components/If";
import { Button } from "@/components/ui/button";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import Image from "next/image";
import { FormDatePicker } from "@/components/form";
import { CalendarIcon } from "lucide-react";
import { Control, FieldErrors, useWatch } from "react-hook-form";
import { addMonths, subMonths } from "date-fns";

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
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Dynamic windows
  const startMin = end ? subMonths(end, 3) : undefined;
  const startMax = end || undefined;

  const endMin = start || undefined;
  const endMax = start ? addMonths(start, 3) : undefined;

  return (
    <div className="tr-py-[15px] tr-px-5 tr-bg-white tr-flex tr-flex-col tr-gap-5">
      <div className="tr-grid tr-grid-cols-[1fr_auto_1fr] tr-items-center">
        <FormDatePicker
          name="startDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="tr-h-4 tr-w-4 tr-mb-1" />}
          floatingLabel={false}
          error={errors.startDate?.message}
          showError={false}
          showOkButton
          showCancelButton
          showClearButton
          className="tr-text-primary hover:tr-text-primary"
          btnClassName="hover:tr-text-primary"
          disabledDays={{
            ...(startMin && { before: startMin }),
            ...(startMax && { after: startMax }),
          }}
          defaultMonth={start || end || undefined}
        />
        <span className="tr-px-6 tr-text-muted tr-font-primary">မှ</span>
        <FormDatePicker
          name="endDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="tr-h-4 tr-w-4 tr-mb-1" />}
          floatingLabel={false}
          error={errors.endDate?.message}
          showError={false}
          showOkButton
          showCancelButton
          showClearButton
          className="tr-text-primary hover:tr-text-primary"
          btnClassName="hover:tr-text-primary"
          disabledDays={{
            ...(endMin && { before: endMin }),
            ...(endMax && { after: endMax }),
          }}
          defaultMonth={end || start || undefined}
        />
      </div>
      <div>
        <div className="tr-flex tr-items-center tr-gap-[12px]">
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay(null)}
            className="tr-relative"
          >
            <span className="tr-px-[14px] tr-py-[9.5px] tr-text-center tr-bg-primary tr-text-white tr-rounded-5 tr-text-11px">
              All
            </span>
            <If
              isTrue={selectedPay === null}
              ifBlock={
                <CheckCircleSmIcon className="tr-w-[5px]! tr-h-[5px]! tr-absolute -tr-right-2 -tr-top-2" />
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
              className="tr-relative"
            >
              <Image
                src={pay.image}
                width={43.02}
                height={43.02}
                alt={pay.value}
                className="tr-rounded-5"
              />
              <If
                isTrue={selectedPay === (pay.value as PayType)}
                ifBlock={
                  <CheckCircleSmIcon className="tr-w-[5px]! tr-h-[5px]! tr-absolute -tr-right-2 -tr-top-2" />
                }
              />
            </Button>
          ))}
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay("other")}
            className="tr-relative"
          >
            <span className="tr-px-[5.1px] tr-py-[10px] tr-text-center tr-bg-primary tr-text-white tr-rounded-5 tr-text-11px">
              အခြား
            </span>
            <If
              isTrue={selectedPay === "other"}
              ifBlock={
                <CheckCircleSmIcon className="tr-w-[5px]! tr-h-[5px]! tr-absolute -tr-right-2 -tr-top-2" />
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
