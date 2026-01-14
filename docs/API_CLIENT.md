# API Client Documentation

## Overview

This document provides detailed information about the API client implementation and how to use it effectively in the retail frontend application.

## Architecture

### Core Components

1. **API Client (`lib/api/client.ts`)**: Axios instance with interceptors
2. **Service Layer**: Resource-specific API services (auth, products, etc.)
3. **Auth Store (`lib/store/authStore.ts`)**: Zustand store for authentication state
4. **Token Utils**: Cookie-based token management

## API Client Features

### 1. Automatic Token Injection

The API client automatically adds the JWT token to all requests:

```typescript
// Request Interceptor
apiClient.interceptors.request.use((config) => {
  const token = getCookie(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 2. 401 Error Handling

When the backend returns a 401 (Unauthorized) status:
- Token is automatically removed from cookies
- User is redirected to `/login`
- Auth store is cleared

### 3. Centralized Error Handling

All API errors are normalized to a consistent format.

## Using the API Client

### Basic CRUD Operations

```typescript
import { api } from '@/lib/api/client';

// GET request
const response = await api.get('/endpoint');

// POST request
const response = await api.post('/endpoint', { data });

// PUT request
const response = await api.put('/endpoint/:id', { data });

// PATCH request
const response = await api.patch('/endpoint/:id', { partialData });

// DELETE request
const response = await api.delete('/endpoint/:id');
```

### Creating a New Service

```typescript
// lib/api/orders.ts
import { api } from './client';

export const orderService = {
  async getAll(params?: { status?: string; page?: number }) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/orders', data);
    return response.data;
  },
};
```

## Token Management

```typescript
import { tokenUtils } from '@/lib/api/client';

// Set token after login
tokenUtils.setToken('your-jwt-token');

// Get current token
const token = tokenUtils.getToken();

// Remove token on logout
tokenUtils.removeToken();

// Check if token exists
const hasToken = tokenUtils.hasToken();
```

## Error Handling

```typescript
import { authService } from '@/lib/api/auth';

const handleLogin = async (credentials) => {
  try {
    await authService.login(credentials);
    // Success - token is automatically stored
  } catch (err: any) {
    console.error(err.message);
    // Handle error
  }
};
```

## Authentication Flow

1. User submits login form
2. `authService.login()` is called
3. API request is sent to backend
4. Backend validates and returns token + user data
5. Token is stored in cookies
6. User data is stored in Zustand store
7. User is redirected to dashboard

## Environment Configuration

Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Best Practices

1. **Always Use Services** - Create service functions instead of calling API client directly
2. **Handle Loading States** - Show loading indicators during API calls
3. **Type Everything** - Define TypeScript interfaces for all API responses
4. **Use Async/Await** - Prefer async/await over promise chains
5. **Centralize Error Messages** - Create utilities for user-friendly error messages

See the full documentation for more details and advanced usage.
