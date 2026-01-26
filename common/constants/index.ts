/**
 * Application Constants
 * Central location for all app-wide constants
 */

// API Endpoints
export const API_ENDPOINTS = {
  TOTAL: {
    GET: () => `/transfer-totals`,
  },
  RECORDS: {
    LIST: "/transfer-records",
    REPORTS: "/transfer-records/reports",
    CREATE: "/transfer-records",
  },
  FEES: {
    LIST: "/transfer-fees",
    CREATE: "/transfer-fees/many",
    GET: (amount: number) => `/transfer-fees/amount/${amount}`,
  },
  BRANCHES: {
    LIST: () => `/branches`,
  },
} as const;

// Route Paths
export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  ADD_RECORD: "/transfer-records/add",
  VIEW_RECORDS: "/transfer-records/view",
  ADD_FEE: "/transfer-fees/add",
} as const;

// Form Field Types
export const FIELD_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  RADIO: "radio",
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  MIN_LENGTH: (length: number) => `Minimum ${length} characters required`,
  MAX_LENGTH: (length: number) => `Maximum ${length} characters allowed`,
  PASSWORD_MISMATCH: "Passwords do not match",
  INVALID_FORMAT: "Invalid format",
  POSITIVE_NUMBER: "Must be a positive number",
  INVALID_DATE: "Please enter a valid date",
} as const;

// Toast/Notification Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    RECORD_CREATED: "Record created successfully",
    RECORD_UPDATED: "Record updated successfully",
    RECORD_DELETED: "Record deleted successfully",
    FEE_CREATED: "Fee added successfully",
    FEE_UPDATED: "Fee updated successfully",
    FEE_DELETED: "Fee deleted successfully",
    LOGIN_SUCCESS: "Logged in successfully",
    LOGOUT_SUCCESS: "Logged out successfully",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    VALIDATION: "Please check your input and try again.",
  },
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM DD, YYYY",
  DISPLAY_WITH_TIME: "MMM DD, YYYY HH:mm",
  ISO: "YYYY-MM-DD",
  ISO_WITH_TIME: "YYYY-MM-DDTHH:mm:ss",
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: "Retail Management System",
  SHORT_NAME: "RMS",
  DESCRIPTION: "Comprehensive retail management solution",
  VERSION: "1.0.0",
} as const;
