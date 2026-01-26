import { ROUTES } from "@/common/constants";
import { PayType } from "@/common/types";
import Header from "@/components/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { recordService, transferRecordReport } from "@/lib/api/records";
import { convertCalendarToNumeric, getDefaultDateRange } from "@/common/utils";
import { RecordsList, RecordsFilter } from "@/components/pages/view-records";

export default function ViewRecords() {
  const [selectedPay, setSelectedPay] = useState<PayType | null>(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<transferRecordReport[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [cursorDate, setCursorDate] = useState<string | null>(null);
  const [earliestDate, setEarliestDate] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
    mode: "onChange",
  });

  const fromDate = useWatch({ control, name: "startDate" });
  const toDate = useWatch({ control, name: "endDate" });

  const fetchRecords = useCallback(
    async (isNextPage = false, isReset = false) => {
      if (loading) return;

      // Use current state for next page, but reset values if it's a new filter search
      const currentCursor = isReset ? null : cursorDate;
      const currentEarliest = isReset ? null : earliestDate;

      const endThreshold =
        isNextPage && currentCursor
          ? currentCursor
          : toDate || new Date().toISOString();

      const nextCursor = new Date(
        new Date(endThreshold!).getTime() - 10 * 24 * 60 * 60 * 1000,
      ).toISOString();

      // Guard against fetching past the beginning
      if (
        isNextPage &&
        currentEarliest &&
        new Date(endThreshold!) <= new Date(currentEarliest)
      )
        return;

      const isPastUserStartDate =
        fromDate && new Date(endThreshold!) <= new Date(fromDate);
      if (isNextPage && isPastUserStartDate) return;

      setLoading(true);
      try {
        const response = await recordService.getReports({
          startDate: fromDate || nextCursor,
          endDate: endThreshold!,
          type: selectedPay || undefined,
        });

        setRecords((prev) => {
          const newRecords = response.transferRecords;
          if (isNextPage) {
            // Filter out duplicates by date/ID just in case windows overlap
            const existingDates = new Set(prev.map((r) => r.date.toString()));
            const filteredNext = newRecords.filter(
              (r) => !existingDates.has(r.date.toString()),
            );
            return [...prev, ...filteredNext];
          }
          return newRecords;
        });

        setCursorDate(nextCursor);
        setEarliestDate(response.earliestRecordDate);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    },
    [fromDate, toDate, selectedPay, cursorDate, earliestDate, loading],
  );

  // 2. Pass the reset flag to ensure state is clean before the API call starts
  useEffect(() => {
    setRecords([]);
    setCursorDate(null);
    setEarliestDate(null);
    fetchRecords(false, true); // Added true for isReset
  }, [fromDate, toDate, selectedPay]);

  useEffect(() => {
    if (!observerRef.current || !records.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger if the current cursor hasn't passed the earliest date in the DB
        const hasMoreData =
          !earliestDate || new Date(cursorDate!) > new Date(earliestDate);
        if (entry.isIntersecting && hasMoreData) fetchRecords(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [records, fetchRecords, cursorDate, earliestDate]);

  return (
    <div className="h-screen font-primary flex flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းကြည့်မည်" enableDownload />
      <main className="w-full flex-1 flex flex-col bg-background">
        <RecordsFilter
          control={control}
          errors={errors}
          selectedPay={selectedPay}
          setSelectedPay={setSelectedPay}
        />
        <RecordsList records={records} observerRef={observerRef} />
      </main>
    </div>
  );
}
