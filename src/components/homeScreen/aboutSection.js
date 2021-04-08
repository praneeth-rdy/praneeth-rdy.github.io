import React from "react"
import "../../styles/css/screens/homescreen/about-section.css"
import Img from "gatsby-image"

function AboutSection({ image }) {
  return (
    <section className="home-section post-content-body">
      <h2 class="main-heading">About</h2>
      <div className="about-content row">
        <figure className="about-image">
          <Img fluid={image} className="" style={{ borderRadius: "8px" }} />
        </figure>
        <div className="about-description">
          <p>
            Hi, I'm Praneeth Reddy Kolanu, a passionate self-taught frontEnd web
            developer from India, currently working at timeless.co as a FrontEnd
            engineer. I tend to make use of modern web technologies to build
            websites that look great, feel fantastic, and function correctly. I
            am especially focusing on Reactjs. I'm also a certified graphic
            designer from "Ramakrishna Mission Shilpamandira". I also do Graphic
            and UI designing. Since I love both programming and designing, I'm
            also interested in creating programmatic designs and creative coding
            projects.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
