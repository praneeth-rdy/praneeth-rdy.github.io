import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import ContactForm from "../components/contact/ContactForm"

function Contact({ location }: PageProps) {
  return (
    <Layout location={location}>
      <ContactForm />
    </Layout>
  )
}

export default Contact

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="Contact"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)
