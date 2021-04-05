import React from "react"
import { Link } from "gatsby"

const Layout = props => {
  const { navHeading, path, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  var navActive = {
    home: "",
    about: "",
    blog: "",
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
            href={`#`}
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
          <div className="site-head-left">
            <Link className="site-head-logo" to={`/`} style={{ opacity: 1 }}>
              {navHeading}
            </Link>
          </div>
          <nav id="swup" className="site-head-left">
            <ul className="nav" role="menu">
              <li className={"nav-home " + navActive.home} role="menuitem">
                <Link to={`/`}>Home</Link>
              </li>
              <li className={"nav-about " + navActive.about} role="menuitem">
                <Link to={`/about`}>About</Link>
              </li>
              <li className={"nav-elements " + navActive.blog} role="menuitem">
                <Link to={`/blog`}>Blog</Link>
              </li>
              <li
                className={"nav-elements " + navActive.elements}
                role="menuitem"
              >
                <Link to={`/elements`}>Elements</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-right">
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
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{navHeading}</Link>{" "}
        &mdash; Built with{" "}
        <a
          href="https://gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </footer>
    </div>
  )
}

export default Layout
