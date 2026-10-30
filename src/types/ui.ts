import type React from "react"
import type { IGatsbyImageData } from "gatsby-plugin-image"

/** Tooltip placement; rendered as the `tooltip-<position>` class. */
export enum TooltipPosition {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

/** Open Graph `og:type` values used by the Seo component. */
export enum SeoType {
  Website = "website",
  Article = "article",
}

export type WithChildren = { children: React.ReactNode }

export type ImageData = IGatsbyImageData
