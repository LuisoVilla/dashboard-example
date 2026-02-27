# Wealthup frontend assignment (Next.js)

Next.js (App Router) implementation of the assignment with a “Wealthup dashboard” style UI, login, cookie-based route protection, and light/dark theme.

## Features

- **3 pages** (App Router):
	- `/login` (client): login + optional avatar (stored in `localStorage`).
	- `/` (server): SSR dashboard using mock data.
	- `/roadmap/[stepId]` (server): step detail page.
- **Simple auth via httpOnly cookie** (`wealthup_name`) + **middleware** protecting `/` and `/roadmap/*`.
	- If there’s no session, it redirects to `/login?next=...` and the login page shows a contextual “danger” toast.
- **Server Components where it matters**: dashboard and roadmap detail render on the server.
- **Component-driven UI**:
	- Gauge (speedometer) as a reusable component.
	- Reusable breakdown items.
	- Generic roadmap step cards with Step 1 customization (slot/children).
- **Mock global state with Redux Toolkit** (e.g. `monthlySaving`) consumed by Step 1.
- **Light/dark theme** persisted in `wealthup:theme` and an early `.dark` set to avoid theme “flash”.
- **Tests** with Vitest + Testing Library (includes edge cases and `@` alias configuration).

## Stack

- Next.js `16.1.6` (App Router)
- React `19`
- TypeScript
- Tailwind CSS `v4`
- Redux Toolkit + React Redux
- Vitest + Testing Library + JSDOM

## Requirements

- Node.js 18+ (recommended 20+)

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` - dev server
- `npm run build` - production build
- `npm run start` - run the production build
- `npm run lint` - ESLint
- `npm run test` - run tests once
- `npm run test:watch` - watch mode

## Implementation notes

- **Session**: created/removed via `POST/DELETE /api/session` (httpOnly `wealthup_name` cookie).
- **Avatar**: stored locally as a data URL (UI-only), not sent to the server.
- **Data**: the dashboard uses mocks.

## Design (Figma)

If you want to compare visual fidelity without relying on Figma at runtime, you can export frames and place them in `design/` as a reference.
