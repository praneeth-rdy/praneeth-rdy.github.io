import React from "react"
//import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import "../../styles/css/screens/homescreen/experience-section.css"

function ExperienceSection(props) {
  //use data as props.data
  // const experiences = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 class="section-heading">Experience</h2>
      <div className="experience-container row">
        <div className="experience-nav-container">
          <button className="experience-nav-item">Education</button>
          <button className="experience-nav-item">Quantifiers</button>
          <button className="experience-nav-item">IR Cell</button>
          <button className="experience-nav-item">ChiSquarex</button>
        </div>
        <div className="experience-body-container">
          <h2 className="experience-heading">Software Engineer Intern</h2>
          <h3 className="experience-timeline">May 2020 - September 2020</h3>
          <ul className="experience-description-list">
            <li className="experience-description-list-item">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </li>
            <li className="experience-description-list-item">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </li>
            <li className="experience-description-list-item">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(experience)/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            quote
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <ExperienceSection props data={data} {...props} />}
  />
)
