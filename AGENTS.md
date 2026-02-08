# AGENTS.md

This file provides guidance for agentic coding agents working in this repository.

## Project Overview

Wilson GO's personal portfolio built with Next.js 15, featuring internationalization (i18n), an interactive chatbot, JWT-protected admin routes, and animated UI components.

## Build Commands

All commands run from the `client/` directory.

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Build and start production
npm run prod

# Run linter
npm run lint

# Format code with Biome
npm run format

# Check formatting only
npm run format:check

# Fix linting issues with Biome
npm run lint:fix

# Fix including unsafe fixes
npm run lint:unsafe
```

There are no test commands currently configured.

## Code Style Guidelines

### Formatting

- **Tool**: Biome (configured in `biome.json`)
- **Indentation**: Tabs
- **Quotes**: Double quotes in JavaScript/JSX
- **Line endings**: Unix (LF)

Run `npm run format` before committing to auto-format code.

### TypeScript

- **Strict mode**: Enabled in `tsconfig.json`
- **No explicit `any`**: Biome linter errors on `any` type
- **No unused variables/functions**: Treated as errors
- **Import types**: Disabled (use `import { type ...}`)

### Interfaces & Types

- Use `interface` for object types, `type` for unions/primitives
- Interface names: **PascalCase** with **"I" prefix** (e.g., `IProject`, `IOwner`)
- Example:

```typescript
export interface IProject {
  name: string;
  description: string;
  categories: string[];
  technologies: string[];
  repoUrl?: string;
}
```

### Components

- Client components: Start with `"use client"` directive
- File naming: PascalCase (e.g., `Navbar.tsx`, `ProjectCard.tsx`)
- Default exports for page/component files
- Named exports for utilities and hooks

### Imports Organization

Organize imports in this order:

1. React imports (`useState`, `useEffect`, etc.)
2. Framework/library imports (Next.js, Framer Motion, etc.)
3. Path alias imports (`@/components/...`, `@/utils/...`)
4. Icon libraries (`react-icons/fa`, `lucide-react`, etc.)

```typescript
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/utils/cn";
import { FaHome, FaUser } from "react-icons/fa";
```

### Styling & CSS

- **Tailwind CSS v4**: Primary styling method
- **Class composition**: Use `cn()` utility (clsx + tailwind-merge)
- **Variants**: Use class-variance-authority (CVA) pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva("inline-flex items-center justify-center...", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Naming Conventions

| Pattern     | Convention                | Example                           |
| ----------- | ------------------------- | --------------------------------- |
| Variables   | camelCase                 | `isOpen`, `projectList`           |
| Constants   | UPPER_SNAKE_CASE          | `MAX_RETRY_COUNT`                 |
| Functions   | camelCase                 | `formatDate()`, `getUserLocale()` |
| Components  | PascalCase                | `Navbar`, `ProjectCard`           |
| Hooks       | camelCase + "use" prefix  | `useState`, `useChatBot`          |
| Interfaces  | PascalCase + "I" prefix   | `IProject`, `IMessage`            |
| Files       | PascalCase for components | `Navbar.tsx`, `Dialog.tsx`        |
| Directories | kebab-case                | `components/ui/`, `lib/api/`      |

### Error Handling

- Use early returns for error conditions
- Propagate errors to error boundaries where appropriate
- Use descriptive error messages
- Handle async operations with try/catch in API routes

### Path Aliases

The `@/*` alias maps to the project root (`client/`):

- `@/components/*` → `client/components/*`
- `@/utils/*` → `client/utils/*`
- `@/lib/*` → `client/lib/*`
- `@/interfaces/*` → `client/interfaces/*`

## Architecture

### Route Structure

- **`app/(main)/`** - Public portfolio routes with shared layout (Navbar, Footer, ChatBubble)
- **`app/give-me-the-token/`** - Admin authentication page
- **`app/do-not-get-in-here/`** - JWT-protected admin route
- **`app/api/`** - API routes (auth-token, chat, logout)

### Authentication

- JWT-based using `jose` library
- Middleware in `middleware.ts` protects routes
- Token stored in `auth-token` cookie
- Requires `JWT_SECRET` environment variable

### Internationalization (i18n)

- Library: `next-intl`
- Locales: English (`en`), Spanish (`es`)
- Message files: `messages/en.json`, `messages/es.json`
- Update both files when adding localized content

### State Management

- **React Context**: Global chatbot state via `ChatBotProvider`
- **React Query**: Server state management with `@tanstack/react-query`

### UI Components

- **shadcn/ui** pattern in `components/ui/` (button, dialog, select, etc.)
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **Embla Carousel** for project carousels
- **TipTap** for rich text editing

## Environment Variables

Required in `client/.env`:

```env
# Authentication
JWT_SECRET=your-secret-key
SECRET_PASS=admin-password

# External API
NEXT_PUBLIC_API_URL=https://api.example.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Key Files

| File                          | Purpose                          |
| ----------------------------- | -------------------------------- |
| `middleware.ts`               | JWT protection, locale detection |
| `context/ChatBotProvider.tsx` | Chatbot state management         |
| `utils/cn.ts`                 | Tailwind class composition       |
| `i18n/config.ts`              | Locale configuration             |
| `i18n/request.ts`             | Server-side i18n                 |
| `lib/supabase/client.ts`      | Browser Supabase client          |
| `lib/supabase/server.ts`      | Server Supabase client           |

## Important Notes

- Always run `npm run biome:ci` before committing to catch all issues
- The chatbot depends on an external service - health check at `/api/chat/health`
- All UI components are localized - update both translation files
- Protected routes require valid JWT token with `authenticated: true` payload
- Use barrel exports (`index.ts`) where applicable for cleaner imports
