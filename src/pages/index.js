import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import PostCard from "../components/postCard"
import HorizontalLine from "../components/horizontalLine"

// import "../styles/global.scss"
import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/homescreen/index.css"

import IntroSection from "../components/homeScreen/introSection"
import AboutSection from "../components/homeScreen/aboutSection"
import SkillsetSection from "../components/homeScreen/skillsetSection"
import ExperienceSection from "../components/homeScreen/experienceSection"
import ProjectsSection from "../components/homeScreen/projectsSection"

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading
  // const posts = data.allMarkdownRemark.edges
  const introPic = data.introPic.childImageSharp.fluid
  const aboutPic = data.aboutPic.childImageSharp.fluid
  // let postCounter = 0

  return (
    <Layout navHeading={navHeading} path="/">
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      {/* Introduction Section */}
      <IntroSection image={introPic} />
      <HorizontalLine color="rgba(0, 0, 0, 0.5)" />
      <AboutSection image={aboutPic} />

      <SkillsetSection />

      <ProjectsSection />

      <ExperienceSection />

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
    introPic: file(relativePath: { eq: "home/intro-light-mode.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    aboutPic: file(relativePath: { eq: "home/about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
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
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
