import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ title, description = "", keywords = [], children }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)
  const metaDescription = description || site.siteMetadata.description

  return (
    <>
      <html lang="en" />
      <title>{`${title} | ${site.siteMetadata.title}`}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {children}
    </>
  )
}

export default Seo
