import React from "react"
import { Link, graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LineIcon from "../components/core/LineIcon"
import * as Home from "../styles/css/screens/home/home-sections.module.css"
import * as Page from "../styles/css/screens/collection-page.module.css"
import * as Styles from "../styles/css/screens/beyond-work.module.css"
import { LineIconName } from "../types/ui"
import type { Extracurricular } from "../types/content"

const twoDigits = (value: number) => String(value).padStart(2, "0")

function ActivityLink({ label, to }: { label: string; to: string }) {
  const content = (
    <>
      {label}
      <LineIcon name={LineIconName.Arrow} />
    </>
  )
  // Site-relative paths go through Gatsby's router; anything else is external.
  return to.startsWith("/") ? (
    <Link className={Home.textLink} to={to}>
      {content}
    </Link>
  ) : (
    <a className={Home.textLink} href={to}>
      {content}
    </a>
  )
}

function Story({
  activity,
  index,
}: {
  activity: Extracurricular
  index: number
}) {
  const images = (activity.images ?? []).flatMap(file => {
    const image = getImage(file?.childImageSharp?.gatsbyImageData ?? null)
    return image ? [image] : []
  })
  const links = (activity.links ?? []).flatMap(link =>
    link.label && link.to ? [{ label: link.label, to: link.to }] : []
  )
  const hasCopy = Boolean(
    activity.when || activity.summary || links.length > 0 || activity.moment
  )

  return (
    <article
      className={`${Home.card} b-shadow-card ${Styles.story}`}
      id={activity.slug}
    >
      <header className={Styles.storyHead}>
        <div>
          <span className={Styles.storyIndex}>{twoDigits(index + 1)} /</span>
          <h2>{activity.title}</h2>
        </div>
        {activity.now && (
          <span className={`${Home.pill} ${Home.present}`}>Now</span>
        )}
      </header>
      {images.length > 0 ? (
        <div
          className={`${Styles.photoGrid} ${images.length === 1 ? Styles.single : ""}`}
        >
          {images.slice(0, 2).map((image, photoIndex) => (
            <div key={photoIndex} className={Styles.photo}>
              <GatsbyImage
                className={Styles.photoImage}
                image={image}
                alt={`${activity.title}, photo ${photoIndex + 1}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={Styles.photoGrid}>
          {[1, 2].map(photoNumber => (
            <div
              key={photoNumber}
              className={`${Styles.photo} ${Styles.photoPlaceholder}`}
            >
              <LineIcon name={LineIconName.Camera} />
              <span>Photo {photoNumber}</span>
            </div>
          ))}
        </div>
      )}
      {hasCopy && (
        <div className={Styles.storyCopy}>
          {(activity.when || activity.summary || links.length > 0) && (
            <div>
              {activity.when && (
                <div className={Styles.when}>{activity.when}</div>
              )}
              {activity.summary && <p>{activity.summary}</p>}
              {links.map(link => (
                <ActivityLink key={link.to} label={link.label} to={link.to} />
              ))}
            </div>
          )}
          {activity.moment && (
            <aside className={Styles.moment}>
              <span className={Home.eyebrow}>A moment to keep</span>
              <p>{activity.moment}</p>
            </aside>
          )}
        </div>
      )}
    </article>
  )
}

function BeyondWork({
  data,
  location,
}: PageProps<Queries.BeyondWorkPageQuery>) {
  const activities = data.allExtracurricularsJson.nodes

  return (
    <Layout location={location}>
      <div className={`${Home.scope} ${Page.page} ${Styles.root}`}>
        <div className={Home.wrap}>
          <header className={Page.pageIntro}>
            <div className={Home.eyebrow}>Away from the screen</div>
            <h1>Beyond Work</h1>
            <p>
              Mornings in a boxing hall, a volleyball court I still miss, a few
              years of volunteering, and a guitar that gets picked up more often
              than it gets practised.
            </p>
          </header>
          <nav className={Page.jumpNav} aria-label="Activities">
            {activities.map(activity => (
              <a key={activity.slug} href={`#${activity.slug}`}>
                {activity.title}
              </a>
            ))}
          </nav>
          <div className={Styles.stories}>
            {activities.map((activity, index) => (
              <Story key={activity.slug} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BeyondWork

export const Head: HeadFC<Queries.BeyondWorkPageQuery> = ({ location }) => (
  <Seo
    title="Beyond Work"
    description="Boxing, volleyball, volunteering and the other things Praneeth Reddy Kolanu does away from the screen."
    pathname={location.pathname}
  />
)

export const query = graphql`
  query BeyondWorkPage {
    allExtracurricularsJson {
      nodes {
        slug
        title
        now
        when
        summary
        moment
        images {
          childImageSharp {
            gatsbyImageData(width: 640, layout: CONSTRAINED)
          }
        }
        links {
          label
          to
        }
      }
    }
  }
`
