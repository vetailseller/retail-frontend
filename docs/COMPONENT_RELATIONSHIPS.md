# Component Relationships

This document illustrates how different components and services interact within the application.

## 🔄 Data Flow

```
┌─────────────────┐
│     Pages       │  User navigates to route
│  (Routes/UI)    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────────┐
│  Page-Specific  │  │  Shared/Reusable │
│   Components    │  │    Components    │
│  (UI Logic)     │  │   (UI Widgets)   │
└────────┬────────┘  └────────┬─────────┘
         │                    │
         └──────────┬─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │   Form Components │
         │   (Input/Select)  │
         └──────────┬─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │   API Services    │  Makes HTTP requests
         │  (CRUD ops)       │
         └──────────┬─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │   API Client      │  Axios with interceptors
         │ (Authentication)  │
         └──────────┬─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │   Backend API     │
         └──────────────────┘
```

## 📦 Module Dependencies

### Pages Layer
```
pages/index.tsx
├── components/pages/home/StatsCard
├── components/pages/home/QuickActions
├── components/pages/home/RecentActivity
├── lib/api/records (recordService)
├── lib/store/authStore
└── common/constants (ROUTES, APP_CONFIG)

pages/records/add.tsx
├── components/pages/add-record/RecordForm
│   ├── components/forms/FormWrapper
│   ├── components/forms/FormField
│   ├── components/forms/FormTextarea
│   ├── components/forms/FormSelect
│   └── common/validators (recordFormValidation)
├── lib/api/records (recordService)
└── common/constants (ROUTES, TOAST_MESSAGES)

pages/records/view.tsx
├── components/pages/view-records/RecordsTable
├── components/pages/view-records/RecordsFilter
├── components/pages/view-records/Pagination
├── lib/api/records (recordService)
└── common/constants (ROUTES, PAGINATION)

pages/fees/add.tsx
├── components/pages/add-fee/FeeForm
│   └── (same form components as RecordForm)
├── components/pages/add-fee/FeeCalculator
├── lib/api/fees (feeService)
└── common/constants (ROUTES, TOAST_MESSAGES)
```

### Component Dependencies
```
components/forms/
├── FormWrapper.tsx
│   ├── react-hook-form (useForm)
│   ├── components/ui/button
│   └── common/utils (cn)
├── FormField.tsx
│   ├── react-hook-form (UseFormRegisterReturn)
│   ├── components/ui/label
│   ├── components/ui/input
│   └── common/utils (cn)
├── FormTextarea.tsx
│   ├── react-hook-form (UseFormRegisterReturn)
│   ├── components/ui/label
│   └── common/utils (cn)
└── FormSelect.tsx
    ├── react-hook-form (UseFormRegisterReturn)
    ├── components/ui/label
    └── common/utils (cn)
```

### API Service Layer
```
lib/api/
├── client.ts (Axios instance with interceptors)
│   ├── axios
│   └── cookies-next
├── records.ts
│   ├── client.ts (api)
│   ├── common/constants (API_ENDPOINTS)
│   └── common/types (RecordItem, CreateRecordInput, etc.)
├── fees.ts
│   ├── client.ts (api)
│   ├── common/constants (API_ENDPOINTS)
│   └── common/types (Fee, CreateFeeInput, etc.)
└── auth.ts
    ├── client.ts (api, tokenUtils)
    └── common/types (User)
```

## 🏗️ Folder Structure Visualization

```
retail-frontend/
│
├── common/                         [Shared Code Layer]
│   ├── constants/                  └─► Used by all layers
│   ├── types/                      └─► Type definitions
│   ├── utils/                      └─► Helper functions
│   └── validators/                 └─► Form validation
│
├── components/
│   ├── forms/                      [Reusable Forms Layer]
│   │   ├── FormWrapper.tsx         └─► Base form component
│   │   ├── FormField.tsx           └─► Input fields
│   │   ├── FormTextarea.tsx        └─► Text areas
│   │   └── FormSelect.tsx          └─► Select dropdowns
│   │
│   ├── pages/                      [Feature Components Layer]
│   │   ├── home/                   └─► Home page widgets
│   │   ├── add-record/             └─► Record creation UI
│   │   ├── view-records/           └─► Records management UI
│   │   └── add-fee/                └─► Fee management UI
│   │
│   └── ui/                         [Primitive UI Layer]
│       ├── button.tsx              └─► shadcn/ui components
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── layout.tsx
│
├── lib/
│   ├── api/                        [API Layer]
│   │   ├── client.ts               └─► HTTP client
│   │   ├── auth.ts                 └─► Auth service
│   │   ├── records.ts              └─► Records service
│   │   └── fees.ts                 └─► Fees service
│   │
│   ├── store/                      [State Layer]
│   │   └── authStore.ts            └─► Auth state (Zustand)
│   │
│   └── utils.ts                    └─► Lib utilities
│
└── pages/                          [Routes Layer]
    ├── _app.tsx                    └─► App wrapper
    ├── index.tsx                   └─► Home (/)
    ├── login.tsx                   └─► Login (/login)
    ├── register.tsx                └─► Register (/register)
    ├── records/
    │   ├── add.tsx                 └─► Add record (/records/add)
    │   └── view.tsx                └─► View records (/records/view)
    └── fees/
        └── add.tsx                 └─► Add fee (/fees/add)
```

