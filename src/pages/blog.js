import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/blog/blog-page.css"

import BlogItem from "../components/blog/BlogItem"
import HorizontalLine from "../components/HorizontalLine"

const BlogPage = ({ data, location }) => {
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
    <Layout location={location}>
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
  )
}

export default BlogPage

export const Head = () => (
  <Seo title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
          }
        }
      }
    }
  }
`
