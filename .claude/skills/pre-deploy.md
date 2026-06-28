---
name: pre-deploy
description: Run pre-deployment checks (lint + build) before deploying to Vercel
tools:
  - Bash
---
# Pre-Deploy Checks

Run pre-deployment validation for kc-blog before pushing to Vercel.

## Instructions

1. **Lint**: Run `pnpm lint` and report any errors or warnings. If there are errors, halt and tell the user to fix them first.

2. **Type check**: Run `pnpm build` (the Next.js build includes type checking). If the build fails, report the errors clearly.

3. **Git status**: Run `git status --short` to check for uncommitted changes. Report what's pending — the user may want to commit before deploying.

4. **Summary**: Report a clear pass/fail for each check. If all pass, let the user know they're clear to deploy.

## Notes

- The build step also validates TypeScript types, image imports, and route configuration — a successful build means the project is deployable.
- This skill does NOT deploy — it only validates readiness.
