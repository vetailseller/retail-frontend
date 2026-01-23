/**
 * Records API Service
 * Handles all record-related API calls
 */

import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import {
  RecordItem,
  CreateRecordInput,
  UpdateRecordInput,
  Pagination,
  CreateRecordApiInput,
} from "@/common/types";

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

  async create(data: CreateRecordApiInput) {
    return api.post<RecordItem>(API_ENDPOINTS.RECORDS.CREATE, data);
  },
};
