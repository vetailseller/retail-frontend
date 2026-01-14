import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

if (!API_BASE_URL && typeof window !== 'undefined') {
  console.warn('NEXT_PUBLIC_API_BASE_URL is not set. Please configure it in your .env.local file.');
}

const TOKEN_KEY = 'auth_token';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_KEY);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token
      deleteCookie(TOKEN_KEY);
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Generic API response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

// Generic API error type
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Helper function to handle API errors
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };
  }
  return {
    message: 'An unexpected error occurred',
  };
};

// CRUD Operations Class
class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * POST request
   */
  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return {
        data: response.data,
        status: response.status,
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
      path: '/',
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
