import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME, isThemeId } from '../theme/themes';
import type { ProviderProps } from '../types';

const STORAGE_KEY = 'weather-theme';

interface ThemeValue {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

function readInitialTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isThemeId(stored) ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<string>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
