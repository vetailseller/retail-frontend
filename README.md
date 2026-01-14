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
- **Axios 1.3.4** for API calls
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

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Security Note

⚠️ **Important**: This project uses Next.js 14.0.4 as specified in the requirements. This version has known security vulnerabilities. For production use, consider upgrading to Next.js 14.2.25 or later after validating compatibility with your requirements.

To check for vulnerabilities:
```bash
npm audit
```

### Installation

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