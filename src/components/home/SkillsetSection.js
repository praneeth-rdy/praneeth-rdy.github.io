import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import Img from "gatsby-image"
import "../../styles/css/screens/home/skillset-section.css";

function SkillsetSection(props) {
  //use data as props.data
  const skills = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Skillset</h2>
      <div className="skill-cards-container">
        {skills.map(({ node }) => {
          return (
            <div className="skill-card" style={{ backgroundColor: node.frontmatter.color }}>
              {node.frontmatter.title}
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
          color
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

export default SkillsetSectionExport