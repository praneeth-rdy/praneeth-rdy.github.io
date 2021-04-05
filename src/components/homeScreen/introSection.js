import React from "react"
import Img from "gatsby-image"
import { FaCodepen, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa"

import "../../styles/css/screens/homescreen/intro-section.css"
import { Link } from "gatsby"

function IntroSection({ fullName, image }) {
  console.log(image)
  return (
    <section className="page-head intro-section">
      <div className="intro-text">
        <div>
          <h3>Hello, I'm</h3>
          <h1>{fullName}</h1>
          <h3 className="designation">Passionate Full Stack Developer</h3>
          <a
            className="button"
            href="Praneeth-Reddy-Kolanu-CV.pdf"
            download="Praneeth-Reddy-Kolanu-CV.pdf"
          >
            Download Resume
          </a>
          <div className="icons-container">
            <a href="">
              <FaGithub className="icon" />
            </a>
            <a href="">
              <FaLinkedin className="icon" />
            </a>
            <a href="">
              <FaCodepen className="icon" />
            </a>
            <a href="">
              <FaEnvelope className="icon" />
            </a>
          </div>
        </div>
      </div>
      <Img className="intro-image" fluid={image} style={{ width: "400px" }} />
    </section>
  )
}

export default IntroSection
