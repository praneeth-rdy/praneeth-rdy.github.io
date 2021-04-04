import React from 'react'
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

const Temp = ({ data }, location) => {
    const siteTitle = data.site.siteMetadata.title
    return (
        <Layout title={siteTitle}>
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
        title
      }
    }
  }
`

export default props => (
    <StaticQuery
        query={indexQuery}
        render={data => (
            <Temp location={props.location} data={data} {...props} />
        )}
    />
)
