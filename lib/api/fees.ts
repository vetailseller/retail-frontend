/**
 * Fees API Service
 * Handles all fee-related API calls
 */

import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import {
  Fee,
  CreateFeeInput,
  UpdateFeeInput,
  FilterConfig,
  ApiResponse,
} from "@/common/types";

export const feeService = {
  async getAll(params?: {
    page?: number;
    perPage?: number;
    filters?: FilterConfig;
  }): Promise<ApiResponse<Fee>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.perPage) queryParams.append("perPage", String(params.perPage));

    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${API_ENDPOINTS.FEES.LIST}?${queryParams.toString()}`;
    const response = await api.get<PaginatedResponse<Fee>>(url);
    return response.data;
  },

  async getByAmount(amount: number) {
    const response = await api.get<{
      transferFee: Fee;
    }>(API_ENDPOINTS.FEES.GET(amount));
    return response;
  },

  async create(data: CreateFeeInput): Promise<Fee> {
    const response = await api.post<Fee>(API_ENDPOINTS.FEES.CREATE, data);
    return response.data;
  },

  async update(id: string, data: UpdateFeeInput): Promise<Fee> {
    const response = await api.put<Fee>(API_ENDPOINTS.FEES.UPDATE(id), data);
    return response.data;
  },

  async partialUpdate(id: string, data: Partial<UpdateFeeInput>): Promise<Fee> {
    const response = await api.patch<Fee>(API_ENDPOINTS.FEES.UPDATE(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.FEES.DELETE(id));
  },
};
