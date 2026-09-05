# Frontend Architecture

**Frontend state via two independent Context providers**, not a single store: `state/store.tsx` owns locations/selection/CRUD (backed by `frontend/src/api.ts`), and `state/themeStore.tsx` owns the visual theme independently, persisting to `localStorage` and setting `data-theme` on `<html>` for Tailwind/CSS to key off (see `frontend/src/theme/themes.ts` for the theme catalog). Every store mutation also fires `logInteraction(...)` (`POST /api/logs`), which the backend accepts only for event names matching `FRONTEND_EVENT_PATTERN` in `server.ts` — keep new event names lowercase/snake_case to pass that filter.

**Map card** (`MapCard.tsx`, `MapFitBounds.tsx`, `MapFullscreen.tsx`, `mapMarkers.ts`) uses Leaflet/react-leaflet to plot saved locations; it only visualizes existing locations and intentionally does not let users create pins directly — new locations still go through `AddLocationForm.tsx` → `store.create()`.
