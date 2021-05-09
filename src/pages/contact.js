import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contact/contactForm"

function Contact() {
  return (
    <Layout navHeading="praneeth-rdy" path="/contact">
      <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <ContactForm />
    </Layout>
  )
}

export default Contact
