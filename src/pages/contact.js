import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

function Contact() {
  return (
    <Layout navHeading="praneeth-rdy" path="/contact">
      <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <h3>Contact Page</h3>
    </Layout>
  )
}

export default Contact
