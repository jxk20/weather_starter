# Environment

Copy `.env.example`/`frontend/.env.local.example` as needed. Key vars: `WEATHER_API_KEY` (optional, raises data.gov.sg rate limits), `DATABASE_PATH` (override SQLite file location), `PORTLESS_PORT`/`PORTLESS_HTTPS` (dev URL). Tests force `NODE_ENV=test` and `LOG_LEVEL=silent` via `vitest.config.ts`, which also disables request logging and frontend serving in `createApp()`.
