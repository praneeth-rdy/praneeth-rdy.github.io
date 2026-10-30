import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SeoType } from "../types/ui"

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css?family=Muli:400,400i,600,700,700i,800&display=swap"

interface SeoProps {
  title: string
  description?: string | null
  keywords?: string[]
  pathname?: string
  type?: SeoType
  children?: React.ReactNode
}

function Seo({
  title,
  description = "",
  keywords = [],
  pathname,
  type = SeoType.Website,
  children,
}: SeoProps) {
  const { site, shareImage } = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
      shareImage: file(relativePath: { eq: "home/dp.jpg" }) {
        publicURL
      }
    }
  `)
  // site, siteMetadata and siteUrl come from siteConfig and shareImage is the
  // committed home/dp.jpg, so none of these are null at build time.
  const siteMetadata = site!.siteMetadata!
  const siteUrl = siteMetadata.siteUrl!
  const metaDescription = description || (siteMetadata.description ?? undefined)
  const canonical = new URL(pathname || "/", siteUrl).href
  const imageUrl = new URL(shareImage!.publicURL!, siteUrl).href

  return (
    <>
      <html lang="en" />
      <title>{`${title} | ${siteMetadata.title}`}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author ?? undefined} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={FONT_STYLESHEET} />
      {children}
    </>
  )
}

export default Seo
