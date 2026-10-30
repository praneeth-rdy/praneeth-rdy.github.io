import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <div></div>
  </Layout>
)

export default AboutPage

export const Head = () => (
  <Seo title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
)
