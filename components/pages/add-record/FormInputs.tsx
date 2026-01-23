import React, { useEffect, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput, FormDatePicker } from "@/components/form";
import CalendarIcon from "@/components/icons/calendar.svg";
import PhoneIcon from "@/components/icons/phone.svg";
import { CreateRecordInput } from "@/common/types";
import { feeService } from "@/lib/api/fees";
import { removeNumberComma } from "@/common/utils";
import { branchService } from "@/lib/api/branch";

export interface FormInputsProps {
  control: Control<CreateRecordInput>;
  setValue: (name: keyof CreateRecordInput, value: any) => void;
  errors: FieldErrors<CreateRecordInput>;
}

export function FormInputs({ control, setValue, errors }: FormInputsProps) {
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  useEffect(() => {
    feeService.getByAmount(currentAmount).then(({ transferFee }) => {
      setValue("fee", String(transferFee.fee));
    });
  }, [currentAmount, setValue]);

  useEffect(() => {
    branchService.getAll().then(({ branches }) => {
      console.log("Branches:", JSON.stringify(branches, null, 2));
      /* @copilot, this is the response structure I got from the API call
		[
			{
				"Id": "1",
				"Name": "Main Branch"
			},
			{
				"Id": "1",
				"Name": "Main Branch"
			},
			{
				"Id": "1",
				"Name": "Main Branch"
			},
		]
	 */
    });
  }, []);

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
          endIcon={<span className="font-inter text-14px text-muted">Ks</span>}
          floatingLabel={false}
          isCurrency
          error={errors.amount?.message}
          onChange={(value) => {
            console.log(value);
            !isNaN(Number(removeNumberComma(value))) &&
              setCurrentAmount(Number(removeNumberComma(value)));
          }}
        />
        <FormInput
          name="fee"
          control={control}
          label="လွှဲခ/အမြတ်"
          placeholder="လွှဲခ/အမြတ်ထည့်ပါ"
          endIcon={<span className="font-inter text-14px text-muted">Ks</span>}
          floatingLabel={false}
          isCurrency
          error={errors.fee?.message}
        />
      </div>
    </div>
  );
}
