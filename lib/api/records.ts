/**
 * Records API Service
 * Handles all record-related API calls
 */

import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import { RecordItem, Pagination, CreateRecordApiInput } from "@/common/types";

export type transferRecordReport = {
  date: string;
  totalAmount: number;
  totalFee: number;
  records: RecordItem[];
};

export const recordService = {
  async getRecents(params: { page: number; limit: number }) {
    const queryParams = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
    });
    const url = `${API_ENDPOINTS.RECORDS.LIST}?${queryParams.toString()}`;

    return api.get<{
      transferRecords: RecordItem[];
      pagination: Pagination;
    }>(url);
  },

  async getReports(params: {
    startDate: string;
    endDate: string;
    type?: string;
  }) {
    const queryParams = new URLSearchParams({
      startDate: params.startDate,
      endDate: params.endDate,
      type: params.type || "",
    });
    const url = `${API_ENDPOINTS.RECORDS.REPORTS}?${queryParams.toString()}`;

    return api.get<{
      transferRecords: transferRecordReport[];
      earliestRecordDate: string;
    }>(url);
  },

  async create(data: CreateRecordApiInput) {
    return api.post<RecordItem>(API_ENDPOINTS.RECORDS.CREATE, data);
  },
};
