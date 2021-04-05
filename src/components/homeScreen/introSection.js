import React from "react"
import Img from "gatsby-image"

import "../../styles/css/screens/homescreen/intro-section.css"

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
        </div>
      </div>
      <Img className="intro-image" fluid={image} style={{ width: "400px" }} />
    </section>
  )
}

export default IntroSection
