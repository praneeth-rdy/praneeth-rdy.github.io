import React, { useState } from "react"
import axios from "axios"

import "../../styles/css/screens/contact.css"

function ContactForm() {
  const [formStatusMessage, setFormStatusMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const formSubmit = e => {
    e.preventDefault()
    setFormStatusMessage("")
    setIsLoading(true)
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      timestamp: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }

    axios({
      method: "post",
      url: "https://script.google.com/macros/s/AKfycbzeRvT-r_rDE339RLL6KiZju06EZSrocF1rV8YepXb3X_RPg27KoJ1nwwFsPAXRhEjlEQ/exec",
      data: new URLSearchParams(formData).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then(response => {
        setFormStatusMessage("Form submitted successfully")
      })
      .catch(error => {
        console.log(error)
        setFormStatusMessage("An error has occurred")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <section className="contact-section">
      <div>
        <h2>Contact Form</h2>
        <form method="post" onSubmit={formSubmit}>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="name"
                id="name"
                defaultValue=""
                placeholder="Name"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue=""
                placeholder="Email"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="tel"
                name="mobile"
                id="mobile"
                defaultValue=""
                placeholder="Mobile"
                required
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="subject"
                id="subject"
                defaultValue=""
                placeholder="Subject"
                required
              />
            </div>
            {/* Break */}
            <div className="col-12">
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message"
                rows={6}
                defaultValue=""
                required
              />
            </div>
            <div className="col-12 transition-fade">{formStatusMessage}</div>
            {/* Break */}
            <div className="col-12">
              <ul className="actions">
                <li>
                  <button
                    type="submit"
                    className={`primary ${isLoading ? "loading" : ""}`}
                  >
                    <span>Submit</span>
                  </button>
                </li>
                <li>
                  <input type="reset" defaultValue="Reset" />
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
