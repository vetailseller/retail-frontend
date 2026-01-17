import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormDatePicker } from "@/components/form";
import { recordSchema } from "@/common/validators/schemas";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import CalendarIcon from "@/components/icons/calendar.svg";
import FloppyDisk from "@/components/icons/floppy-disk.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import PhoneIcon from "@/components/icons/phone.svg";

export interface RecordFormProps {
  onSubmit: (
    data: CreateRecordInput | UpdateRecordInput
  ) => void | Promise<void>;
  defaultValues?: CreateRecordInput;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function RecordForm({
  onSubmit,
  defaultValues,
  isLoading,
  isEdit = false,
}: RecordFormProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<CreateRecordInput | UpdateRecordInput | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      fee: "0",
      amount: "0",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: CreateRecordInput) => {
    console.log("[Form] Submission State:", {
      isSubmitting: true,
      data,
    });

    // Store the data and show confirmation dialog instead of submitting immediately
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;

    console.log("[Form] Confirmed Submission State:", {
      isSubmitting: true,
      data: pendingData,
    });

    try {
      await onSubmit(pendingData);
      console.log("[Form] Submission State:", {
        isSubmitting: false,
        success: true,
      });
      if (!isEdit) {
        reset();
      }
      setShowConfirmDialog(false);
      setPendingData(null);
    } catch (error) {
      console.error("[Form] Submission State:", {
        isSubmitting: false,
        success: false,
        error,
      });
      setShowConfirmDialog(false);
      setPendingData(null);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6 mt-5 h-full flex-1 relative overflow-y-auto"
    >
      <div className="w-full px-5 h-28 border-2">
        {/* // @copilot  don't touch this div for now, just do whatever you have to in the div below this dev */}
      </div>
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

      <div className="flex items-center justify-center gap-3 w-full h-[94px] shadow-[0px_-2px_15px_0px_rgba(0,0,0,0.1)] mt-auto">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="text-white w-11/12 "
        >
          <span className="font-primary text-15px  mr-[7px]">
            စာရင်းမှတ်တမ်း မှတ်မည်
          </span>
          <FloppyDisk />
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        icon={<FloppyDisk className="w-12 h-12" />}
        title="အတည်ပြုပါ"
        subtitle="စာရင်းမှတ်တမ်းကို သိမ်းဆည်းမှာ သေချာပါသလား?"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={handleConfirmSubmit}
        onSecondaryClick={handleCancelSubmit}
        showCloseButton={false}
        primaryButtonDisabled={isLoading}
      />
    </form>
  );
}
