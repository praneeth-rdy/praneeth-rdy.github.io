import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

function Opensource() {
  return (
    <Layout navHeading="praneeth-rdy" path="/publications">
      <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <h3>Opensource Page</h3>
      
    </Layout>
  )
}

export default Opensource;
