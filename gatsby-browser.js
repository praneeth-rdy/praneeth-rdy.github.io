import React from "react"
import ThemeContextProvider from "./src/context/ThemeContextProvider"

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>{element}</ThemeContextProvider>
)
