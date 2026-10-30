import React from "react"
import type { GatsbyBrowser } from "gatsby"
import ThemeContextProvider from "./src/context/ThemeContextProvider"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => <ThemeContextProvider>{element}</ThemeContextProvider>
