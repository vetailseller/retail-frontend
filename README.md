# Retail Frontend

A production-ready Next.js application with Page Router, featuring comprehensive authentication, API integration, and modern UI components.

## Features

### Core Stack
- **Next.js 14.0.4** with Page Router
- **TypeScript** for type safety
- **Tailwind CSS 3.4.14** for styling
- **shadcn/ui** components
- **React Hook Form** for form management
- **Zustand** for state management
- **Axios 1.13.2** for API calls
- **cookies-next 4.1.1** for cookie management

### Key Features
- ✅ Reusable Axios API client for CRUD operations
- ✅ Automatic JWT token management
- ✅ Authorization handling with automatic redirects
- ✅ 401 error handling (invalid/expired tokens)
- ✅ Protected routes with auth middleware
- ✅ Login and registration pages
- ✅ Type-safe API service layer
- ✅ Production-ready error handling

## Security Note ⚠️

**CRITICAL**: This project uses Next.js 14.0.4 as specified in the requirements. This version has **multiple known security vulnerabilities**:

### Known Vulnerabilities in Next.js 14.0.4:
1. ❌ **Denial of Service with Server Components** (CVE-2024-XXXX)
   - Affected: 13.3.0 - 14.2.34
   - Patched in: 14.2.34+
   
2. ❌ **Authorization Bypass in Middleware** (CVE-2024-XXXX)
   - Affected: 14.0.0 - 14.2.25
   - Patched in: 14.2.25+
   
3. ❌ **Server-Side Request Forgery in Server Actions** (CVE-2024-XXXX)
   - Affected: 13.4.0 - 14.1.1
   - Patched in: 14.1.1+
   
4. ❌ **Cache Poisoning** (CVE-2024-XXXX)
   - Affected: 14.0.0 - 14.2.10
   - Patched in: 14.2.10+
   
5. ❌ **Authorization Bypass** (CVE-2024-XXXX)
   - Affected: 9.5.5 - 14.2.15
   - Patched in: 14.2.15+

### Recommended Action for Production

**DO NOT use this version in production.** Upgrade to Next.js **14.2.35 or later** which patches all these vulnerabilities:

```bash
npm install next@14.2.35
```

Or for the latest stable version:
```bash
npm install next@latest
```

### Verification After Upgrade

After upgrading Next.js:
1. Test that the Page Router still works (this project uses Page Router, not App Router)
2. Verify authentication flow still functions correctly
3. Run `npm audit` to check for remaining vulnerabilities
4. Test build: `npm run build`
5. Test production mode: `npm start`

### Why This Project Uses 14.0.4

This version was specified in the project requirements. If you're using this as a template or starting point, **please upgrade immediately** before deploying to production.

To check current vulnerabilities:
```bash
npm audit
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd retail-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your API base URL:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
retail-frontend/
├── components/
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   ├── api/             # API service layer
│   │   ├── client.ts    # Axios client with interceptors
│   │   ├── auth.ts      # Authentication API
│   │   └── products.ts  # Example product API
│   └── store/
│       └── authStore.ts # Zustand auth store
├── pages/
│   ├── _app.tsx         # App wrapper with auth protection
│   ├── _document.tsx    # HTML document
│   ├── index.tsx        # Dashboard/Home page
│   ├── login.tsx        # Login page
│   └── register.tsx     # Registration page
├── styles/
│   └── globals.css      # Global styles with Tailwind
└── utils/
    └── cn.ts            # Class name utility
```

## API Client Usage

### Authentication

The API client automatically handles authentication:

```typescript
import { authService } from '@/lib/api/auth';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password'
});
// Token is automatically stored

// Logout
await authService.logout();
// Token is removed and user is redirected to login
```

### CRUD Operations

Example using the product service:

```typescript
import { productService } from '@/lib/api/products';

// GET all products
const products = await productService.getAll({ 
  page: 1, 
  perPage: 10 
});

// GET single product
const product = await productService.getById('product-id');

// CREATE product
const newProduct = await productService.create({
  name: 'Product Name',
  description: 'Description',
  price: 99.99,
  stock: 100
});

// UPDATE product
const updated = await productService.update('product-id', {
  price: 89.99
});

// DELETE product
await productService.delete('product-id');
```

### Creating New API Services

Follow this pattern to create new API services:

```typescript
// lib/api/your-resource.ts
import { api } from './client';

export interface YourResource {
  id: string;
  // ... other fields
}

export const yourResourceService = {
  async getAll() {
    const response = await api.get<YourResource[]>('/your-resources');
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<YourResource>(`/your-resources/${id}`);
    return response.data;
  },

  async create(data: Partial<YourResource>) {
    const response = await api.post<YourResource>('/your-resources', data);
    return response.data;
  },

  async update(id: string, data: Partial<YourResource>) {
    const response = await api.put<YourResource>(`/your-resources/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/your-resources/${id}`);
  },
};
```

## Authentication & Authorization

### How It Works

1. **Token Storage**: JWT tokens are stored in cookies using `cookies-next`
2. **Request Interceptor**: Automatically adds `Authorization: Bearer {token}` header
3. **Response Interceptor**: Catches 401 errors and redirects to login
4. **Route Protection**: `_app.tsx` checks for token on route changes
5. **Public Routes**: Login and register pages are accessible without authentication

### Protected Routes

By default, all routes except `/login` and `/register` require authentication. To add more public routes:

```typescript
// pages/_app.tsx
const publicRoutes = ['/login', '/register', '/your-public-route']
```

### Manual Auth Check

```typescript
import { useAuthStore } from '@/lib/store/authStore';

const MyComponent = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.name}</div>;
};
```

## Form Management with React Hook Form

Example usage:

```typescript
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
}

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <p>{errors.name.message}</p>}
    </form>
  );
};
```

## State Management with Zustand

The app uses Zustand for global state. Example auth store:

```typescript
import { useAuthStore } from '@/lib/store/authStore';

// In your component
const { user, isAuthenticated, setUser, logout } = useAuthStore();
```

## Styling with Tailwind & shadcn/ui

The project uses Tailwind CSS with shadcn/ui components. All components are fully customizable.

### Adding New shadcn/ui Components

Components are already configured. To add more from shadcn/ui, create them in `components/ui/` following the existing pattern.

## Backend API Requirements

Your backend should implement these endpoints:

### Authentication
- `POST /api/auth/login` - Login (returns token and user)
- `POST /api/auth/register` - Register (returns token and user)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Example Product Endpoints
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

All protected endpoints should expect `Authorization: Bearer {token}` header and return 401 when token is invalid/expired.

## Build & Deploy

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Lint code
```bash
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Your backend API base URL

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT