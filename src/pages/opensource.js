import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Opensource({ location }) {
  return (
    <Layout location={location}>
      <h3>Opensource Page</h3>
    </Layout>
  )
}

export default Opensource

export const Head = () => (
  <Seo
    title="Open Source"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
  />
)
