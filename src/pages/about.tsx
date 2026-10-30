import React from "react"
import type { HeadFC, PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"

const AboutPage = ({ location }: PageProps) => (
  <Layout location={location}>
    <div></div>
  </Layout>
)

export default AboutPage

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="About"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)
