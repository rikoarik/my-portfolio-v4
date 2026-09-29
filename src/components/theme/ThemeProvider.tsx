'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('ark-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('ark-theme-change', callback);
  };
}

function getSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('ark_theme') as Theme) || 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ark_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new Event('ark-theme-change'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function AppearanceSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="appearance-switch"
      data-theme={theme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="appearance-switch__icon appearance-switch__icon--sun">
        <Sun className="w-3 h-3" />
      </span>
      <span className="appearance-switch__icon appearance-switch__icon--moon">
        <Moon className="w-3 h-3" />
      </span>
      <span className="appearance-switch__thumb" />
    </button>
  );
}
