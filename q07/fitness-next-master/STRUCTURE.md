src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── dashboard/
│   │   ├── client/
│   │   │   ├── [programId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── trainer/
│   │   │   ├── clients/
│   │   │   │   └── page.tsx
│   │   │   ├── programs/
│   │   │   │   ├── [programId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── manager/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── protected-route.tsx
│   ├── exercises/
│   │   ├── exercise-form.tsx
│   │   └── exercise-list.tsx
│   ├── programs/
│   │   ├── program-form.tsx
│   │   └── program-list.tsx
│   └── ui/
│       └── common UI components
├── lib/
│   ├── api/
│   │   └── fitness-api.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── index.ts
└── middleware.ts