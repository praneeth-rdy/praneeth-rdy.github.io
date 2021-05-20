import React from "react"
import { Link } from "gatsby"

export default ({ node, postClass, count }) => (
  <article
    className={`post-card ${count % 3 === 0 &&
      `post-card-large`} ${postClass} ${
      node.frontmatter.thumbnail ? `with-image` : `no-image`
    }`}
    style={
      node.frontmatter.thumbnail && {
        backgroundImage: `url(${node.frontmatter.thumbnail.childImageSharp.fluid.src})`,
      }
    }
  >
    <Link to={"/blog" + node.fields.slug} className="link post-card-link">
      <div className="post-card-content">
        <h2 className="post-card-title">
          {node.frontmatter.title || node.fields.slug}
        </h2>
      </div>
    </Link>
  </article>
)
