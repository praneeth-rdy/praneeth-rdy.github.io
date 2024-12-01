import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
// import PostCard from "../components/postCard"
import HorizontalLine from "../components/horizontalLine"

// import "../styles/global.scss"
import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/home/index.css"

import IntroSection from "../components/home/IntroSection"
import AboutSection from "../components/home/AboutSection"
import SkillsetSection from "../components/home/SkillsetSection"
import ExperienceSection from "../components/home/ExperienceSection"
import ProjectsSection from "../components/home/ProjectsSection"
import ThemeContextProvider from "../context/ThemeContextProvider"

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const Index = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading
  // const posts = data.allMarkdownRemark.edges
  const darkModeImage = data.darkModeImage.childImageSharp.gatsbyImageData
  const lightModeImage = data.lightModeImage.childImageSharp.gatsbyImageData
  const aboutPic = data.aboutPic.childImageSharp.gatsbyImageData
  // let postCounter = 0

  return (
    <ThemeContextProvider>
      <Layout navHeading={navHeading} path="/">
        <Seo
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

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

        {/* <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div> */}
      </Layout>
    </ThemeContextProvider>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        navHeading
        description
      }
    }
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

const IndexExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <Index location={props.location} props data={data} {...props} />
    )}
  />
)

export default IndexExport
