/** Class names applied to `document.body` for each theme. */
export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

/** `[isDarkMode, toggleThemeMode]`, as returned by `useTheme()`. */
export type ThemeContextValue = [boolean, () => void]
