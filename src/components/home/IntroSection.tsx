import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"

import "../../styles/css/screens/home/intro-section.css"
import { graphql, useStaticQuery } from "gatsby"
import type { ImageData } from "../../types/ui"

interface IntroSectionProps {
  darkModeImage: ImageData
  lightModeImage: ImageData
}

function IntroSection({ darkModeImage, lightModeImage }: IntroSectionProps) {
  const data = useStaticQuery<Queries.IntroSectionQuery>(query)
  // siteMetadata and its social links are always set from siteConfig.
  const social = data.site!.siteMetadata!.social!
  const fullName = data.site!.siteMetadata!.authorFullName
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
              href={social.github ?? undefined}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaGithub className="icon" />
            </a>
            <a
              href={social.linkedin ?? undefined}
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              <FaLinkedin className="icon" />
            </a>
            <a
              href={social.facebook ?? undefined}
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
        className="intro-image theme-light-only"
        image={lightModeImage}
        style={{ width: "400px" }}
        alt="Intro Image"
      />
      <GatsbyImage
        className="intro-image theme-dark-only"
        image={darkModeImage}
        style={{ width: "400px" }}
        alt="Intro Image"
      />
    </section>
  )
}

const query = graphql`
  query IntroSection {
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
