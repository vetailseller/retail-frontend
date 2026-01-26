import { ROUTES } from "@/common/constants";
import { PayType } from "@/common/types";
import Header from "@/components/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { recordService, transferRecordReport } from "@/lib/api/records";
import { RecordsList, RecordsFilter } from "@/components/pages/view-records";

/**
 * Helper function to format a date to YYYY-MM-DD
 */
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Helper function to subtract days from a date
 */
function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export default function ViewRecords() {
  const [selectedPay, setSelectedPay] = useState<PayType | null>(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<transferRecordReport[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  
  // Cursor represents the end date of the last fetched batch
  const [cursorEndDate, setCursorEndDate] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Keep track of user's actual filter to prevent going past it
  const userStartDateRef = useRef<string | null>(null);
  const userEndDateRef = useRef<string | null>(null);

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
    async (isNextPage = false) => {
      if (loading) return;
      
      // For infinite scroll, check if we have more data
      if (isNextPage && !hasMore) return;

      setLoading(true);
      try {
        let queryStartDate: string;
        let queryEndDate: string;

        if (isNextPage && cursorEndDate) {
          // For pagination: fetch the next 10 days going backwards
          // End date is 1 day before the current cursor (to avoid duplicates)
          const cursorDate = new Date(cursorEndDate);
          const endDate = subtractDays(cursorDate, 1);
          queryEndDate = formatDateToYYYYMMDD(endDate);
          
          // Start date is 10 days before the end date
          const startDate = subtractDays(endDate, 9); // 9 more days = 10 total
          queryStartDate = formatDateToYYYYMMDD(startDate);
          
          // If user has a startDate filter, don't go past it
          if (userStartDateRef.current && queryStartDate < userStartDateRef.current) {
            queryStartDate = userStartDateRef.current;
            
            // If the adjusted start is after or equal to end, we've reached the limit
            if (queryStartDate >= queryEndDate) {
              setHasMore(false);
              setLoading(false);
              return;
            }
          }
        } else {
          // Initial fetch or filter change
          const today = new Date();
          
          // Determine end date
          if (toDate) {
            queryEndDate = toDate;
          } else {
            // Default to today
            queryEndDate = formatDateToYYYYMMDD(today);
          }
          
          // Determine start date
          if (fromDate && toDate) {
            // Both dates selected: use fromDate as start
            queryStartDate = fromDate;
          } else if (fromDate && !toDate) {
            // Only startDate: fetch 10 days from startDate
            queryStartDate = fromDate;
          } else if (!fromDate && toDate) {
            // Only endDate: fetch 10 days before endDate
            const endDateObj = new Date(toDate);
            const startDateObj = subtractDays(endDateObj, 9);
            queryStartDate = formatDateToYYYYMMDD(startDateObj);
          } else {
            // No dates: default to last 10 days
            const startDateObj = subtractDays(today, 9);
            queryStartDate = formatDateToYYYYMMDD(startDateObj);
          }
        }

        const response = await recordService.getReports({
          startDate: queryStartDate,
          endDate: queryEndDate,
          type: selectedPay || undefined,
        });

        const newRecords = response.transferRecords;

        setRecords((prev) => {
          if (isNextPage) {
            // Append new records for pagination
            return [...prev, ...newRecords];
          }
          // Replace records for initial fetch or filter change
          return newRecords;
        });

        // Update cursor to the start date of this batch (for next fetch)
        setCursorEndDate(queryStartDate);
        
        // Check if we have more data
        // If we got less than expected or hit the user's start date filter, no more data
        if (newRecords.length === 0) {
          setHasMore(false);
        } else if (userStartDateRef.current && queryStartDate <= userStartDateRef.current) {
          setHasMore(false);
        } else if (response.earliestRecordDate && queryStartDate <= response.earliestRecordDate) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, cursorEndDate, selectedPay, fromDate, toDate],
  );

  // Reset and fetch when filters change
  useEffect(() => {
    // Update refs to track user's filter dates
    userStartDateRef.current = fromDate || null;
    userEndDateRef.current = toDate || null;
    
    // Reset state
    setRecords([]);
    setCursorEndDate(null);
    setHasMore(true);
    
    // Fetch initial data
    fetchRecords(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, selectedPay]);

  // Set up infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || !records.length || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchRecords(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [records, hasMore, loading, fetchRecords]);

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
        <RecordsList 
          records={records} 
          observerRef={observerRef}
          loading={loading}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
}
