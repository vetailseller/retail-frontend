/**
 * Common Type Definitions
 * Shared types across the application
 */

import React from "react";

// Base Entity
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// User Types
export interface User extends BaseEntity {
  name: string;
  email: string;
  role?: string;
}

// Record Types
export interface RecordItem {
  id: string;
  phoneNo: string;
  amount: number;
  fee: number;
  pay: "kbz" | "wave" | "aya" | "uab" | "other";
  type: "pay" | "bank";
  description?: string | null;
  entryPerson: string;
  date: Date;
}

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
}

export interface UpdateRecordInput extends Partial<CreateRecordInput> {
  status?: RecordStatus;
}

// Fee Types
export interface Fee extends BaseEntity {
  name: string;
  amount: number;
  description?: string;
  type: FeeType;
  recordId?: string;
  dueDate?: string;
  isPaid?: boolean;
}

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
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Form Types
export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: Record<string, any>;
  defaultValue?: any;
}

export interface FormConfig {
  fields: FormFieldConfig[];
  onSubmit: (data: any) => void | Promise<void>;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
}

// Table Types
export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
}

// Pagination Types
export interface PaginationConfig {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
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

// Dashboard Stats
export interface DashboardStats {
  totalRecords: number;
  pendingRecords: number;
  completedRecords: number;
  totalFees: number;
  paidFees: number;
  unpaidFees: number;
  revenue: number;
}
