/**
 * Common Type Definitions
 * Shared types across the application
 */

import { string } from "zod";

// Base Entity
export interface BaseEntity {
  id: string;
  createdAt?: string;
}

export interface Total {
  total: number;
  fee: number;
}

export interface Branch {
  Id: string;
  Name: string;
}

// Record Types
export type RecordType = "pay" | "bank";
export type PayType = "kbz" | "wave" | "aya" | "uab" | "other";

export interface RecordItem {
  id: string | number;
  phoneNo: string;
  amount: number;
  fee: number;
  pay: PayType;
  type: RecordType;
  description?: string | null;
  entryPerson: string;
  date: Date;
}

export type RecordReportQuery = {
  startDate: string;
  endDate: string;
};

export enum RecordStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CreateRecordInput {
  phoneNo: string;
  date: string;
  amount: string;
  fee: string;
  description?: string;
  branchId?: string;
}

export interface CreateRecordApiInput extends Omit<
  CreateRecordInput,
  "amount" | "fee" | "branchId"
> {
  amount: number;
  fee: number;
  branchId?: number;
  pay: PayType;
  type: RecordType;
}
export interface UpdateRecordInput extends Partial<CreateRecordInput> {
  status?: RecordStatus;
}

// Fee Types
export type Fee = {
  from: string;
  to: string;
  fee: string;
} & Partial<BaseEntity>;

export type CreateFeeApiInput = {
  from: number;
  to: number;
  fee: number;
};

export enum FeeType {
  SERVICE = "service",
  LATE = "late",
  PROCESSING = "processing",
  OTHER = "other",
}

export interface CreateFeeInput {
  name: string;
  amount: number;
  description?: string;
  type: FeeType;
  recordId?: string;
  dueDate?: string;
}

export interface UpdateFeeInput extends Partial<CreateFeeInput> {
  isPaid?: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  status: number;
}

export interface Pagination {
  totalCount: number;
  foundCount: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status: number;
  success: boolean;
  details?: {
    [key: string]: string;
  }[];
}

// Filter Types
export interface FilterConfig {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}