## 🔗 Component Communication Patterns

### 1. Parent → Child (Props)
```typescript
// Parent passes data to child
<RecordsTable 
  records={records}          // Data
  onEdit={handleEdit}        // Callback
  isLoading={loading}        // State
/>
```

### 2. Child → Parent (Callbacks)
```typescript
// Child calls parent's function
function RecordsTable({ onEdit }) {
  return (
    <Button onClick={() => onEdit(record)}>
      Edit
    </Button>
  );
}
```

### 3. Component → API Service
```typescript
// Component calls API service
async function fetchData() {
  const records = await recordService.getAll();
  setRecords(records.data);
}
```

### 4. Component → Store (State Management)
```typescript
// Component uses Zustand store
const { user, logout } = useAuthStore();
```

## 🎯 Reusability Hierarchy

```
High Reusability
    ↑
    │   common/utils/            (Utility functions)
    │   common/constants/        (App constants)
    │   common/types/            (Type definitions)
    │
    │   components/ui/           (Primitive UI components)
    │   components/forms/        (Form components)
    │   lib/api/client.ts        (HTTP client)
    │
    │   components/pages/*/      (Feature components)
    │   lib/api/*Service.ts      (API services)
    │
    │   pages/                   (Route components)
    ↓
Low Reusability
```

## 🔄 Request/Response Flow

### Example: Creating a Record

```
User Action
    │
    ├─► [1] pages/records/add.tsx
    │        └─► User fills form
    │
    ├─► [2] components/pages/add-record/RecordForm
    │        └─► Form validation (common/validators)
    │
    ├─► [3] Page's handleSubmit()
    │        └─► Processes form data
    │
    ├─► [4] lib/api/records.ts (recordService.create)
    │        └─► Prepares API request
    │
    ├─► [5] lib/api/client.ts (api.post)
    │        ├─► Adds auth token
    │        └─► Makes HTTP request
    │
    ├─► [6] Backend API
    │        └─► Processes request
    │
    ├─► [7] Response (success/error)
    │        └─► Returns to client.ts
    │
    ├─► [8] recordService.create()
    │        └─► Returns typed response
    │
    ├─► [9] handleSubmit()
    │        ├─► Updates UI state
    │        └─► Shows success message
    │
    └─► [10] Router navigates to /records/view
```

## 🎨 Styling Hierarchy

```
Global Styles
    │
    ├─► styles/globals.css          (Base Tailwind styles)
    │
    ├─► tailwind.config.js          (Theme configuration)
    │
    ├─► components/ui/*             (Component variants)
    │    └─► class-variance-authority (cva)
    │
    └─► Component-level classes     (Tailwind utilities)
         └─► common/utils/cn()      (Class merging)
```

## 💾 State Management

```
┌──────────────────────────────────────┐
│         Application State            │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │   Global State (Zustand)       │ │
│  │   - Authentication             │ │
│  │   - User data                  │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │   Local State (useState)       │ │
│  │   - Form inputs                │ │
│  │   - UI state                   │ │
│  │   - Loading states             │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │   URL State (Router)           │ │
│  │   - Current page               │ │
│  │   - Query parameters           │ │
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
Login Page
    │
    ├─► User submits credentials
    │
    ├─► authService.login(email, password)
    │    └─► API: POST /api/auth/login
    │
    ├─► Receive JWT token
    │
    ├─► tokenUtils.setToken(token)
    │    └─► Store in cookies
    │
    ├─► authStore.setUser(userData)
    │    └─► Update global state
    │
    └─► Router.push('/')
         └─► Navigate to home
```

---

This visualization helps understand how different parts of the application work together.
