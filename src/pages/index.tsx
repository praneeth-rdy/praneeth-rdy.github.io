import React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/home/index.css"

import IntroAboutSection from "../components/home/IntroAboutSection"
import ExperienceHighlight from "../components/home/ExperienceHighlight"
import FeaturedProjects from "../components/home/FeaturedProjects"
import LatestWriting from "../components/home/LatestWriting"
import OpenSourceStrip from "../components/home/OpenSourceStrip"
import SkillsetSection from "../components/home/SkillsetSection"
import ContactCta from "../components/home/ContactCta"

const Index = ({ data, location }: PageProps<Queries.IndexPageQuery>) => {
  // The portrait is a committed file under src/content/images/home.
  const portrait = data.portrait!.childImageSharp!.gatsbyImageData

  return (
    <Layout location={location}>
      <IntroAboutSection portrait={portrait} />
      <ExperienceHighlight />
      <FeaturedProjects />
      <LatestWriting />
      <OpenSourceStrip />
      <SkillsetSection />
      <ContactCta />
    </Layout>
  )
}

export default Index

export const Head: HeadFC<Queries.IndexPageQuery> = ({ location }) => (
  <Seo
    title="Home"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)

export const query = graphql`
  query IndexPage {
    portrait: file(relativePath: { eq: "home/about.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 580, aspectRatio: 1)
      }
    }
  }
`
