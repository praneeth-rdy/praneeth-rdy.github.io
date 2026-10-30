import React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"

const NotFoundPage = ({ location }: PageProps) => (
  <Layout location={location}>
    <header className="page-head error-head">
      <h1 className="page-head-title">404</h1>
      <p>Page not found</p>
      <Link to="/" className="error-link">
        Back to home
      </Link>
    </header>
  </Layout>
)

export default NotFoundPage

export const Head: HeadFC = ({ location }) => (
  <Seo title="404: Not Found" pathname={location.pathname} />
)
