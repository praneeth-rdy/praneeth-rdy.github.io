import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

// import "../styles/global.scss"
import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/blog/blog-page.css"

import BlogItem from "../components/blog/BlogItem"
import HorizontalLine from "../components/horizontalLine"
import ThemeContextProvider from "../context/ThemeContextProvider"

// TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogPage = ({ data }, location) => {
  const navHeading = data.site.siteMetadata.navHeading
  const allPosts = data.allMarkdownRemark.edges
  const allCategories = [
    "all",
    ...new Set(
      data.allMarkdownRemark.edges.map(({ node }) => node.frontmatter.category)
    ),
  ]
  const [posts, setPosts] = useState(allPosts)
  const [category, setCategory] = useState("all")
  let postCounter = 0

  function filterPosts(categ) {
    if (categ === "all") {
      setPosts(allPosts)
    } else {
      const newPosts = allPosts.filter(
        postItem => postItem.node.frontmatter.category === categ
      )
      setPosts(newPosts)
    }
    setCategory(categ)
  }

  return (
    <ThemeContextProvider>
      <Layout navHeading={navHeading} path="/blog">
        <Seo
          title="Blog"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {/* <Bio /> */}
        {data.site.siteMetadata.description && (
          <header className="page-head">
            <h2 className="page-head-title">
              {data.site.siteMetadata.description}
            </h2>
          </header>
        )}
        <HorizontalLine color="rgba(0, 0, 0, 0.5)" />
        <h2 className="blogs-page-heading">My Recent Blogs</h2>
        <div className="blog-filters-container">
          {allCategories.map((categ, index) => (
            <button
              key={index}
              className={`blog-filter button ${
                categ === category ? "primary" : ""
              } small`}
              onClick={() => filterPosts(categ)}
            >
              {categ[0].toUpperCase() + categ.slice(1)}
            </button>
          ))}
        </div>
        <div className="blog-body">
          {posts.map(({ node }) => {
            postCounter++
            return (
              <BlogItem
                key={node.fields.slug}
                count={postCounter}
                node={node}
                postClass={`post`}
              />
            )
          })}
        </div>
      </Layout>
    </ThemeContextProvider>
  )
}

const blogQuery = graphql`
  query {
    site {
      siteMetadata {
        navHeading
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(blogs)/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            description
            maxread
            category
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

const BlogPageExport = props => (
  <StaticQuery
    query={blogQuery}
    render={data => (
      <BlogPage location={props.location} props data={data} {...props} />
    )}
  />
)

export default BlogPageExport
