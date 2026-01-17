import React, { MutableRefObject, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { recordSchema, createRecordSchema } from "@/common/validators/schemas";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import FloppyDisk from "@/components/icons/floppy-disk.svg";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ROUTES } from "@/common/constants";
import { PaymentTabs } from "./PaymentTabs";
import { FormInputs } from "./FormInputs";

export interface RecordFormProps {
  onSubmit: (
    data: CreateRecordInput | UpdateRecordInput,
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
  const [pendingData, setPendingData] = useState<
    CreateRecordInput | UpdateRecordInput | null
  >(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPay, setSelectedPay] = useState("kbzpay");
  const [selectedTab, setSelectedTab] = useState("pay");

  console.log({ selectedPay, selectedTab });

  // Use ref to store latest values for the resolver
  const selectedPayRef = useRef(selectedPay);
  const selectedTabRef = useRef(selectedTab);

  useEffect(() => {
    selectedPayRef.current = selectedPay;
    selectedTabRef.current = selectedTab;
  }, [selectedPay, selectedTab]);

  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateRecordInput>({
    resolver: async (data, context, options) => {
      // Use the current values from refs
      const schema = createRecordSchema(selectedPayRef.current, selectedTabRef.current);
      return zodResolver(schema)(data, context, options);
    },
    defaultValues: {
      fee: "0",
      amount: "0",
    } as Partial<CreateRecordInput>,
    mode: "onChange",
  });

  // Revalidate description field when selectedPay or selectedTab changes
  useEffect(() => {
    // Trigger validation when the conditions change
    trigger("description");
  }, [selectedPay, selectedTab, trigger]);

  const handleFormSubmit = async (data: CreateRecordInput) => {
    console.log("[Form] Submission State:", {
      isSubmitting: true,
      data,
    });

    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;

    try {
      await onSubmit(pendingData);

      if (!isEdit) {
        reset();
      }
      setShowConfirmDialog(false);
      setPendingData(null);
      setIsSuccess(true);
    } catch (error) {
      setShowConfirmDialog(false);
      setPendingData(null);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  const handleAddNewSubmit = async () => {
    setIsSuccess(false);
    setPendingData(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6 mt-5 h-full flex-1 relative overflow-y-auto"
    >
      <PaymentTabs
        selectedTab={selectedTab}
        selectedPay={selectedPay}
        control={control}
        errors={errors}
        onTabChange={setSelectedTab}
        onPayChange={setSelectedPay}
      />
      
      <FormInputs control={control} errors={errors} />

      <div className="flex items-center justify-center gap-3 w-full h-[94px] shadow-[0px_-2px_15px_0px_rgba(0,0,0,0.1)] mt-auto">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="text-white w-11/12 "
        >
          <span className="font-primary text-15px mr-[7px]">
            စာရင်းမှတ်တမ်း မှတ်မည်
          </span>
          <FloppyDisk />
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        icon={<QuestionMarkIcon />}
        title="စာရင်းမှတ်ရန် သေချာပါသလား။"
        subtitle="ယခုစာရင်းကို မှတ်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={handleConfirmSubmit}
        onSecondaryClick={handleCancelSubmit}
        showCloseButton
        primaryButtonDisabled={isLoading}
      />

      <ConfirmDialog
        open={isSuccess}
        onOpenChange={setShowConfirmDialog}
        icon={<CheckCircleIcon />}
        title="စာရင်းမှတ်ပြီးပါပြီ။"
        primaryButtonText="အသစ်ထပ်ထည့်မည်"
        secondaryButtonText="ပင်မစာမျက်မှာသို့သွားမည်"
        onPrimaryClick={handleAddNewSubmit}
        secondaryButtonHref={ROUTES.HOME}
        primaryButtonDisabled={isLoading}
      />
    </form>
  );
}
