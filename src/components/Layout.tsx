import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaArrowUp } from "react-icons/fa"
import ToggleButton from "./ToggleButton"
import { useTheme } from "../context/ThemeContextProvider"
import type { WithChildren } from "../types/ui"

// About, Publications and Elements pages also exist under src/pages and can be re-added here.
const NAV_LINKS = [
  { to: "/", label: "Home", className: "nav-home" },
  { to: "/blog", label: "Blog", className: "nav-blog" },
  { to: "/contact", label: "Contact", className: "nav-contact" },
]

const normalizePath = (pathname: string | null | undefined) => {
  const stripped = (pathname || "").replace(/\/+$/, "")
  return stripped === "" ? "/" : stripped
}

interface LayoutProps extends WithChildren {
  location?: { pathname: string }
}

const Layout = ({ children, location }: LayoutProps) => {
  const [isDarkMode, toggleThemeMode] = useTheme()
  const { site } = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          navHeading
        }
      }
    }
  `)
  // site.siteMetadata always exists (set from siteConfig in gatsby-config).
  const navHeading = site!.siteMetadata!.navHeading
  const [toggleNav, setToggleNav] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentPath = location ? normalizePath(location.pathname) : null

  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={toggleNav}
            aria-controls="site-navigation"
            onClick={() => setToggleNav(!toggleNav)}
          >
            <span className="hamburger hamburger--collapse">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </span>
          </button>
          <div className="site-head-left cursor" id="nav-heading">
            <Link className="site-head-logo" to={`/`} style={{ opacity: 1 }}>
              {"> " + navHeading}
            </Link>
          </div>
          <nav id="site-navigation" className="site-head-left">
            <ul className="nav">
              {NAV_LINKS.map(({ to, label, className }) => {
                const isActive = currentPath === to
                return (
                  <li
                    key={to}
                    className={`${className} ${isActive ? "nav-current" : ""}`}
                  >
                    <Link to={to}>{label}</Link>
                  </li>
                )
              })}
              <li className="toggle-btn-item">
                <ToggleButton onClick={toggleThemeMode} darkMode={isDarkMode} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      {showBackToTop && (
        <button
          type="button"
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          <FaArrowUp size={14} />
        </button>
      )}
      <footer className="site-foot">
        &copy; {new Date().getFullYear()}{" "}
        <Link to={`/`}>{navHeading}</Link>{" "}
      </footer>
    </div>
  )
}

export default Layout
