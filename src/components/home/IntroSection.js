import React from "react"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"

import "../../styles/css/screens/home/intro-section.css"
import { graphql, StaticQuery } from "gatsby"

function IntroSection({ darkModeImage, lightModeImage, data, darkMode }) {
  const social = data.site.siteMetadata.social
  const fullName = data.site.siteMetadata.authorFullName
  console.log(social)
  return (
    <section className="page-head intro-section">
      <div className="intro-text">
        <div>
          <h3>Hello, I'm</h3>
          <h1>{fullName}</h1>
          <h3 className="designation">Passionate Full Stack Developer</h3>
          <a
            className="link button grow"
            href="Praneeth-Reddy-Kolanu-CV.pdf"
            download="Praneeth-Reddy-Kolanu-CV.pdf"
          >
            Download Resume
          </a>
          <div className="icons-container">
            <a href={social.github} target="_blank" className="link" rel="noreferrer">
              <FaGithub className="icon" target="_blank" />
            </a>
            <a href={social.linkedin} target="_blank" className="link" rel="noreferrer">
              <FaLinkedin className="icon" target="_blank" />
            </a>
            <a href={social.facebook} target="_blank" className="link" rel="noreferrer">
              <FaFacebook className="icon" target="_blank" />
            </a>
            <a href={"mailto:" + social.email} target="_blank" className="link" rel="noreferrer">
              <FaEnvelope className="icon" />
            </a>
          </div>
        </div>
      </div>
      <GatsbyImage
        className="intro-image"
        image={darkMode ? darkModeImage : lightModeImage}
        style={{ width: "400px" }}
      />
    </section>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        authorFullName
        social {
          github
          linkedin
          facebook
          email
        }
      }
    }
  }
`

const IntroSectionExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <IntroSection props data={data} {...props} />}
  />
)

export default IntroSectionExport
