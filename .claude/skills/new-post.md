---
name: new-post
description: Create a new blog post with proper page structure and metadata
tools:
  - Read
  - Write
  - Bash
---
# New Blog Post

Create a new blog post for kc-blog. The user will provide a title (and optionally a slug and description).

## Instructions

1. **Determine the slug**: Ask the user for a title if not provided. Derive the slug from the title (lowercase, hyphenated, no special chars). Confirm with the user.

2. **Check for conflicts**: List `src/app/posts/` to make sure the slug isn't already taken.

3. **Create the post directory**: `src/app/posts/[slug]/`

4. **Create `page.tsx`** with:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Title",
  description: "A brief description",
};

export default async function PostPage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <header className="mb-8">
        <time className="text-sm text-zinc-500" dateTime="YYYY-MM-DD">
          Month DD, YYYY
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Post Title</h1>
      </header>
      {/* Post content goes here */}
    </article>
  );
}
```

5. **Use today's date** for the post date.

6. **Keep it minimal** — the user can customize styling and content after scaffolding.

## After Creating

- Run `pnpm lint` to verify the file is clean.
- Tell the user the post is ready at `src/app/posts/[slug]/page.tsx`.
- Remind them they can add MDX, Tailwind Typography prose classes, or any custom components.
