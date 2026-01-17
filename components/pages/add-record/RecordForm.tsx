import React, { MutableRefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormDatePicker } from "@/components/form";
import { recordSchema } from "@/common/validators/schemas";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import CalendarIcon from "@/components/icons/calendar.svg";
import FloppyDisk from "@/components/icons/floppy-disk.svg";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import PhoneIcon from "@/components/icons/phone.svg";
import ThreeLineIcon from "@/components/icons/three-line.svg";
import { ROUTES } from "@/common/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import If from "@/components/If";

export interface RecordFormProps {
  onSubmit: (
    data: CreateRecordInput | UpdateRecordInput,
  ) => void | Promise<void>;
  defaultValues?: CreateRecordInput;
  isLoading?: boolean;
  isEdit?: boolean;
}

const PAY_OPTIONS = [
  {
    value: "kbzpay",
    image: "/images/kbz-pay.png",
  },
  {
    value: "wavepay",
    image: "/images/wave-pay.png",
  },
  {
    value: "ayapay",
    image: "/images/aya-pay.png",
  },
  {
    value: "uabpay",
    image: "/images/uab-pay.png",
  },
];

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
      <div className="w-full px-5">
        <Tabs
          defaultValue={selectedTab}
          className="w-full p-[10px] bg-[#F7F7F7] rounded-8"
          onValueChange={setSelectedTab}
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
                  onClick={() => setSelectedPay(pay.value)}
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
                    isTrue={selectedPay === pay.value}
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
                  className="mt-[15px] bg-white"
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
              className=" bg-white"
              startIcon={
                <ThreeLineIcon className="w-[19px] h-[19px] text-muted" />
              }
              floatingLabel={false}
              error={errors.description?.message}
            />
          </TabsContent>
        </Tabs>
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
