import React from "react"
import type { GatsbySSR } from "gatsby"
import ThemeContextProvider from "./src/context/ThemeContextProvider"
import { ThemeMode } from "./src/types/theme"

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <ThemeContextProvider>{element}</ThemeContextProvider>
)

// Runs before React hydrates so the stored theme paints on the first frame.
const themeInitScript = `(function () {
  var isDark = false
  try {
    isDark = Boolean(JSON.parse(localStorage.getItem("darkMode")))
  } catch (e) {}
  document.body.className = isDark ? "${ThemeMode.Dark}" : "${ThemeMode.Light}"
})()`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />,
  ])
}
