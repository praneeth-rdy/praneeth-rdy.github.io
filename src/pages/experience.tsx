import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

function Experience({ location }: PageProps) {
  return (
    <Layout location={location}>
      <h3>Experience Page</h3>
    </Layout>
  )
}

export default Experience

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="Experience"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)
