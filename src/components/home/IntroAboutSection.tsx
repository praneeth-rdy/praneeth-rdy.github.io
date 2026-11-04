import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"

import * as Home from "../../styles/css/screens/home/home-sections.module.css"
import * as Styles from "../../styles/css/screens/home/intro-about.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName, type ImageData } from "../../types/ui"
import { findCurrentExperience } from "../../utils/experience"

interface IntroAboutSectionProps {
  /** The owner portrait (home/about.jpg), cropped square by the page query. */
  portrait: ImageData
}

// The merged home introduction (concept "A · Portrait split",
// docs/handoffs/intro-about/a-portrait-split.html): greeting, name, current
// role, short bio, actions and connections beside a square portrait.
function IntroAboutSection({ portrait }: IntroAboutSectionProps) {
  const data = useStaticQuery<Queries.IntroAboutSectionQuery>(query)
  // siteMetadata, its bio and social links are always set from siteConfig.
  const metadata = data.site!.siteMetadata!
  const social = metadata.social!
  const fullName = metadata.authorFullName!
  // miscellaneous.json is always sourced, so dataJson exists.
  const current = findCurrentExperience(data.dataJson!.experience ?? [])
  const latestRole = current?.roles?.[0]

  return (
    <div className={Home.scope}>
      <section className={Styles.intro} aria-label="Introduction">
        <div className={Styles.composition}>
          <figure className={Styles.portrait}>
            <GatsbyImage
              className={Styles.portraitImage}
              image={portrait}
              alt={fullName}
            />
          </figure>
          <div className={Styles.copy}>
            <div className={Styles.greeting}>Hello, I'm</div>
            <h1>{fullName}</h1>
            {current && latestRole && (
              <p className={Styles.role}>
                {latestRole.title} <span>at {current.org}</span>
              </p>
            )}
            <p className={Styles.bio}>{metadata.bio}</p>
            <div className={Styles.actions}>
              <a
                className={`button primary grow ${Home.iconButton}`}
                href="#projects"
              >
                View projects
                <LineIcon name={LineIconName.Arrow} />
              </a>
              <a
                className="button grow"
                href="19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </div>
            <div className={Styles.connections}>
              <div
                className={Styles.socials}
                role="group"
                aria-label="Social profiles and email"
              >
                <a
                  href={social.github ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub aria-hidden="true" focusable="false" />
                </a>
                <a
                  href={social.linkedin ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin aria-hidden="true" focusable="false" />
                </a>
                <a
                  href={social.facebook ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook aria-hidden="true" focusable="false" />
                </a>
                <a href={`mailto:${social.email}`} aria-label="Email">
                  <FaEnvelope aria-hidden="true" focusable="false" />
                </a>
              </div>
              <Link className={Styles.beyondLink} to="/beyond-work/">
                Beyond work
                <LineIcon name={LineIconName.Arrow} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const query = graphql`
  query IntroAboutSection {
    site {
      siteMetadata {
        authorFullName
        bio
        social {
          github
          linkedin
          facebook
          email
        }
      }
    }
    dataJson {
      experience {
        org
        status
        roles {
          title
        }
      }
    }
  }
`

export default IntroAboutSection
