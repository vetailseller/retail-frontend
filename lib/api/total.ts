/**
 * Total API Service
 * Handles all total-related API calls
 */

import { Total } from "@/common/types";
import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";

export const totalService = {
  async getOne() {
    const data = await api.get<{ transferTotal: Total }>(
      API_ENDPOINTS.TOTAL.GET(),
    );
    return data;
  },
};
