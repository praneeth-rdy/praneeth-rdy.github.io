import React from "react"
import { Link } from "gatsby"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName } from "../../types/ui"

// Closing call to action above the footer.
function ContactCta() {
  return (
    <div className={Styles.scope}>
      <div className={Styles.wrap}>
        <section className={Styles.cta}>
          <h2>Have something in mind?</h2>
          <Link
            className={`button primary grow ${Styles.iconButton}`}
            to="/contact/"
          >
            Let’s talk
            <LineIcon name={LineIconName.Arrow} />
          </Link>
        </section>
      </div>
    </div>
  )
}

export default ContactCta
