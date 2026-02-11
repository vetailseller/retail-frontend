import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/common/utils";
import DownloadIcon from "@/components/icons/download.svg";
import PdfIcon from "@/components/icons/pdf.svg";
import ExcelIcon from "@/components/icons/excel.svg";
import { useForm, useWatch } from "react-hook-form";
import { FormDatePicker } from "../form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadDialogSchema } from "@/common/validators";

export interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (params: {
    fileType: "pdf" | "excel";
    fromDate: string;
    toDate: string;
  }) => void;
  isDownloading: boolean;
  container?: HTMLElement | null;
}

export function DownloadDialog({
  open,
  onOpenChange,
  onDownload,
  isDownloading,
  container,
}: DownloadDialogProps) {
  const [selectedFileType, setSelectedFileType] = React.useState<
    "pdf" | "excel"
  >("pdf");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DownloadDialogSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
    mode: "onChange",
  });

  const fromDate = useWatch({ control, name: "startDate" });
  const toDate = useWatch({ control, name: "endDate" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogPortal container={container}>
        <DialogOverlay />

        <DialogPrimitive.Content
          className="absolute left-0 bottom-0 z-50 flex items-center justify-center w-full rounded-b-none"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <form
            onSubmit={handleSubmit(() =>
              onDownload({
                fileType: selectedFileType,
                fromDate,
                toDate,
              }),
            )}
            className="w-full rounded-b-none rounded-t-20 border bg-white p-5 shadow-lg flex flex-col items-center text-center"
          >
            {/* Close button */}
            <DialogPrimitive.Close className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>

            <DialogHeader className="space-y-3 border-b w-full pb-2">
              <h1 className="text-16px! font-semibold">
                စာရင်းဒေါင်းလုပ်ဆွဲမည်
              </h1>
            </DialogHeader>

            <div className="w-full text-left mt-4">
              <div>
                <p className="mt-3 text-15px font-secondary mb-2">
                  အချိန်ကာလရွေးချယ်ပါ
                </p>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                  <FormDatePicker
                    name="startDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
                    floatingLabel={false}
                    error={errors.startDate?.message}
                    className="text-primary hover:text-primary"
                    btnClassName="hover:text-primary"
                    showError={false}
                  />
                  <span className="px-6 text-muted font-primary">မှ</span>
                  <FormDatePicker
                    name="endDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
                    floatingLabel={false}
                    error={errors.endDate?.message}
                    className="text-primary hover:text-primary"
                    btnClassName="hover:text-primary"
                    showError={false}
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="mt-3 text-15px font-secondary mb-2">
                  ဖိုင်အမျိုးအစားရွေးချယ်ပါ
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className={cn(
                      "px-4 bg-[#F7F7F7] [&_svg]:w-5 [&_svg]:h-5 py-0 hover:bg-transparent",
                      selectedFileType === "pdf" && "border-primary",
                    )}
                    onClick={() => setSelectedFileType("pdf")}
                    type="button"
                  >
                    <PdfIcon />
                    <span className="font-secondary text-15px font-normal mt-[5px] text-gray-900">
                      PDF
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      "px-3 bg-[#F7F7F7] [&_svg]:w-5 [&_svg]:h-5 py-0 hover:bg-transparent",
                      selectedFileType === "excel" && "border-primary",
                    )}
                    onClick={() => setSelectedFileType("excel")}
                    type="button"
                  >
                    <ExcelIcon className="bg-white" />
                    <span className="font-secondary text-15px font-normal mt-[5px] text-gray-900">
                      Excel
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-4 gap-2 text-white"
              disabled={isDownloading}
            >
              {isDownloading ? "ဒေါင်းလုပ်ဆွဲနေပါသည်..." : "ဒေါင်းလုပ်ဆွဲမည်"}
              <DownloadIcon />
            </Button>
          </form>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
