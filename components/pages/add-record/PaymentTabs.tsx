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
    <div className="w-full px-5">
      <Tabs
        defaultValue={selectedTab}
        className="w-full p-[10px] bg-[#F7F7F7] rounded-8"
        onValueChange={onTabChange as (value: string) => void}
      >
        <TabsList className="w-full mb-[9.48px]">
          <TabsTrigger value="pay" className="w-1/2">
            ငွေလွှဲအမျိုးအစား
          </TabsTrigger>
          <TabsTrigger value="bank" className="w-1/2">
            အခြားအမျိုးအစား
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pay">
          <div className="flex items-center gap-[14px]">
            {PAY_OPTIONS.map((pay) => (
              <Button
                type="button"
                variant="plain"
                size="plain"
                onClick={() => onPayChange(pay.value as PayType)}
                key={pay.value}
                className="relative"
              >
                <Image
                  src={pay.image}
                  width={46.02}
                  height={46.02}
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
              onClick={() => onPayChange("other")}
              className="relative"
            >
              <span className="px-[4.1px] py-[12.5px] text-center bg-primary text-white rounded-5">
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
          <If
            isTrue={selectedPay === "other"}
            ifBlock={
              <FormInput
                name="description"
                control={control}
                placeholder="အခြားပေး"
                className="mt-[15px]"
                startIcon={
                  <ThreeLineIcon className="w-[19px] h-[19px] text-muted" />
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
              <ThreeLineIcon className="w-[19px] h-[19px] text-muted" />
            }
            floatingLabel={false}
            error={errors.description?.message}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
