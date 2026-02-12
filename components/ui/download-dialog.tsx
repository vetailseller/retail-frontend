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
          className="tr-absolute tr-left-0 tr-bottom-0 tr-z-50 tr-flex tr-items-center tr-justify-center tr-w-full tr-rounded-b-none"
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
            className="tr-w-full tr-rounded-b-none tr-rounded-t-20 tr-border tr-bg-white tr-p-5 tr-shadow-lg tr-flex tr-flex-col tr-items-center tr-text-center"
          >
            {/* Close button */}
            <DialogPrimitive.Close className="tr-absolute tr-right-4 tr-top-4">
              <X className="tr-h-4 tr-w-4" />
            </DialogPrimitive.Close>

            <DialogHeader className="tr-space-y-3 tr-border-b tr-w-full tr-pb-2">
              <h1 className="tr-text-16px! tr-font-semibold">
                စာရင်းဒေါင်းလုပ်ဆွဲမည်
              </h1>
            </DialogHeader>

            <div className="tr-w-full tr-text-left tr-mt-4">
              <div>
                <p className="tr-mt-3 tr-text-15px tr-font-secondary tr-mb-2">
                  အချိန်ကာလရွေးချယ်ပါ
                </p>
                <div className="tr-grid tr-grid-cols-[1fr_auto_1fr] tr-items-center">
                  <FormDatePicker
                    name="startDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="tr-h-4 tr-w-4 tr-mb-1" />}
                    floatingLabel={false}
                    error={errors.startDate?.message}
                    className="tr-text-primary hover:tr-text-primary"
                    btnClassName="hover:tr-text-primary"
                    showError={false}
                  />
                  <span className="tr-px-6 tr-text-muted tr-font-primary">မှ</span>
                  <FormDatePicker
                    name="endDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="tr-h-4 tr-w-4 tr-mb-1" />}
                    floatingLabel={false}
                    error={errors.endDate?.message}
                    className="tr-text-primary hover:tr-text-primary"
                    btnClassName="hover:tr-text-primary"
                    showError={false}
                  />
                </div>
              </div>
              <div className="tr-mt-6">
                <p className="tr-mt-3 tr-text-15px tr-font-secondary tr-mb-2">
                  ဖိုင်အမျိုးအစားရွေးချယ်ပါ
                </p>
                <div className="tr-flex tr-items-center tr-gap-3">
                  <Button
                    variant="outline"
                    className={cn(
                      "tr-px-4 tr-bg-[#F7F7F7] [&_svg]:tr-w-5 [&_svg]:tr-h-5 tr-py-0 hover:tr-bg-transparent",
                      selectedFileType === "pdf" && "tr-border-primary",
                    )}
                    onClick={() => setSelectedFileType("pdf")}
                    type="button"
                  >
                    <PdfIcon />
                    <span className="tr-font-secondary tr-text-15px tr-font-normal tr-mt-[5px] tr-text-gray-900">
                      PDF
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      "tr-px-3 tr-bg-[#F7F7F7] [&_svg]:tr-w-5 [&_svg]:tr-h-5 tr-py-0 hover:tr-bg-transparent",
                      selectedFileType === "excel" && "tr-border-primary",
                    )}
                    onClick={() => setSelectedFileType("excel")}
                    type="button"
                  >
                    <ExcelIcon className="tr-bg-white" />
                    <span className="tr-font-secondary tr-text-15px tr-font-normal tr-mt-[5px] tr-text-gray-900">
                      Excel
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <Button
              className="tr-w-full tr-mt-4 tr-gap-2 tr-text-white"
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
