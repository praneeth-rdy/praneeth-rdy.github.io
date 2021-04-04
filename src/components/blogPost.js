import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default ({ node, postClass }) => (
    <article className="post-content page-template no-image" style={{ padding: 0, }}>
        <div className="post-content-body">
            <h3 id="heading-level-3" style={{ margin: 0, }}>{node.frontmatter.title || node.fields.slug}</h3>
            <Img
                fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                className={`post-card ${postClass
                    } ${node.frontmatter.thumbnail ? `with-image` : `no-image`}`}
                style={
                    node.frontmatter.thumbnail && {
                        marginTop: '2rem',
                        marginBottom: '2rem',
                    }
                } />
            <blockquote>
                {node.frontmatter.quote}
            </blockquote>
            <p>
                {node.frontmatter.description}
            </p>
        </div>
        <hr
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: 2
            }}
        />
    </article>
)
