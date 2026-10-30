import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Experience({ location }) {
  return (
    <Layout location={location}>
      <h3>Experience Page</h3>
    </Layout>
  )
}

export default Experience

export const Head = () => (
  <Seo
    title="Experience"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
  />
)
