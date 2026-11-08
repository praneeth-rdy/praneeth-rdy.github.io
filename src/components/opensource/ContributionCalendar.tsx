import React, { useEffect, useId, useRef, useState } from "react"
import type { GithubCalendar } from "../../types/content"
import * as Home from "../../styles/css/screens/home/home-sections.module.css"
import * as Styles from "../../styles/css/screens/opensource-calendar.module.css"

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
})
const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
const dateLabel = (date: string) => dateFormat.format(new Date(date))
const levels: Record<string, string> = {
  NONE: Styles.none,
  FIRST_QUARTILE: Styles.first,
  SECOND_QUARTILE: Styles.second,
  THIRD_QUARTILE: Styles.third,
  FOURTH_QUARTILE: Styles.fourth,
}

interface Props {
  calendar: GithubCalendar
  github: string
}

export default function ContributionCalendar({ calendar, github }: Props) {
  const id = useId()
  const { days } = calendar
  const [active, setActive] = useState(days.length - 1)
  const [hovered, setHovered] = useState<number | null>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    // Keep the latest weeks in view on narrow screens without moving the page.
    if (scroll.current) scroll.current.scrollLeft = scroll.current.scrollWidth
  }, [])
  if (!days.length) return null
  const offset = days[0].weekday
  const weeks = Math.ceil((days.length + offset) / 7)
  const shown = days[hovered ?? active]
  const description = `${shown.contributionCount.toLocaleString("en-US")} ${shown.contributionCount === 1 ? "contribution" : "contributions"} on ${dateLabel(shown.date)}`
  const months = days.flatMap((day, index) => {
    if (index !== 0 && !day.date.endsWith("-01")) return []
    const column = Math.floor((index + offset) / 7)
    // Suppress a short opening fragment if its label would collide with the next month.
    if (index === 0 && days.slice(1, 15).some(d => d.date.endsWith("-01")))
      return []
    return [
      { column, label: monthFormat.format(new Date(day.date)), date: day.date },
    ]
  })
  const focusDay = (index: number) => {
    const next = Math.max(0, Math.min(days.length - 1, index))
    setHovered(null)
    setActive(next)
    buttons.current[next]?.focus({ preventScroll: true })
    const viewport = scroll.current
    const button = buttons.current[next]
    if (viewport && button) {
      const bounds = viewport.getBoundingClientRect()
      const cell = button.getBoundingClientRect()
      if (cell.left < bounds.left)
        viewport.scrollLeft -= bounds.left - cell.left + 8
      if (cell.right > bounds.right)
        viewport.scrollLeft += cell.right - bounds.right + 8
    }
  }
  return (
    <section
      className={`${Home.card} b-shadow-card ${Styles.calendar}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className={Styles.heading}>
        <div>
          <h2 id={`${id}-heading`}>GitHub activity</h2>
          <p className={Styles.summary}>
            <strong>
              {calendar.totalContributions.toLocaleString("en-US")}
            </strong>{" "}
            contributions · {dateLabel(days[0].date)} –{" "}
            {dateLabel(days[days.length - 1].date)}
          </p>
        </div>
        <a className={Home.textLink} href={github}>
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p id={`${id}-help`} className={Home.srOnly}>
        Use arrow keys to explore days: up and down move one day; left and right
        move one week. Home and End move to the first and last day. On touch
        screens, tap a square to read its date and count.
      </p>
      <div
        className={Styles.scroll}
        ref={scroll}
        role="group"
        aria-label="Daily GitHub contributions"
        aria-describedby={`${id}-help`}
      >
        <div
          className={Styles.chart}
          style={{ "--weeks": weeks } as React.CSSProperties}
        >
          <div className={Styles.months} aria-hidden="true">
            {months.map(month => (
              <span key={month.date} style={{ gridColumn: month.column + 1 }}>
                {month.label}
              </span>
            ))}
          </div>
          <div className={Styles.weekdays} aria-hidden="true">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className={Styles.days} onMouseLeave={() => setHovered(null)}>
            {Array.from({ length: offset }, (_, i) => (
              <span key={`empty-${i}`} aria-hidden="true" />
            ))}
            {days.map((day, index) => (
              <button
                key={day.date}
                type="button"
                ref={el => {
                  buttons.current[index] = el
                }}
                className={`${Styles.day} ${levels[day.contributionLevel] ?? Styles.none}`}
                tabIndex={active === index ? 0 : -1}
                aria-label={`${day.contributionCount} ${day.contributionCount === 1 ? "contribution" : "contributions"} on ${dateLabel(day.date)}`}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => {
                  setActive(index)
                  setHovered(null)
                }}
                onClick={() => {
                  setActive(index)
                  setHovered(null)
                }}
                onKeyDown={event => {
                  const delta: Record<string, number> = {
                    ArrowLeft: -7,
                    ArrowRight: 7,
                    ArrowUp: -1,
                    ArrowDown: 1,
                  }
                  if (
                    event.key in delta ||
                    event.key === "Home" ||
                    event.key === "End"
                  ) {
                    event.preventDefault()
                    focusDay(
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? days.length - 1
                          : index + delta[event.key]
                    )
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={Styles.footer}>
        <p className={Styles.detail} aria-live="polite" aria-atomic="true">
          {description}
        </p>
        <div
          className={Styles.legend}
          aria-label="Colour intensity: fewer to more contributions"
        >
          <span>Less</span>
          {Object.entries(levels).map(([level, css]) => (
            <span
              key={level}
              className={`${Styles.swatch} ${css}`}
              aria-hidden="true"
            />
          ))}
          <span>More</span>
        </div>
      </div>
      <p className={Styles.updated}>
        Updated {dateLabel(calendar.fetchedAt)} · Includes activity across
        GitHub.
      </p>
    </section>
  )
}
