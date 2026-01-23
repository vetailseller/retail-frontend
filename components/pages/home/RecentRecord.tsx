import { ROUTES } from "@/common/constants";
import NoRecordIcon from "@/components/icons/no-record.svg";
import RightArrowIcon from "@/components/icons/right-arrow.svg";
import IfElse from "@/components/IfElse";
import { RecordsList } from "@/components/pages/view-records/RecordsList";
import { recordService } from "@/lib/api/records";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { RecordItem } from "@/common/types";

export function RecentRecord() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchRecords = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await recordService.getRecents({
        page,
        limit: 10,
      });

      setRecords((prev) => [...prev, ...data.transferRecords]);

      const { totalCount, limit } = data.pagination;
      const loaded = page * limit;

      if (loaded >= totalCount) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchRecords();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchRecords]);

  return (
    <div className="w-full flex-1 bg-white py-[14px] px-[19px] rounded-t-20 flex flex-col">
      <div className="flex items justify-between font-secondary">
        <p className="font-bold text-primary text-17px">
          နောက်ဆုံးစာရင်းမှတ်တမ်း
        </p>
        <Link
          href={ROUTES.VIEW_RECORDS}
          className="flex items-center font-bold"
        >
          <span>အားလုံးကြည့်ရန်</span>{" "}
          <RightArrowIcon className="w-6 h-6 text-[#686868]" />
        </Link>
      </div>
      <div className="w-full flex items-center justify-center flex-1 mt-[13px]">
        <IfElse
          isTrue={records.length > 0}
          ifBlock={
            <>
              <RecordsList records={records} />
              <div ref={observerRef} />
            </>
          }
          elseBlock={
            <div className="flex flex-col items-center justify-center">
              <NoRecordIcon className="text-[#F7F7F7]" />
              <span className="text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
