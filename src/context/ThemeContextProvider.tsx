import React, { useState, useEffect, useContext } from "react"
import { ThemeMode, type ThemeContextValue } from "../types/theme"
import type { WithChildren } from "../types/ui"

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeContextProvider")
  }
  return context
}

const ThemeContextProvider = ({ children }: WithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let storedDarkMode: unknown = null
    try {
      // A missing key yields null; parsing the literal "null" matches the old JSON.parse(null) result.
      storedDarkMode = JSON.parse(localStorage.getItem("darkMode") ?? "null")
    } catch (e) {
      storedDarkMode = null
    }
    if (storedDarkMode) {
      setIsDarkMode(true)
    }
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    document.body.className = isDarkMode ? ThemeMode.Dark : ThemeMode.Light
  }, [isDarkMode, isReady])

  const toggleThemeMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(!isDarkMode))
    }
    setIsDarkMode(current => !current)
  }

  return (
    <ThemeContext.Provider value={[isDarkMode, toggleThemeMode]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
