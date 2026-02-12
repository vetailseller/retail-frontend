import { AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({ prefix: "rt-" });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function formatCalendarDate(value: Date | string) {
  const date = new Date(value);

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join("-");
}

export function convertCalendarToNumeric(dateStr: string): string {
  const [day, monthStr, year] = dateStr.split("-");

  const months: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sept: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  return `${year}-${months[monthStr]}-${day}`;
}

export function formatNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num) || num === 0) return "0";
  return num.toLocaleString("en-US");
}

export function removeNumberComma(numStr: string) {
  return numStr.replace(/,/g, "");
}

export const downloadBlob = (response: AxiosResponse<Blob>) => {
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const contentDisposition = response.headers["content-disposition"];
  let fileName = "report";

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match?.[1]) {
      fileName = match[1];
    }
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
};
