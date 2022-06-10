import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contact/ContactForm"
import ThemeContextProvider from "../context/ThemeContextProvider"

function Contact() {
  return (
    <ThemeContextProvider>
      <Layout navHeading="praneeth-rdy" path="/contact">
        <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <ContactForm />
      </Layout>
    </ThemeContextProvider>
  )
}

export default Contact;
