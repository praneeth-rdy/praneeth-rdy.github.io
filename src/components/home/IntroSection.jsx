import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"

import "../../styles/css/screens/home/intro-section.css"
import { graphql, useStaticQuery } from "gatsby"
import { useTheme } from "../../context/ThemeContextProvider"

function IntroSection({ darkModeImage, lightModeImage }) {
  const data = useStaticQuery(query)
  const [isDarkMode] = useTheme()
  const social = data.site.siteMetadata.social
  const fullName = data.site.siteMetadata.authorFullName
  return (
    <section className="page-head intro-section">
      <div className="intro-text">
        <div>
          <h3>Hello, I'm</h3>
          <h1>{fullName}</h1>
          <h3 className="designation">Passionate Full Stack Developer</h3>
          <a
            className="link button grow"
            href="19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf"
            download="19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf"
          >
            Download Resume
          </a>
          <div className="icons-container">
            <a
              href={social.github}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaGithub className="icon" />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaLinkedin className="icon" />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaFacebook className="icon" />
            </a>
            <a
              href={"mailto:" + social.email}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaEnvelope className="icon" />
            </a>
          </div>
        </div>
      </div>
      <GatsbyImage
        className="intro-image"
        image={isDarkMode ? darkModeImage : lightModeImage}
        style={{ width: "400px" }}
        alt="Intro Image"
      />
    </section>
  )
}

const query = graphql`
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

export default IntroSection
