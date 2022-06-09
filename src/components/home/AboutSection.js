import React from "react"
import "../../styles/css/screens/home/about-section.css"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"

function AboutSection({ image }) {
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">About</h2>
      <div className="about-content row">
        <figure className="about-image">
          {/* <Img fluid={image} className="" style={{ borderRadius: "8px" }} /> */}
          <GatsbyImage
            image={image}
            style={{ borderRadius: "8px" }}
            alt='About Image'
          />
        </figure>
        <div className="about-description">
          <p>
            Hi, I'm Praneeth Reddy Kolanu, a hybrid version of Software, Business and Management.
            I love solving societal problems through technology and building software applications which have the potential to impact people's lives.
            I am an active open-source contributor. I participate in all the open source programs which come on my way.
            Gradually, becoming obsessed with Data Structures, Algorithms and Problem-Solving. Ready to face new challenges of life.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
