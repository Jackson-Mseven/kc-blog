---
name: dev
description: Start the Next.js dev server and report when it's ready
tools:
  - Bash
---
# Start Dev Server

Start the kc-blog development server.

## Instructions

1. Run `pnpm dev` in the background: `pnpm dev &`

2. Wait a moment for the server to start, then check it's running with:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
   ```

3. Report the result:
   - If **200**: "Dev server is running at http://localhost:3000"
   - If connection refused: wait a few more seconds and retry
   - If other error: report the issue

## Notes

- The dev server uses Turbopack by default (Next.js 16)
- Hot reload is enabled — changes reflect immediately
- The server stays running in the background; use the terminal to stop it (Ctrl+C) when done
