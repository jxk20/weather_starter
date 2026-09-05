export interface ThemeDef {
  id: string;
  label: string;
  swatch: [string, string, string];
}

export const THEMES: ThemeDef[] = [
  { id: 'apple', label: 'Apple', swatch: ['#6f8aa8', '#4a627c', '#ffffff'] },
  { id: 'monochrome', label: 'Monochrome', swatch: ['#ffffff', '#0a0a0a', '#ececec'] },
  { id: 'neon', label: 'Neon Nightfall', swatch: ['#00f6ff', '#ff00dc', '#05010a'] },
  { id: 'storm', label: 'Storm Watch', swatch: ['#ff7a1a', '#23272f', '#14171c'] },
];

export const DEFAULT_THEME = 'apple';

export function isThemeId(value: string | null): value is string {
  return !!value && THEMES.some((t) => t.id === value);
}
