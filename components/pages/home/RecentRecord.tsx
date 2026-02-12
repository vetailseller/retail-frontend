import { ROUTES } from "@/common/constants";
import NoRecordIcon from "@/components/icons/no-record.svg";
import RightArrowIcon from "@/components/icons/right-arrow.svg";
import IfElse from "@/components/IfElse";
import { RecordsList } from "@/components/pages/home";
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
    <div className="rt-w-full rt-flex-1 rt-bg-white rt-py-[14px] rt-px-[19px] rt-rounded-t-20 rt-flex rt-flex-col">
      <div className="rt-flex rt-items rt-justify-between rt-font-secondary">
        <p className="rt-font-bold rt-text-primary rt-text-[1.0625rem] rt-leading-[2.3125rem]">
          နောက်ဆုံးစာရင်းမှတ်တမ်း
        </p>
        <Link
          href={ROUTES.VIEW_RECORDS}
          className="rt-flex rt-items-center rt-font-bold"
        >
          <span>အားလုံးကြည့်ရန်</span>{" "}
          <RightArrowIcon className="rt-w-6 rt-h-6 rt-text-[#686868]" />
        </Link>
      </div>
      <div className="rt-w-full rt-flex rt-items-center rt-justify-center rt-flex-1 rt-mt-[13px]">
        <IfElse
          isTrue={records.length > 0}
          ifBlock={
            <>
              <RecordsList records={records} />
              <div ref={observerRef} />
            </>
          }
          elseBlock={
            <div className="rt-flex rt-flex-col rt-gap-3 rt-items-center rt-justify-center">
              <NoRecordIcon className="rt-text-[#F7F7F7]" />
              <span className="rt-text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
