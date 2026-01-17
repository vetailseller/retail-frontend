import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput, FormDatePicker } from "@/components/form";
import CalendarIcon from "@/components/icons/calendar.svg";
import PhoneIcon from "@/components/icons/phone.svg";
import { CreateRecordInput } from "@/common/types";

export interface FormInputsProps {
  control: Control<CreateRecordInput>;
  errors: FieldErrors<CreateRecordInput>;
}

export function FormInputs({ control, errors }: FormInputsProps) {
  return (
    <div className="px-5 flex flex-col gap-7">
      <FormInput
        name="phoneNo"
        control={control}
        label="ဖုန်းနံပါတ်"
        placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
        startIcon={<PhoneIcon className="w-[19px] h-[19px] text-muted" />}
        floatingLabel={true}
        error={errors.phoneNo?.message}
      />

      <FormDatePicker
        name="date"
        control={control}
        label="ရက်စွဲ"
        placeholder="ရက်စွဲထည့်ပါ"
        startIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
        floatingLabel={true}
        error={errors.date?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="amount"
          control={control}
          label="ငွေသွင်း/ထုတ်ပမာဏ"
          placeholder="ငွေသွင်း/ထုတ်ပမာဏထည့်ပါ"
          endIcon={
            <span className="font-inter text-14px text-muted">Ks</span>
          }
          floatingLabel={false}
          isCurrency
          error={errors.amount?.message}
        />
        <FormInput
          name="fee"
          control={control}
          label="လွှဲခ/အမြတ်"
          placeholder="လွှဲခ/အမြတ်ထည့်ပါ"
          endIcon={
            <span className="font-inter text-14px text-muted">Ks</span>
          }
          floatingLabel={false}
          isCurrency
          error={errors.fee?.message}
        />
      </div>
    </div>
  );
}
