import { RecordItem } from "@/common/types";

import { formatCalendarDate, formatCurrency } from "@/common/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NoRecordIcon from "@/components/icons/no-record.svg";
import { Record } from "@/components/pages/view-records/Record";
import { transferRecordReport } from "@/lib/api/records";
import IfElse from "@/components/IfElse";
import { RefObject } from "react";
import If from "@/components/If";

export interface RecordsListProps {
  records?: transferRecordReport[];
  observerRef?: RefObject<HTMLDivElement>;
  loading?: boolean;
  hasMore?: boolean;
}

export function RecordsList({
  records,
  observerRef,
  loading,
  hasMore,
}: RecordsListProps) {
  return (
    <div className="px-5 pt-[17px] flex-1">
      <IfElse
        isTrue={records?.length === 0 && !loading}
        ifBlock={
          <div className="flex flex-col gap-3 items-center mt-36 h-full">
            <NoRecordIcon className="text-[#EAEAEA]" />
            <span className="text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
          </div>
        }
        elseBlock={
          <>
            <Accordion
              type="multiple"
              defaultValue={records?.map((_, index) => index.toString())}
              className="space-y-[10px]"
            >
              {records?.map((record, index) => (
                <AccordionItem
                  value={index.toString()}
                  className="border-0 rounded-10  [&_svg]:size-6 [&_svg]:text-primary"
                  key={index}
                >
                  <AccordionTrigger
                    className="hover:no-underline border-0 items-start overflow-hidden bg-primary-lighter rounded-10 data-[state=open]:rounded-b-none"
                    chevronClassName=" absolute top-3 right-4"
                  >
                    <div className="w-full px-[15px]">
                      <span className="font-inter text-14px font-bold text-primary mb-[18px]">
                        {formatCalendarDate(record.date)}
                      </span>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col">
                          <span className="text-muted-light text-13px font-secondary">
                            စုစုပေါင်း ငွေသွင်း/ထုတ်
                          </span>
                          <span className="font-secondary font-bold text-17px">
                            {formatCurrency(record.totalAmount)} Ks
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-muted-light text-13px font-secondary">
                            စုစုပေါင်း လွှဲခ/ အမြတ်
                          </span>
                          <span className="font-secondary font-bold text-17px text-accent z-50">
                            {formatCurrency(record.totalFee)} Ks
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-[70px] -right-[112px] w-36 h-36 bg-primary-light rounded-full"></div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {record.records.map((recordItem, index) => (
                      <Record
                        className="last:rounded-b-10"
                        key={index}
                        record={recordItem}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* Infinite scroll trigger element */}
            <If isTrue={records && records.length > 0}>
              <div ref={observerRef} className="h-1" />
            </If>
            
            {/* Loading indicator for infinite scroll */}
            <If isTrue={loading && records && records.length > 0}>
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </If>
            
            {/* No more data indicator */}
            <If isTrue={!hasMore && !loading && records && records.length > 0}>
              <div className="text-center py-4 text-muted-light text-sm">
                စာရင်းမှတ်တမ်းအားလုံးပြီးပါပြီ
              </div>
            </If>
          </>
        }
      />
    </div>
  );
}
