# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Wilson's personal portfolio built with Next.js 15, featuring internationalization (i18n), an interactive chatbot, JWT-protected admin routes, and animated UI components.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Build and start production
npm run prod

# Run linter
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 15** with App Router using route groups
- **TypeScript** with strict mode enabled
- **Path alias**: `@/*` maps to project root

### Route Structure
- **`app/(main)/`** - Main public portfolio routes (home, contact)
  - Uses shared layout with Navbar, Footer, ChatBubble, and ParticlesWrapper
  - Includes ChatBotProvider context
- **`app/give-me-the-token/`** - Authentication page for admin access
- **`app/do-not-get-in-here/`** - JWT-protected admin route
- **`app/api/`** - API routes for:
  - `auth-token/` - JWT token generation
  - `chat/` - Chatbot functionality with health check endpoint
  - `logout/` - Session termination

### Internationalization (i18n)
- Uses `next-intl` library for translations
- **Supported locales**: English (`en`), Spanish (`es`)
- **Configuration**: `i18n/config.ts` defines locales and default
- **Message files**: `messages/en.json` and `messages/es.json`
- **Request config**: `i18n/request.ts` loads locale from user settings via `i18n/services.ts`
- Locale is detected and stored using `getUserLocale()` utility
- `NextIntlClientProvider` wraps the entire app in root layout

### Authentication & Middleware
- JWT-based authentication using `jose` library
- **Middleware** (`middleware.ts`) protects `/do-not-get-in-here` route
- Requires `JWT_SECRET` environment variable
- Token stored in `auth-token` cookie
- Invalid/missing tokens redirect to `/give-me-the-token`

### State Management
- **ChatBotProvider** (`context/ChatBotProvider.tsx`): Global context for chatbot state
  - Manages messages, chat open/close state, and chat availability
  - Uses `useChatBot()` hook for consuming context
  - Checks chatbot health via `/api/chat/health` endpoint

### UI Components & Styling
- **Tailwind CSS v4** with PostCSS configuration
- **shadcn/ui** components in `components/ui/` (New York style)
- **Framer Motion** for animations
- **Embla Carousel** for project/experience carousels
- **TipTap** rich text editor components
- **tsparticles** for animated background particles via `ParticlesWrapper`
- **Typed.js** for typewriter effects

### Key Components
- **Navbar.tsx** - Main navigation with language switcher
- **Footer.tsx** - Site footer
- **ChatBubble.tsx** - Interactive chatbot interface
- **About.tsx**, **Skills.tsx**, **Projects.tsx**, **Experience.tsx**, **Education.tsx** - Portfolio section components
- **ProjectCard.tsx**, **ExperienceCard.tsx** - Display cards with animations
- **Reveal.tsx** - Animation wrapper component
- **LanguageSwitcher.tsx** - Locale selection component

### Data Structure
- **Interfaces** in `interfaces/`:
  - `IProject.ts` - Project schema
  - `IExperience.ts` - Work experience schema
  - `IMessage.ts` - Chat message schema
- **Content** in `content/`:
  - `experiences.ts` - Work experience data
  - `techSkills.ts` - Technical skills data

### Utilities
- `utils/cn.ts` - Class name utility (likely `clsx` + `tailwind-merge`)
- `utils/dateFormatter.ts` - Date formatting utilities
- `utils/firstLetterCap.ts` - String capitalization
- `utils/removeHTMLtags.ts` - HTML sanitization

### Environment Variables
Required in `.env`:
- `JWT_SECRET` - Secret key for JWT token signing
- `SECRET_PASS` - Admin password for authentication
- `NEXT_PUBLIC_API_URL` - External API endpoint (Make.com webhook)

### View Transitions
- Experimental view transitions enabled in `next.config.ts`
- Currently commented out in root layout but configured

### Analytics
- Vercel Analytics integrated in root layout

## Important Notes

- The chatbot depends on an external service - check availability via health endpoint before displaying
- All portfolio content is localized - update both `en.json` and `es.json` when adding text
- Protected routes require valid JWT token with `authenticated: true` payload
- Components use barrel exports pattern where applicable
- Particles background is opt-in via `ParticlesWrapper` in layout
