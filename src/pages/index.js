import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import HorizontalLine from "../components/HorizontalLine"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/home/index.css"

import IntroSection from "../components/home/IntroSection"
import AboutSection from "../components/home/AboutSection"
import SkillsetSection from "../components/home/SkillsetSection"
import ExperienceSection from "../components/home/ExperienceSection"
import ProjectsSection from "../components/home/ProjectsSection"

const Index = ({ data, location }) => {
  const darkModeImage = data.darkModeImage.childImageSharp.gatsbyImageData
  const lightModeImage = data.lightModeImage.childImageSharp.gatsbyImageData
  const aboutPic = data.aboutPic.childImageSharp.gatsbyImageData

  return (
    <Layout location={location}>
      {/* Introduction Section */}
      <IntroSection
        darkModeImage={darkModeImage}
        lightModeImage={lightModeImage}
      />
      <HorizontalLine color="rgba(0, 0, 0, 0.5)" />
      <AboutSection image={aboutPic} />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsetSection />
    </Layout>
  )
}

export default Index

export const Head = () => (
  <Seo title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
)

export const query = graphql`
  query {
    lightModeImage: file(relativePath: { eq: "home/intro-light-mode.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    darkModeImage: file(relativePath: { eq: "home/intro-dark-mode.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    aboutPic: file(relativePath: { eq: "home/about.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
