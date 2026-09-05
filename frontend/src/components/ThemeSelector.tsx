import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../state/themeStore';
import { THEMES } from '../theme/themes';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-medium text-[color:var(--text-2)] backdrop-blur-[var(--blur-card)] hover:bg-[color:var(--surface-strong)]"
      >
        <span className="flex h-3.5 w-3.5 overflow-hidden rounded-full border border-[color:var(--border-soft)]">
          {current.swatch.map((color, i) => (
            <span key={i} className="h-full w-full" style={{ backgroundColor: color }} />
          ))}
        </span>
        <span>{current.label}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="mt-2 w-44 overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface)] p-1 text-sm backdrop-blur-[var(--blur-card)]"
        >
          {THEMES.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                role="option"
                aria-selected={t.id === theme}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-[calc(var(--radius-card)-0.25rem)] px-2 py-1.5 text-left text-[color:var(--text-2)] hover:bg-[color:var(--surface-strong)] ${
                  t.id === theme ? 'bg-[color:var(--surface-strong)]' : ''
                }`}
              >
                <span className="flex h-3.5 w-3.5 overflow-hidden rounded-full border border-[color:var(--border-soft)]">
                  {t.swatch.map((color, i) => (
                    <span key={i} className="h-full w-full" style={{ backgroundColor: color }} />
                  ))}
                </span>
                <span>{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
