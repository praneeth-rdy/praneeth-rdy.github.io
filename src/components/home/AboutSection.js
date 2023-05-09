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
            alt="About Image"
          />
        </figure>
        <div className="about-description">
          <p>
            My name is Praneeth Reddy Kolanu, and I am a passionate problem solver who enjoys tackling complex challenges through a unique blend of technical expertise, business acumen, and project management skills.
          </p>
          <p>
            With a strong background in software engineering and business management, I am driven by a desire to leverage technology for the greater good. Whether it's building innovative software applications or contributing to open-source projects, I am always seeking new ways to make a positive impact on society.
          </p>
          <p>
            In my free time, I enjoy exploring new technologies, mastering data structures and algorithms, and honing my problem-solving skills. I am always up for a challenge and thrive in dynamic, fast-paced environments.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
