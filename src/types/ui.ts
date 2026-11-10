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

/** Glyphs drawn by the LineIcon component (1.5px stroke, 24px grid). */
export enum LineIconName {
  Arrow = "arrow",
  Star = "star",
  Code = "code",
  Fork = "fork",
  Camera = "camera",
  Sun = "sun",
  Moon = "moon",
}

/** Contact form fields; values equal the inputs' `name`/`id` attributes. */
export enum ContactField {
  Name = "name",
  Email = "email",
  Mobile = "mobile",
  Subject = "subject",
  Message = "message",
}

export type ContactFormValues = Record<ContactField, string>

/** One message per field that currently fails validation. */
export type ContactFormErrors = Partial<Record<ContactField, string>>
