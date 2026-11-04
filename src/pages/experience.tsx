import React from "react"
import { Link, graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LineIcon from "../components/core/LineIcon"
import * as Home from "../styles/css/screens/home/home-sections.module.css"
import * as Page from "../styles/css/screens/collection-page.module.css"
import * as Styles from "../styles/css/screens/experience-page.module.css"
import { LineIconName } from "../types/ui"
import {
  ExperienceKind,
  ExperienceStatus,
  ExperienceType,
} from "../types/content"
import type { ExperiencePageEntry } from "../types/content"
import {
  descriptionExcerpt,
  experienceSpan,
  formatRoleRange,
  latestRoleEnd,
} from "../utils/experience"

// Groups in page order. Open-source entries have their own page.
const GROUPS = [
  { kind: ExperienceKind.FullTime, id: "full-time", label: "Full-time" },
  { kind: ExperienceKind.Internship, id: "internships", label: "Internships" },
  {
    kind: ExperienceKind.PositionOfResponsibility,
    id: "responsibility",
    label: "Positions of responsibility",
  },
]

const twoDigits = (value: number) => String(value).padStart(2, "0")

function ExperienceCard({
  entry,
  panel,
}: {
  entry: ExperiencePageEntry
  panel: boolean
}) {
  const roles = entry.roles ?? []
  const span = experienceSpan(roles)
  const logoSrc =
    entry.orgLogo?.childImageSharp?.gatsbyImageData.images.fallback?.src
  const description = entry.description ?? ""
  const excerpt = descriptionExcerpt(description)
  const tags = entry.tags ?? []
  const present = entry.status === ExperienceStatus.Present

  const cardClass = [
    Home.card,
    "b-shadow-card",
    present ? Home.current : "",
    panel ? Styles.panel : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={cardClass}>
      <div className={`${Home.orgHead} ${Styles.orgHeadTop}`}>
        {logoSrc && (
          <img
            className={Home.orgLogo}
            src={logoSrc}
            alt={`${entry.org} logo`}
          />
        )}
        <div>
          <div className={Home.badges}>
            <span
              className={`${Home.pill} ${present ? Home.present : Page.completed}`}
            >
              {entry.status}
            </span>
            {entry.type === ExperienceType.PositionOfResponsibility && (
              <span className={`${Home.pill} ${Page.por}`}>
                Position of responsibility
              </span>
            )}
            {entry.returnOffer && (
              <span className={Home.offer}>
                <LineIcon name={LineIconName.Star} /> Return offer
              </span>
            )}
          </div>
          <h3>{entry.org}</h3>
          <p className={Home.meta}>
            {span && `${span.start} – ${span.end} · `}
            {roles.length} {roles.length === 1 ? "role" : "roles"}
          </p>
        </div>
      </div>
      {roles.length > 0 && (
        <ul className={`${Home.roles} ${panel ? Styles.strip : Styles.stack}`}>
          {roles.map((role, index) => (
            <li key={`${role.title}-${index}`}>
              <strong>{role.title}</strong>
              <time>{formatRoleRange(role)}</time>
            </li>
          ))}
        </ul>
      )}
      {description &&
        (excerpt ? (
          <details className={Home.description}>
            <summary>
              <span className={Styles.excerpt}>{excerpt}</span>
              <span className={Home.fold}>Read description +</span>
            </summary>
            <p>{description}</p>
          </details>
        ) : (
          <p className={Home.description}>{description}</p>
        ))}
      {tags.length > 0 && (
        <div className={Page.tags}>
          {tags.map(tag => (
            <span key={tag} className={Page.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function Experience({
  data,
  location,
}: PageProps<Queries.ExperiencePageQuery>) {
  // miscellaneous.json is always sourced and always has an experience array.
  const experience = data.dataJson!.experience!

  const groups = GROUPS.map(group => ({
    ...group,
    // Newest first by latest role end; Array.prototype.sort is stable, so
    // ties keep the JSON order.
    entries: experience
      .filter(entry => entry.kind === group.kind)
      .map(entry => ({ entry, end: latestRoleEnd(entry.roles ?? []) }))
      .sort((a, b) => b.end - a.end)
      .map(({ entry }) => entry),
  }))

  return (
    <Layout location={location}>
      <div className={`${Home.scope} ${Page.page} ${Styles.root}`}>
        <div className={Home.wrap}>
          <header className={Page.pageIntro}>
            <div className={Home.eyebrow}>Engineering &amp; responsibility</div>
            <h1>Experience</h1>
            <p>Work, internships and the teams I have been part of.</p>
          </header>
          <nav className={Page.jumpNav} aria-label="Experience groups">
            {groups.map(group => (
              <a key={group.id} href={`#${group.id}`}>
                {group.label}
                <span>{twoDigits(group.entries.length)}</span>
              </a>
            ))}
          </nav>
          {groups.map((group, index) => (
            <section key={group.id} className={Styles.group} id={group.id}>
              <header className={Styles.groupHeading}>
                <div>
                  <span className={Home.eyebrow}>{twoDigits(index + 1)}</span>
                  <h2>{group.label}</h2>
                </div>
                <span className={Styles.count}>
                  {group.entries.length}{" "}
                  {group.entries.length === 1
                    ? "organisation"
                    : "organisations"}
                </span>
              </header>
              <div className={Styles.experienceGrid}>
                {group.entries.map(entry => (
                  <ExperienceCard
                    key={entry.org}
                    entry={entry}
                    panel={group.kind === ExperienceKind.FullTime}
                  />
                ))}
              </div>
            </section>
          ))}
          <div className={Page.linkRow}>
            <p className={Home.muted}>There is more on the open-source side.</p>
            <Link className={Home.textLink} to="/opensource/">
              Explore open source
              <LineIcon name={LineIconName.Arrow} />
            </Link>
          </div>
          <div className={Page.footLink}>
            <Link className={Home.textLink} to="/beyond-work/">
              Beyond work
              <LineIcon name={LineIconName.Arrow} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Experience

export const Head: HeadFC<Queries.ExperiencePageQuery> = ({ location }) => (
  <Seo
    title="Experience"
    description="Full-time work, internships and positions of responsibility held by Praneeth Reddy Kolanu."
    pathname={location.pathname}
  />
)

export const query = graphql`
  query ExperiencePage {
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
        kind
        type
        returnOffer
        tags
        description
        roles {
          title
          start
          end
        }
      }
    }
  }
`
