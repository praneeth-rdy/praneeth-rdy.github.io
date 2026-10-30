import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Opensource({ location }: PageProps) {
  return (
    <Layout location={location}>
      <h3>Opensource Page</h3>
    </Layout>
  )
}

export default Opensource

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="Open Source"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)
