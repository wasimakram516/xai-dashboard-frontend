# GlassLearn Frontend

Teacher-facing web dashboard for explainable student performance prediction.

## Overview
`GlassLearn` is the frontend for your XAI ML service. It helps teachers:
- view early-risk and final-outcome predictions,
- understand local (student-level) and global (class-level) explanations,
- track student trajectory across stages,
- make intervention decisions with clearer context.

Tech stack:
- `Next.js 16` (App Router)
- `React 19`
- `TypeScript`
- `MUI` + `MUI Icons`
- `Framer Motion`

## Core Features
- Auth-protected educator dashboard.
- Student list with search by name/code.
- Early and final stage prediction views (tabbed).
- Trajectory Insight summary (`Improved`, `Declined Later`, etc.) with suggested action.
- Local explanation cards (top factors, expandable).
- Global insights dialog (class-wide factor charts).
- Student background/profile dialog.
- Unified loading states across list/details/insights.

## Project Structure
- `src/app/` routes (`/`, `/login`, `/register`, `/dashboard`, `/profile`)
- `src/components/student/` student analytics UI components
- `src/components/teacher/` profile/password dialogs
- `src/contexts/` auth and snackbar context
- `src/lib/config.ts` API base URL binding
- `src/styles/theme.ts` global MUI theme

## Prerequisites
- `Node.js 20+`
- Running backend ML service (FastAPI) with required endpoints

## Environment Variables
Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- `NEXT_PUBLIC_API_BASE_URL`: backend API base URL.
- `NEXT_PUBLIC_APP_URL`: used for metadata/OG URL.

## Run Locally
Install and start:

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build and Production
```bash
npm run lint
npm run build
npm run start
```

## Auth Flow
- Unauthenticated users are redirected away from protected routes.
- Successful login stores token, hydrates teacher profile, then redirects to `/dashboard`.
- Logout clears token and returns to `/login`.

## API Expectations
Frontend expects backend endpoints like:
- `POST /auth/login`
- `POST /auth/register`
- `GET /teachers/me`
- `PUT /teachers/me`
- `PUT /teachers/me/password`
- `DELETE /teachers/me`
- `GET /students`
- `GET /students/{student_id}`
- `GET /students/{student_id}/insights?stage=early|final&top_k=...`
- `GET /students/global/early?top_k=...`
- `GET /students/global/final?top_k=...`

## Branding
Current product name: `GlassLearn`.

## Notes
- This frontend is optimized for teacher readability and trust-focused explanations.
- Keep UI terms non-technical where possible (teacher-first language).
