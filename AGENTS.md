# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds Next.js App Router routes, layouts, and pages.
- `src/components/` contains reusable UI components.
- `src/lib/` is for shared utilities and data access helpers.
- `src/types/` stores shared TypeScript types.
- `prisma/` contains the Prisma schema and migrations.
- `public/` stores static assets served at the site root.

## Build, Test, and Development Commands
- `npm install`: install dependencies (requires Node >= 20.9).
- `npm run dev`: start local dev server with hot reload.
- `npm run build`: create the production build.
- `npm start`: run the production server from `.next/`.
- `npm run lint`: run Next.js/ESLint checks.
- `npx prisma migrate dev --name <name>`: apply database migrations in dev.
- `npm run prisma:studio`: open Prisma Studio for local data inspection.

## Coding Style & Naming Conventions
- TypeScript + React + Tailwind. Use 2-space indentation and keep lines concise.
- Components use `PascalCase` (e.g., `ObservatoryCard.tsx`).
- Hooks and helpers use `camelCase` (e.g., `useTelemetry.ts`).
- Keep Tailwind classes grouped by layout → spacing → color → effects.
- Run `npm run lint` before opening a PR.

## Testing Guidelines
- No dedicated test framework is configured yet.
- If you add tests, document the command in `package.json` and align file names
  with the framework defaults (e.g., `*.test.ts` or `*.spec.ts`).

## Commit & Pull Request Guidelines
- Recent commits are short, imperative messages without prefixes. Follow that
  style unless the team adopts a formal convention.
- PRs should include: a brief summary, linked issues (if any), and screenshots
  for UI changes. Note any required env or migration steps.

## Security & Configuration Tips
- Copy `.env.example` to `.env` and fill in secrets before running locally.
- Prisma requires a running PostgreSQL instance for migrations and runtime.
