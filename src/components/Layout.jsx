import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaArrowUp } from "react-icons/fa"
import ToggleButton from "./ToggleButton"
import { useTheme } from "../context/ThemeContextProvider"

// About, Publications and Elements pages also exist under src/pages and can be re-added here.
const NAV_LINKS = [
  { to: "/", label: "Home", className: "nav-home" },
  { to: "/blog", label: "Blog", className: "nav-blog" },
  { to: "/contact", label: "Contact", className: "nav-contact" },
]

const normalizePath = pathname => {
  const stripped = (pathname || "").replace(/\/+$/, "")
  return stripped === "" ? "/" : stripped
}

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
const Layout = ({ children, location }) => {
  const [isDarkMode, toggleThemeMode] = useTheme()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          navHeading
        }
      }
    }
  `)
  const navHeading = site.siteMetadata.navHeading
  const [toggleNav, setToggleNav] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light"
  }, [isDarkMode])

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
          <a
            className="nav-burger"
            href="#"
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <div className="site-head-left cursor" id="nav-heading">
            <Link className="site-head-logo" to={`/`} style={{ opacity: 1 }}>
              {"> " + navHeading}
            </Link>
          </div>
          <nav id="swup" className="site-head-left">
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
        <span className="scroll-to-top-btn" onClick={scrollToTop}>
          <FaArrowUp size={14} />
        </span>
      )}
      <footer className="site-foot">
        &copy; {new Date().getFullYear()}{" "}
        <Link to={`/`}>{navHeading}</Link>{" "}
      </footer>
    </div>
  )
}

export default Layout
