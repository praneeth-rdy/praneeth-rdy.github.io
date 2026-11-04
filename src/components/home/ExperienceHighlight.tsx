import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName } from "../../types/ui"
import { ExperienceStatus } from "../../types/content"
import {
  experienceFigures,
  experienceSpan,
  findCurrentExperience,
  formatRoleRange,
} from "../../utils/experience"

// Unified panel for the current organisation plus the three summary figures.
// The organisation card lists up to two roles that preceded the current one,
// or the organisation's tags when the current role is the first one there.
// Figures are computed from dataJson.experience against the build time, so the
// server render and hydration agree.
function ExperienceHighlight() {
  const data = useStaticQuery<Queries.ExperienceHighlightQuery>(query)
  // miscellaneous.json is always sourced and always has an experience array;
  // siteBuildMetadata is created by Gatsby on every run.
  const experience = data.dataJson!.experience!
  const buildTime = new Date(data.siteBuildMetadata!.buildTime!)

  const current = findCurrentExperience(experience)
  const figures = experienceFigures(experience, buildTime)
  const roles = current?.roles ?? []
  const latestRole = roles[0]
  const span = experienceSpan(roles)
  const earlierRoles = roles.slice(1, 3)
  const tags = (current?.tags ?? []).filter(
    (tag): tag is string => typeof tag === "string"
  )
  const logoSrc =
    current?.orgLogo?.childImageSharp?.gatsbyImageData.images.fallback?.src
  // "Trumio Inc." -> "Trumio": the organisation's first word.
  const shortOrg = current?.org.split(" ")[0]

  return (
    <div className={Styles.scope}>
      <div className={Styles.wrap}>
        <section className={Styles.homeBlock}>
          <div className={Styles.sectionTitle}>
            <h2>Experience</h2>
          </div>
          {current && latestRole && (
            <div className={`${Styles.homeCurrent} b-shadow-card`}>
              <div className={Styles.homeOverview}>
                <span className={Styles.eyebrow}>Currently at {shortOrg}</span>
                <h3>{latestRole.title}</h3>
                <p className={Styles.muted}>{formatRoleRange(latestRole)}</p>
                <Link className={Styles.textLink} to="/experience/">
                  View all experience
                  <LineIcon name={LineIconName.Arrow} />
                </Link>
              </div>
              <article className={`${Styles.card} ${Styles.current}`}>
                <div className={Styles.orgHead}>
                  {logoSrc && (
                    <img
                      className={Styles.orgLogo}
                      src={logoSrc}
                      alt={`${current.org} logo`}
                    />
                  )}
                  <div>
                    <div className={Styles.badges}>
                      {current.status === ExperienceStatus.Present && (
                        <span className={`${Styles.pill} ${Styles.present}`}>
                          {current.status}
                        </span>
                      )}
                      {current.returnOffer && (
                        <span className={Styles.offer}>
                          <LineIcon name={LineIconName.Star} /> Return offer
                        </span>
                      )}
                    </div>
                    <h3>{current.org}</h3>
                    <p className={Styles.meta}>
                      {span && `${span.start} – ${span.end} · `}
                      {roles.length} {roles.length === 1 ? "role" : "roles"}
                    </p>
                  </div>
                </div>
                {roles.length > 1 ? (
                  <ul className={Styles.roles}>
                    {earlierRoles.map(role => (
                      <li key={`${role.title}-${role.start}`}>
                        <strong>{role.title}</strong>
                        <time>{formatRoleRange(role)}</time>
                      </li>
                    ))}
                  </ul>
                ) : (
                  tags.length > 0 && (
                    <div className={Styles.tags}>
                      {tags.map(tag => (
                        <span key={tag} className={Styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )
                )}
              </article>
            </div>
          )}
          <div className={Styles.stats}>
            {figures.yearsSinceFirstInternship !== null && (
              <div>
                <strong>{figures.yearsSinceFirstInternship}+</strong>
                <span>Years since first internship</span>
              </div>
            )}
            <div>
              <strong>{figures.organisations}</strong>
              <span>Organisations</span>
            </div>
            <div>
              <strong>{String(figures.positions).padStart(2, "0")}</strong>
              <span>Positions of responsibility</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const query = graphql`
  query ExperienceHighlight {
    siteBuildMetadata {
      buildTime
    }
    dataJson {
      experience {
        org
        orgLogo {
          childImageSharp {
            gatsbyImageData(
              width: 96
              height: 96
              layout: FIXED
              transformOptions: { fit: COVER }
            )
          }
        }
        status
        type
        returnOffer
        tags
        roles {
          title
          start
          end
        }
      }
    }
  }
`

export default ExperienceHighlight
