import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ThemeContextProvider from "../context/ThemeContextProvider"

function Publications() {
  return (
    <ThemeContextProvider>
      <Layout navHeading="praneeth-rdy" path="/publications">
        <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <h3>Publications Page</h3>
      </Layout>
    </ThemeContextProvider>
  )
}

export default Publications
