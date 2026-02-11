import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import If from "@/components/If";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import ThreeLineIcon from "@/components/icons/three-line.svg";
import { CreateRecordInput, PayType, RecordType } from "@/common/types";
import { PAY_OPTIONS } from "@/common/constants/payment";

export interface PaymentTabsProps {
  selectedTab: RecordType;
  selectedPay: PayType;
  control: Control<CreateRecordInput>;
  errors: FieldErrors<CreateRecordInput>;
  onTabChange: (value: RecordType) => void;
  onPayChange: (value: PayType) => void;
}

export function PaymentTabs({
  selectedTab,
  selectedPay,
  control,
  errors,
  onTabChange,
  onPayChange,
}: PaymentTabsProps) {
  return (
    <div className="rt-w-full rt-px-5">
      <Tabs
        defaultValue={selectedTab}
        className="rt-w-full rt-p-[10px] rt-bg-[#F7F7F7] rt-rounded-8"
        onValueChange={onTabChange as (value: string) => void}
      >
        <TabsList className="rt-w-full rt-mb-[9.48px]">
          <TabsTrigger value="pay" className="rt-w-1/2">
            ငွေလွှဲအမျိုးအစား
          </TabsTrigger>
          <TabsTrigger value="bank" className="rt-w-1/2">
            အခြားအမျိုးအစား
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pay">
          <div className="rt-flex rt-items-center rt-gap-[14px]">
            {PAY_OPTIONS.map((pay) => (
              <Button
                type="button"
                variant="plain"
                size="plain"
                onClick={() => onPayChange(pay.value as PayType)}
                key={pay.value}
                className="rt-relative"
              >
                <Image
                  src={pay.image}
                  width={46.02}
                  height={46.02}
                  alt={pay.value}
                  className="rt-rounded-5"
                />
                <If
                  isTrue={selectedPay === (pay.value as PayType)}
                  ifBlock={
                    <CheckCircleSmIcon className="rt-w-[5px]! rt-h-[5px]! rt-absolute -rt-right-2 -rt-top-2" />
                  }
                />
              </Button>
            ))}
            <Button
              type="button"
              variant="plain"
              size="plain"
              onClick={() => onPayChange("other")}
              className="rt-relative"
            >
              <span className="rt-px-[4.1px] rt-py-[12.5px] rt-text-center rt-bg-primary rt-text-white rt-rounded-5">
                အခြား
              </span>
              <If
                isTrue={selectedPay === "other"}
                ifBlock={
                  <CheckCircleSmIcon className="rt-w-[5px]! rt-h-[5px]! rt-absolute -rt-right-2 -rt-top-2" />
                }
              />
            </Button>
          </div>
          <If
            isTrue={selectedPay === "other"}
            ifBlock={
              <FormInput
                name="description"
                control={control}
                placeholder="အခြားပေး"
                className="rt-mt-[15px]"
                startIcon={
                  <ThreeLineIcon className="rt-w-[19px] rt-h-[19px] rt-text-muted" />
                }
                floatingLabel={false}
                error={errors.description?.message}
              />
            }
          />
        </TabsContent>
        <TabsContent value="bank">
          <FormInput
            name="description"
            control={control}
            placeholder="အခြားအမျိုးအစား"
            startIcon={
              <ThreeLineIcon className="rt-w-[19px] rt-h-[19px] rt-text-muted" />
            }
            floatingLabel={false}
            error={errors.description?.message}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
