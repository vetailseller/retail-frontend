// @ts-nocheck
import * as React from "react";
import { DayPicker, getDefaultClassNames, PropsSingle } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date | undefined>(
    props.selected instanceof Date
      ? props.selected
      : Array.isArray(props.selected)
      ? props.selected[0]
      : new Date()
  );

  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={setMonth}
      month={month}
      reverseYears
      className={cn("rt-p-3", className)}
      classNames={{
        selected: `${getDefaultClassNames().selected} bg-[#DCEBFF]`,
        day: `${
          getDefaultClassNames().day
        } hover:bg-primary-light rounded-full`,
        day_button: `${
          getDefaultClassNames().day_button
        } w-9 h-9 p-0 font-medium`,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
