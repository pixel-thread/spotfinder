import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  resolvedTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme: ThemeType) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useThemeStore();
  const deviceTheme = useDeviceColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();

  // Use a ref to track if we've already updated the theme to prevent infinite loops
  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple updates in the same render cycle
    if (hasUpdatedRef.current) return;

    // Calculate the new resolved theme
    let newResolvedTheme: 'light' | 'dark';

    if (theme === 'system') {
      newResolvedTheme = deviceTheme === 'dark' ? 'dark' : 'light';
    } else {
      newResolvedTheme = theme;
    }

    // Only update if the resolved theme has changed
    if (newResolvedTheme !== resolvedTheme) {
      hasUpdatedRef.current = true;

      // Update the store's resolved theme
      useThemeStore.setState({ resolvedTheme: newResolvedTheme });

      // Also update NativeWind's color scheme
      setColorScheme(newResolvedTheme);

      // Reset the flag after a short delay to allow for future updates
      setTimeout(() => {
        hasUpdatedRef.current = false;
      }, 0);
    }
  }, [theme, deviceTheme, resolvedTheme, setColorScheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
  };
}
