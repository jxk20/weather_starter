# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Weather Starter is a single-process Express + React (Vite) app that shows live Singapore weather for user-saved locations, backed by SQLite via Drizzle.

npm workspaces (root, `backend`, `frontend`) — always run `npm install` from the repo root, not inside a workspace.

## Essential commands

```bash
npm install     # install all workspaces
npm run dev     # start Express + Vite (through Portless) at http://weather-starter.localhost:1355
npm test        # run backend API tests once (vitest run)
npm run build   # build frontend then compile backend TypeScript
```

For less common commands (single-test runs, db:generate/migrate, reset, doctor), see [docs/commands.md](docs/commands.md).

Windows note: `scripts/dev.mjs` spawns `portless` with `shell: true` specifically for Windows compatibility — don't remove that when touching dev scripts.

## More detail

- [docs/commands.md](docs/commands.md) — full command reference, running a single test file
- [docs/architecture-backend.md](docs/architecture-backend.md) — Express app structure, SQLite/Drizzle data model, weather client
- [docs/architecture-frontend.md](docs/architecture-frontend.md) — Context providers, interaction logging, map card
- [docs/environment.md](docs/environment.md) — env vars and test environment behavior
