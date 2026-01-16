import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormDatePicker } from "@/components/form";
import { recordSchema } from "@/common/validators/schemas";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import { User } from "lucide-react";
import CalendarIcon from "@/components/icons/calendar.svg";
import { format } from "date-fns";

import PhoneIcon from "@/components/icons/phone.svg";

export interface RecordFormProps {
  onSubmit: (
    data: CreateRecordInput | UpdateRecordInput
  ) => void | Promise<void>;
  defaultValues?: Partial<CreateRecordInput>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function RecordForm({
  onSubmit,
  defaultValues,
  isLoading,
  isEdit = false,
}: RecordFormProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateRecordInput>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...defaultValues,
      date: defaultValues?.date || format(new Date(), "yyyy-MM-dd"),
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: CreateRecordInput) => {
    console.log("[Form] Submission State:", {
      isSubmitting: true,
      data,
    });

    try {
      await onSubmit(data);
      console.log("[Form] Submission State:", {
        isSubmitting: false,
        success: true,
      });
      if (!isEdit) {
        reset();
      }
    } catch (error) {
      console.error("[Form] Submission State:", {
        isSubmitting: false,
        success: false,
        error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-5">
      <div className="w-full h-28 border-2">
        {/* // @copilot  don't touch this div for now, just do whatever you have to in the div below this dev */}
      </div>
      <div className="flex flex-col gap-7">
        {/* Phone number field with floating label */}
        <FormInput
          name="title"
          control={control}
          label="ဖုန်းနံပါတ်"
          placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
          startIcon={<PhoneIcon className="w-[19px] h-[19px] text-muted" />}
          floatingLabel={true}
          error={errors.title?.message}
        />

        {/* Date field with floating label */}
        <FormDatePicker
          name="date"
          control={control}
          label="ရက်စွဲ"
          startIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
          floatingLabel={true}
          error={errors.date?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer ID - validates onChange */}
          <FormInput
            name="customerId"
            control={control}
            label="Customer ID"
            placeholder="Enter customer ID (optional)"
            startIcon={<User className="h-4 w-4" />}
            floatingLabel={true}
            validateOnChange={true}
            error={errors.customerId?.message}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading || isSubmitting} className="flex-1">
            {isLoading || isSubmitting
              ? "Submitting..."
              : isEdit
              ? "Update Record"
              : "Create Record"}
          </Button>

          {!isEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isLoading || isSubmitting}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
