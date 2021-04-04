import React from "react"
import { graphql, StaticQuery } from "gatsby"
import SEO from "../components/seo"

import Layout from "../components/layout"

const Temp = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading
  return (
    <Layout navHeading={navHeading}>
      <SEO title="Temp" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <div>
        <h1>Hi</h1>
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        navHeading
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <Temp location={props.location} data={data} {...props} />}
  />
)
