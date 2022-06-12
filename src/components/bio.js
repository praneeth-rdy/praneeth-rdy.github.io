/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <section>
            <GatsbyImage
              image={data.avatar.childImageSharp.gatsbyImageData}
              alt={author}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong> who lives and works in San
              Francisco building useful things.
              {` `}
              <a
                href={`https://twitter.com/${social.twitter}`}
                className="link"
              >
                You should follow him on Twitter
              </a>
            </p>
          </section>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    site {
      siteMetadata {
        author
        social {
          facebook
        }
      }
    }
  }
`

export default Bio
