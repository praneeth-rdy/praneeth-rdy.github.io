import React from "react"
//import Slider from "react-slick"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"
import { StaticQuery, graphql } from "gatsby"
import "../../styles/css/screens/homescreen/skillset-section.css"

function SkillsetSection(props) {
  //use data as props.data
  const skills = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 class="section-heading">Skillset</h2>
      <div className="cards-container row">
        {skills.map(({ node }) => {
          return (
            <div className="card-wrapper">
              <div className="card b-shadow grow">
                <h3 className="heading">{node.frontmatter.title}</h3>
                <div className="card-image">
                  <GatsbyImage
                    image={node.frontmatter.thumbnail.childImageSharp.gatsbyImageData}/>
                </div>
                <div className="card-description">
                  <p>{node.frontmatter.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(skills)/" } }) {
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
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

const SkillsetSectionExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <SkillsetSection props data={data} {...props} />}
  />
)

export default SkillsetSectionExport;