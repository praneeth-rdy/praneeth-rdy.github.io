import React from "react"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
// import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import ThemeContextProvider from "../context/ThemeContextProvider"

const AboutPage = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading

  return (
    <ThemeContextProvider>
      <Layout navHeading={navHeading} path="/about">
        <Seo
          title="About"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div></div>
      </Layout>
    </ThemeContextProvider>
  )
}

const aboutQuery = graphql`
  query {
    site {
      siteMetadata {
        navHeading
      }
    }
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

const AboutPageExport = props => (
  <StaticQuery
    query={aboutQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)

export default AboutPageExport
