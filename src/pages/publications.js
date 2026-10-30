import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Publications({ location }) {
  return (
    <Layout location={location}>
      <h3>Publications Page</h3>
    </Layout>
  )
}

export default Publications

export const Head = () => (
  <Seo
    title="Publications"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
  />
)
