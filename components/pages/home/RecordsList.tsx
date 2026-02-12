import type { RecordItem } from "@/common/types";
import { Record } from "../view-records";

export interface RecordsListProps {
  records?: RecordItem[];
}

export function RecordsList({ records }: RecordsListProps) {
  return (
    <div className="rt-w-full rt-border-b rt-last:border-0 rt-flex rt-flex-col">
      {records?.map((record) => {
        return <Record key={record.id} record={record} />;
      })}
    </div>
  );
}
