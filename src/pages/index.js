import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"
import HorizontalLine from "../components/horizontalLine"

// import "../styles/global.scss"
import "../styles/normalize.css"
import "../styles/css/screens/main.css"

import IntroSection from "../components/homeScreen/introSection"

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading
  const fullName = data.site.siteMetadata.authorFullName
  const posts = data.allMarkdownRemark.edges
  const image = data.file.childImageSharp.fluid
  let postCounter = 0

  return (
    <Layout navHeading={navHeading} path="/">
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      {/* Introduction Section */}
      <IntroSection fullName={fullName} image={image} />
      <HorizontalLine color="rgba(0, 0, 0, 0.5)" />

      <div className="post-feed">
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
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        authorFullName
        navHeading
        description
      }
    }
    file(relativePath: { eq: "home/intro-light-mode.png" }) {
      childImageSharp {
        fluid {
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
