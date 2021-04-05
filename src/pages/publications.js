import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Publications() {
  return (
    <Layout navHeading="praneeth-rdy" path="/publications">
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <h3>Publications Page</h3>
    </Layout>
  )
}

export default Publications
