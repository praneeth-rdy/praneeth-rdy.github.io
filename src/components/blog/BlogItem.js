import React from "react"
import { Link } from "gatsby"
import { BsDot } from "react-icons/bs"
// import Img from "gatsby-image"
import "../../styles/css/screens/blog/blog-item.css"

function BlogItem({ node, postClass }) {
  return (
    <article className="blog-item transition-fade" style={{ padding: 0 }}>
      <Link to={"/blog" + node.fields.slug} className="blog-item-link">
        <div className="post-content-body">
          <h2 className="blog-item-category">{node.frontmatter.category}</h2>
          <h3 className="blog-item-heading" style={{ margin: 0 }}>
            {node.frontmatter.title || node.fields.slug}
          </h3>
          <div className="blog-item-addinfo">
            <h2>
              {/* <FaClock className="fa-icon" /> */}
              Published on {node.frontmatter.date}
            </h2>
            <div className="addinfo-separator">
              <BsDot className="fa-icon" />
            </div>
            <h2>{node.frontmatter.maxread} read</h2>
            {/* <h2>
              <FaUser className="fa-icon" />
              {node.frontmatter.author}
            </h2> */}
          </div>
          {/* <Img
        fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
        className={`post-card ${postClass} ${
          node.frontmatter.thumbnail ? `with-image` : `no-image`
        }`}
        style={
          node.frontmatter.thumbnail && {
            marginTop: "2rem",
            marginBottom: "4rem",
          }
        }
      /> */}
          {/* <blockquote className="blog-item-quote">
            {node.frontmatter.quote}
          </blockquote> */}
          <p className="blog-item-description">
            {node.frontmatter.description}
          </p>
        </div>
      </Link>
      {/* <HorizontalLine color="rgba(0, 0, 0, 0.5)" margin="50px" /> */}
    </article>
  )
}

export default BlogItem
