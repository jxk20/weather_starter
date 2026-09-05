# Commands

```bash
npm install          # install all workspaces (root, backend, frontend)
npm run dev           # start Express + Vite (through Portless) at http://weather-starter.localhost:1355
npm run build         # build frontend (vite build) then compile backend TypeScript
npm run start         # run the compiled production server (node scripts/start.mjs)
npm test              # run backend API tests once (vitest run)
npm run test:watch    # run backend API tests in watch mode
npm run doctor        # curl /health and /api/locations against a running server
npm run reset         # delete backend/weather.db (and -shm/-wal)
npm run db:generate   # generate a Drizzle migration from schema.ts changes
npm run db:migrate    # apply Drizzle migrations to backend/weather.db
```

Run a single backend test file directly with vitest, e.g.:

```bash
npx vitest run backend/src/routes/locations.test.ts
```

There is no frontend test suite or lint/format script wired into `package.json` — `vitest.config.ts` only includes `backend/src/**/*.test.ts`.

Windows note: `scripts/dev.mjs` spawns `portless` with `shell: true` specifically for Windows compatibility — don't remove that when touching dev scripts.
