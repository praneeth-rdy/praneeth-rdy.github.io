import React, { useState, cloneElement, Fragment, useContext } from "react";
import ToggleButton from "./toggleButton";
import { Link } from "gatsby";
import { ThemeContext } from "../context/ThemeContextProvider";

const Layout = (props) => {
  const [isDarkMode, toggleThemeMode] = useContext(ThemeContext);
  // console.log(isDarkMode);
  const { navHeading, path, children } = props
  const [toggleNav, setToggleNav] = useState(false)
  if (typeof window !== "undefined") {
    document.body.className = isDarkMode ? "dark" : "light"
  }
  var navActive = {
    home: "",
    about: "",
    blog: "",
    publications: "",
    contact: "",
    elements: "",
  }
  switch (path) {
    case "/":
      navActive.home = "nav-current"
      break
    case "/about":
      navActive.about = "nav-current"
      break
    case "/blog":
      navActive.blog = "nav-current"
      break
    case "/publications":
      navActive.publications = "nav-current"
      break
    case "/contact":
      navActive.contact = "nav-current"
      break
    case "/elements":
      navActive.elements = "nav-current"
      break
    default:
      break
  }
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
          {/*to place name in center change class name to site-head-center, remove style attribute from link and place this div below nav element*/}
          <div className="site-head-left cursor" id="nav-heading">
            <Link className="site-head-logo" to={`/`} style={{ opacity: 1 }}>
              {"> " + navHeading}
            </Link>
          </div>
          <nav id="swup" className="site-head-left">
            <ul className="nav">
              <li className={"nav-home " + navActive.home}>
                <Link to={`/`}>Home</Link>
              </li>
              {/* <li className={"nav-about " + navActive.about}>
                <Link to={`/about`}>About</Link>
              </li> */}
              <li className={"nav-blog " + navActive.blog}>
                <Link to={`/blog`}>Blog</Link>
              </li>
              {/* <li className={"nav-publications " + navActive.publications}>
                <Link to={`/publications`}>Publications</Link>
              </li> */}
              <li className={"nav-contact " + navActive.contact}>
                <Link to={`/contact`}>Contact</Link>
              </li>
              {/* <li className={"nav-elements " + navActive.elements}>
                <Link to={`/elements`}>Elements</Link>
              </li> */}
              <li className="toggle-btn-item">
                <ToggleButton
                  onClick={() => toggleThemeMode()}
                  darkMode={isDarkMode}
                />
              </li>
            </ul>
          </nav>
          {/* <div className="site-head-right">
            <div className="social-links">
              <a
                href="https://www.facebook.com"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <Link
                to={`/rss.xml`}
                title="RSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS
              </Link>
            </div>
          </div> */}
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children.map((child, index) => (
            <Fragment key={index}>
              {cloneElement(child, { isDarkMode: isDarkMode })}
            </Fragment>
          ))}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{navHeading}</Link>{" "}
        {/* &mdash; Built with{" "}
        <a
          href="https://gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Gatsby
        </a> */}
      </footer>
    </div>
  )
}

export default Layout
