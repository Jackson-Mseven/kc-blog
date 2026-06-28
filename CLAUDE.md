@AGENTS.md

## KC-Blog Development Guide

This is Kincy's personal blog — a Next.js 16 App Router project deployed on Vercel. Content is markdown-driven with Tailwind CSS 4 styling.

### Quick Reference

```bash
pnpm dev      # Start dev server (http://localhost:3000)
pnpm build    # Production build
pnpm lint     # Run ESLint
```

### Architecture

- **App Router** with file-system routing under `src/app/`
- **Server Components** are the default — data fetching happens directly in async components
- **`'use client'`** only for interactive islands (theme toggle, search, etc.)
- **Tailwind CSS 4** with CSS-first config in `globals.css` — no `tailwind.config.ts`
- **TypeScript strict mode** — all new code must type-check

### Patterns

- Fetch data in Server Components using `'use cache'` for stable content
- Use `generateMetadata()` for per-page SEO
- Dynamic routes: `src/app/posts/[slug]/page.tsx` with `typegen`-generated props
- Server Actions for forms (contact, newsletter signup)
- Static generation where possible; dynamic where needed

### Style

- Utility-first Tailwind — avoid custom CSS unless necessary
- Design: clean, minimal, readable typography
- Dark mode: use `dark:` Tailwind variants (respects system preference)

### Naming

- Directories and route files: `kebab-case`
- React components: `PascalCase`
- Utility functions: `camelCase`
- Types/interfaces: `PascalCase`

### Before Changing

Ask the user before:
- Adding/removing npm dependencies
- Altering `next.config.ts`, `tsconfig.json`, or ESLint config
- Restructuring directories
- Touching deployment/Vercel config
