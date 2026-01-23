import type { RecordItem } from "@/common/types";
import { Record } from "./Record";

export interface RecordsListProps {
  records?: RecordItem[];
}

export function RecordsList({ records }: RecordsListProps) {
  return (
    <div className="w-full border-b last:border-0 flex flex-col">
      {records?.map((record) => {
        return <Record key={record.id} record={record} />;
      })}
    </div>
  );
}
