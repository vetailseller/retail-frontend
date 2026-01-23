import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn(
    "NEXT_PUBLIC_API_BASE_URL is not set. Please configure it in your .env.local file.",
  );
}

const TOKEN_KEY = "authToken";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_KEY);

    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      deleteCookie(TOKEN_KEY);

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/ssh"; // TODO: Adjust the login route as needed
      }
    }

    return Promise.reject(error);
  },
);

// Generic API response type
export interface ApiResponse<T = any> {
  message?: string;
  status: number;
  success: boolean;
  data: T;
}

// Generic API error type
export interface ApiError {
  message: string;
  status: number;
  success: boolean;
  details?: {
    [key: string]: string;
  }[];
}

// Helper function to handle API errors
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      details: error.response?.data?.errors,
      success: false,
    };
  }
  return {
    message: "An unexpected error occurred",
    status: 500,
    success: false,
  };
};

// CRUD Operations Class
class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.client.post<ApiResponse<T>>(
        url,
        data,
        config,
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(
        url,
        data,
        config,
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

// Create and export the API service instance
export const api = new ApiService(apiClient);

// Export token management utilities
export const tokenUtils = {
  setToken: (token: string) => {
    setCookie(TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  },

  getToken: () => {
    return getCookie(TOKEN_KEY);
  },

  removeToken: () => {
    deleteCookie(TOKEN_KEY);
  },

  hasToken: () => {
    return !!getCookie(TOKEN_KEY);
  },
};

export default api;
