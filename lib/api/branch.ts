/**
 * Branch API Service
 * Handles all total-related API calls
 */

import { Branch } from "@/common/types";
import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";

export const branchService = {
  async getAll() {
    const data = await api.get<{ branches: Branch[] }>(
      API_ENDPOINTS.BRANCHES.LIST(),
    );
    return data;
  },
};
