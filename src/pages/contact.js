import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import ContactForm from "../components/contact/ContactForm"

function Contact({ location }) {
  return (
    <Layout location={location}>
      <ContactForm />
    </Layout>
  )
}

export default Contact

export const Head = () => (
  <Seo title="Contact" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
)
