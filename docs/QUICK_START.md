# Quick Start Guide

This guide will help you get started with the retail frontend application's new folder structure.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Backend API (optional for development)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update API URL in .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

## 📱 Application Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Home Dashboard | Stats cards, recent activity, quick actions |
| `/records/add` | Add Record | Form to create new records |
| `/records/view` | View Records | Table with filters, pagination, CRUD actions |
| `/fees/add` | Add Fee | Form to add fees with calculator |
| `/login` | Login | User authentication |
| `/register` | Register | User registration |

## 🏗️ Project Structure Overview

```
retail-frontend/
├── common/              # Shared code
│   ├── constants/      # App constants
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── validators/     # Form validators
├── components/
│   ├── forms/          # Reusable form components
│   ├── pages/          # Page-specific components
│   └── ui/             # shadcn/ui components
├── lib/
│   ├── api/            # API services
│   └── store/          # State management
└── pages/              # Next.js routes
```

## 💡 Quick Examples

### Creating a Form

```typescript
import { FormWrapper, FormField } from '@/components/forms';
import { nameValidation, emailValidation } from '@/common/validators';

function MyForm() {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit} submitLabel="Save">
      {({ register, formState: { errors } }) => (
        <>
          <FormField
            label="Name"
            required
            error={errors.name?.message}
            registration={register('name', nameValidation)}
          />
          <FormField
            label="Email"
            type="email"
            required
            error={errors.email?.message}
            registration={register('email', emailValidation)}
          />
        </>
      )}
    </FormWrapper>
  );
}
```

### Making API Calls

```typescript
import { recordService } from '@/lib/api/records';

// Get all records
const records = await recordService.getAll({
  page: 1,
  perPage: 10,
  filters: { status: 'pending' }
});

// Create a record
const newRecord = await recordService.create({
  title: 'New Record',
  date: '2024-01-01',
  amount: 100
});

// Update a record
await recordService.update('record-id', {
  status: 'completed'
});

// Delete a record
await recordService.delete('record-id');
```

### Using Constants

```typescript
import { ROUTES, API_ENDPOINTS, TOAST_MESSAGES } from '@/common/constants';

// Navigation
router.push(ROUTES.ADD_RECORD);

// API endpoint
const url = API_ENDPOINTS.RECORDS.LIST;

// Display message
alert(TOAST_MESSAGES.SUCCESS.RECORD_CREATED);
```

### Using Utilities

```typescript
import { formatCurrency, formatDate, cn } from '@/common/utils';

// Format money
const price = formatCurrency(99.99); // "$99.99"

// Format date
const date = formatDate('2024-01-01'); // "Jan 01, 2024"

// Conditional classes
const className = cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
);
```

## 🎨 Component Examples

### Stats Card

```typescript
import { StatsCard } from '@/components/pages/home';

<StatsCard
  title="Total Sales"
  value="$12,345"
  description="This month"
  trend={{ value: 12, isPositive: true }}
/>
```

### Records Table

```typescript
import { RecordsTable } from '@/components/pages/view-records';

<RecordsTable
  records={records}
  isLoading={loading}
  onEdit={(record) => console.log('Edit:', record)}
  onDelete={(record) => console.log('Delete:', record)}
  onView={(record) => console.log('View:', record)}
/>
```

### Pagination

```typescript
import { Pagination } from '@/components/pages/view-records';

<Pagination
  currentPage={page}
  totalPages={totalPages}
  perPage={perPage}
  total={total}
  onPageChange={setPage}
  onPerPageChange={setPerPage}
/>
```

## 🔧 Development Tips

### Adding a New Page

1. Create file in `pages/` directory
2. Create components in `components/pages/[feature]/`
3. Add route to `common/constants/index.ts`
4. Create API service in `lib/api/` if needed
5. Add types to `common/types/index.ts`

### Adding Form Validation

```typescript
// In common/validators/index.ts
export const myFieldValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  minLength: {
    value: 3,
    message: VALIDATION_MESSAGES.MIN_LENGTH(3),
  },
};
```

### Creating API Service

```typescript
// In lib/api/my-service.ts
import { api } from './client';
import { API_ENDPOINTS } from '@/common/constants';

export const myService = {
  async getAll() {
    const response = await api.get(API_ENDPOINTS.MY_RESOURCE.LIST);
    return response.data;
  },
  
  async create(data) {
    const response = await api.post(API_ENDPOINTS.MY_RESOURCE.CREATE, data);
    return response.data;
  },
};
```

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
```

## 🎯 Best Practices

1. **Always use absolute imports**: `@/components/...` instead of `../../components/...`
2. **Keep components small**: Break down complex components into smaller ones
3. **Reuse form components**: Use existing form components instead of creating new ones
4. **Centralize constants**: Never hardcode values that might change
5. **Type everything**: Define TypeScript types for all data structures
6. **Handle errors**: Always use try-catch and display user-friendly messages
7. **Validate inputs**: Use validation schemas from `common/validators`

## 🔐 Environment Variables

Required environment variables in `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 📖 Documentation

- [Complete Folder Structure](./FOLDER_STRUCTURE.md) - Detailed structure documentation
- [API Client Guide](./API_CLIENT.md) - API client usage and examples
- [README](../README.md) - Main project documentation

## 🆘 Common Issues

### Build Errors

```bash
# Clear build cache
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript errors
npx tsc --noEmit
```

### Import Errors

Make sure you're using the correct import paths:
- Use `@/` for absolute imports
- Use `@/common/` for common utilities
- Use `@/components/` for components
- Use `@/lib/` for lib files

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

For more detailed information, see [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
