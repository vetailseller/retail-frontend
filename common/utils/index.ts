/**
 * Common Utility Functions
 * Reusable helper functions across the application
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper handling of conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency value
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: string | Date,
  format: string = "MMM DD, YYYY",
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getMonth()];
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return format
    .replace("MMM", month)
    .replace("DD", day)
    .replace("YYYY", String(year))
    .replace("HH", hours)
    .replace("mm", minutes);
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

export function getDefaultDateRange() {
  const now = new Date();

  const fromDate = new Date(now);
  fromDate.setDate(now.getDate() - 3);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    from: formatDate(fromDate),
    to: formatDate(now),
  };
}

export function getDateRangeWithOffset(
  days: number,
  baseDate: Date = new Date(),
) {
  const start = new Date(baseDate);
  const end = new Date(baseDate);

  if (days < 0) {
    start.setDate(start.getDate() + days);
  } else {
    end.setDate(end.getDate() + days);
  }

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    from: formatDate(start),
    to: formatDate(end),
  };
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
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  return `${year}-${months[monthStr]}-${day}`;
}

/**
 * Format date to ISO string for API
 */
export function formatDateForApi(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string to specified length
 */
export function truncate(
  str: string,
  length: number = 50,
  suffix: string = "...",
): string {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get nested object property safely
 */
export function getNestedProperty(obj: any, path: string): any {
  return path.split(".").reduce((current, prop) => current?.[prop], obj);
}

/**
 * Convert object to query string
 */
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num) || num === 0) return "0";
  return num.toLocaleString("en-US");
}

export function removeNumberComma(numStr: string) {
  return numStr.replace(/,/g, "");
}
