# Themes

Weather Starter ships with a theme selector (top right of the app) that lets users
switch between visual themes without affecting data, the map, the add-location
flow, refresh behavior, or the backend API. Themes are purely presentational.

## How theming works

- Each theme is a block of CSS custom properties defined in
  [frontend/src/index.css](frontend/src/index.css), scoped under a
  `[data-theme='<id>']` selector on `<html>`.
- Components consume the variables via Tailwind arbitrary-value classes
  (e.g. `text-[color:var(--text-1)]`, `bg-[color:var(--surface)]`,
  `rounded-[var(--radius-card)]`, `backdrop-blur-[var(--blur-card)]`) instead of
  hardcoded colors, so no component markup changes when the theme changes.
- The active theme is tracked by `ThemeProvider`/`useTheme`
  ([frontend/src/state/themeStore.tsx](frontend/src/state/themeStore.tsx)), which
  sets `data-theme` on `<html>` and persists the choice to `localStorage`
  (`weather-theme` key) so it survives reloads.
- Theme metadata (id, label, swatch colors for the picker UI) lives in
  [frontend/src/theme/themes.ts](frontend/src/theme/themes.ts).
- Each theme defines the same set of variables: background, 5 text-opacity
  tiers, surface/border/divider colors, card radius/blur/padding, accent
  color, and focus/scrollbar colors — so adding a new theme means adding one
  new `[data-theme='...']` block with all of these keys filled in.

## The themes

### Apple (default)

The original Weather Starter design, preserved exactly as the baseline theme.

- **Description:** Soft, glassy iOS-style weather app look — a blue-grey
  gradient sky with frosted glass cards.
- **Color:** Blue-grey radial/linear gradient background (`#6f8aa8` →
  `#3c5066`); white text at descending opacity tiers; white-tinted glass
  surfaces (~8% opacity).
- **Typography:** System font stack (`-apple-system`, `SF Pro Text`,
  `Segoe UI`), normal letter-spacing.
- **Card styling:** Large `1rem` radius, heavy `20px` backdrop blur, `1rem`
  padding — soft, frosted glass.
- **Layout density:** Comfortable, matches the original shipped design.

### Monochrome

A clean, flat, light theme for a minimal/high-contrast reading experience.

- **Description:** Black-on-white editorial look with no gradients or blur.
- **Color:** Flat light-grey background (`#f4f4f5`); near-black text
  (`#0a0a0a`) at descending opacity; white/near-white flat surfaces.
- **Typography:** Helvetica/Arial/Inter, normal letter-spacing.
- **Card styling:** Smaller `0.5rem` radius, **no blur** (`0px`), most
  generous `1.5rem` card padding and `1.25rem` section gaps of any theme —
  favors whitespace and flatness over depth effects.
- **Layout density:** Most spacious/airy of the four themes.
- **Design considerations:** No transparency or blur is used anywhere, so it
  also reads well when printed or viewed under bright light/low-contrast
  displays. Accent is solid black-on-white (`--accent-bg: #0a0a0a`) for
  maximum contrast on the selected state.

### Neon Nightfall

A dark, cyberpunk-inspired theme with saturated glow accents.

- **Description:** Near-black background with cyan and magenta neon glows,
  cyan-bordered glass cards.
- **Color:** Near-black gradient background (`#05010a` → `#0a0616`) with
  radial cyan (`#00f6ff`) and magenta (`#ff00dc`) glow accents; cool
  cyan-tinted text; purple-black glass surfaces with cyan borders.
- **Typography:** Trebuchet MS / system-ui, slightly tightened letter-spacing
  (`-0.01em`) for a tighter, more "display" feel.
- **Card styling:** `1rem` radius, `16px` blur, glowing box-shadows on
  selected elements (`0 0 20px` cyan + `0 0 40px` magenta) instead of plain
  drop shadows.
- **Layout density:** Similar density to Apple, but leans on color/glow
  rather than card size to create visual hierarchy.
- **Design considerations:** Borders and focus rings use the cyan accent so
  interactive/selected elements read clearly even against the very dark
  background; the accent-on-selected uses solid cyan (`#00f6ff`) with
  near-black text for contrast.

### Storm Watch

A utilitarian, high-alert dark theme with an orange warning accent.

- **Description:** Slate-grey/charcoal dark theme with a sharp, condensed,
  "weather warning" feel and orange highlights.
- **Color:** Dark slate gradient background (`#1c2128` → `#14171c`); white
  text at descending opacity; subtle white-tinted glass surfaces; orange
  (`#ff7a1a`) used for strong borders, the selected-state outline, and
  accents.
- **Typography:** Arial Narrow / Oswald / system-ui — a condensed font
  stack — with tightened letter-spacing (`-0.015em`) for a dense,
  instrumentation-panel feel.
- **Card styling:** Sharpest/smallest radius of all themes (`0.375rem`), no
  blur, tightest padding (`0.875rem`) and section gaps (`0.625rem`) — the
  most information-dense theme.
- **Layout density:** Most compact of the four themes, intentionally, to
  evoke a weather-alert or dashboard/instrumentation aesthetic.
- **Design considerations:** Selected-state shadow is a `1px` solid orange
  outline rather than a soft glow or drop shadow, reinforcing the
  "alert/warning" visual language rather than a decorative one.

## Adding a new theme

1. Add a new `[data-theme='<id>']` block in
   [frontend/src/index.css](frontend/src/index.css) defining all the
   variables listed above.
2. Add a matching entry (`id`, `label`, `swatch`) to `THEMES` in
   [frontend/src/theme/themes.ts](frontend/src/theme/themes.ts).
3. No other files need to change — the selector, provider, and all
   components pick up the new theme automatically via the CSS variables.
