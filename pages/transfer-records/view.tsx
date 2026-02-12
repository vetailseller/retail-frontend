"use client";

import { ROUTES } from "@/common/constants";
import { PayType } from "@/common/types";
import Header from "@/components/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { recordService, transferRecordReport } from "@/lib/api/records";
import { convertCalendarToNumeric, downloadBlob } from "@/common/utils";
import { RecordsList, RecordsFilter } from "@/components/pages/view-records";
import { DownloadDialog } from "@/components/ui/download-dialog";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import { DownloadDialogSchema } from "@/common/validators";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ViewRecords() {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [selectedPay, setSelectedPay] = useState<PayType | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [records, setRecords] = useState<transferRecordReport[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const dialogContainerRef = useRef<HTMLDivElement>(null);

  const {
    control,
    trigger,
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

  useEffect(() => {
    if (fromDate || toDate) {
      trigger(["startDate", "endDate"]);
    }
  }, [fromDate, toDate, trigger]);

  const lastRecordRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !fromDate && !toDate) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fromDate, toDate],
  );

  useEffect(() => {
    setRecords([]);
    setPage(1);
    setHasMore(true);
  }, [selectedPay]);

  const handleDownload = (params: {
    fileType: "pdf" | "excel";
    fromDate: string;
    toDate: string;
  }) => {
    setIsDownloading(true);

    recordService
      .generateReport({
        fileType: params.fileType,
        startDate: convertCalendarToNumeric(params.fromDate),
        endDate: convertCalendarToNumeric(params.toDate),
      })
      .then((response) => {
        downloadBlob(response);
        setIsDownloadDialogOpen(false);
        setIsSuccessDialogOpen(true);
        setIsDownloading(false);
      })
      .catch((error) => {
        setIsDownloading(false);
        toast.error(
          "ဒေါင်းလုပ်ဆွဲမှု မအောင်မြင်ပါ။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။",
        );
      });
  };

  useEffect(() => {
    if (fromDate && toDate) {
      recordService
        .getReports({
          pay: selectedPay || "",
          startDate: convertCalendarToNumeric(fromDate),
          endDate: convertCalendarToNumeric(toDate),
        })
        .then(({ transferRecords }) => {
          setRecords(transferRecords);
        })
        .catch((_) => {
          toast.error("စာရင်းများကို ယူဆောင်ရာတွင် အမှားတစ်ခုဖြစ်ပွားခဲ့သည်။");
        });
    } else {
      const fetchRecords = async () => {
        setLoading(true);
        try {
          const { transferRecords } = await recordService.getReports({
            pay: selectedPay || "",
            page: page,
          });

          setRecords((prev) => {
            return page === 1 ? transferRecords : [...prev, ...transferRecords];
          });

          // End of data check
          if (transferRecords.length < 10) {
            setHasMore(false);
          }
        } catch (error) {
          toast.error("ဒေတာရယူရာတွင် အမှားဖြစ်သွားပါသည်။");
        } finally {
          setLoading(false);
        }
      };

      fetchRecords();
    }
  }, [selectedPay, fromDate, toDate, page]);

  return (
    <div
      className="rt-h-screen rt-font-primary rt-flex rt-flex-col rt-relative"
      ref={dialogContainerRef}
    >
      <Header
        navLink={ROUTES.HOME}
        navLabel="စာရင်းကြည့်မည်"
        enableDownload
        onDownload={() => setIsDownloadDialogOpen(true)}
      />
      <main className="rt-w-full rt-flex-1 rt-flex rt-flex-col rt-bg-background">
        <RecordsFilter
          control={control}
          errors={errors}
          selectedPay={selectedPay}
          setSelectedPay={setSelectedPay}
        />
        <RecordsList
          records={records}
          loading={loading}
          observerRef={lastRecordRef}
        />
      </main>
      <DownloadDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
        container={dialogContainerRef.current}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
      <ConfirmDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
        icon={<CheckCircleIcon />}
        title="ဒေါင်းလုတ်ဆွဲပြီးပါပြီ"
        primaryButtonText="စာရင်းဆက်မှတ်မည်"
        onPrimaryClick={() => setIsSuccessDialogOpen(false)}
        secondaryButtonText="ပင်မစာမျက်နှာသို့သွားမည်"
        secondaryButtonHref={ROUTES.HOME}
      />
    </div>
  );
}
