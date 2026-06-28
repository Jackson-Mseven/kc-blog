<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Project: kc-blog

A personal blog by Kincy, deployed to **Vercel**. Content is markdown/MDX-driven with a clean, minimal design.

### Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19.2 (Server Components by default) |
| Styling | Tailwind CSS 4 (utility-first) |
| Language | TypeScript 5 (strict mode) |
| Package manager | pnpm |
| Linting | ESLint 9 + eslint-config-next |
| Deployment | Vercel |

### Directory Structure

```
src/
├── app/           # App Router pages and layouts
│   ├── layout.tsx # Root layout (fonts, metadata, shell)
│   ├── page.tsx   # Home page
│   └── posts/     # Blog posts (dynamic routes)
├── components/    # Shared UI components
├── lib/           # Utility functions, data fetching, types
└── content/       # Markdown/MDX blog content (if used)
```

### Conventions

- **Server Components by default.** Only add `'use client'` when you need interactivity (event handlers, state, effects, browser-only APIs).
- **Async request APIs.** `params`, `searchParams`, `cookies()`, `headers()` are all async in Next.js 16 — always `await` them.
- **Proxy, not middleware.** This version renames `middleware.ts` → `proxy.ts` and `middleware` function → `proxy`. Never create a `middleware.ts` file.
- **`use cache` directive.** For cached data fetching, use `'use cache'` on async functions rather than route-level static config.
- **Paths.** Use the `@/*` alias (maps to `./src/*`). Example: `import { Post } from '@/lib/posts'`.
- **Files:** `kebab-case` for files and directories. **Components:** `PascalCase` for React components.
- **Tailwind CSS 4.** No `tailwind.config.ts` — use CSS-first config in `globals.css` with `@theme` blocks.
- **pnpm.** Always use `pnpm` for package management, never `npm` or `yarn`.

### Key Next.js 16 Reminders

1. Async `params`/`searchParams`/`cookies`/`headers` — synchronous access removed entirely
2. `middleware.ts` renamed to `proxy.ts`
3. `revalidateTag` requires a second argument (cache profile name)
4. `next lint` removed — use `pnpm lint` (ESLint directly)
5. Turbopack is the default bundler
6. `next/image` imports from `next/image` (not `next/legacy/image`)

### When to Ask the User

Before making these kinds of changes, ask first:
- Adding or removing dependencies
- Changing `next.config.ts` or TypeScript config
- Modifying the project structure (new top-level directories)
- Deployment-related configuration
- Changes that affect the content pipeline or data fetching strategy
