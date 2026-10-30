import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Publications({ location }: PageProps) {
  return (
    <Layout location={location}>
      <h3>Publications Page</h3>
    </Layout>
  )
}

export default Publications

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="Publications"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)
