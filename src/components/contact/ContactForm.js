import React, { useState } from "react"
// import Img from "gatsby-image"
// import { GatsbyImage } from "gatsby-plugin-image"
// import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
// import axios from "axios";

import "../../styles/css/screens/contact.css"
import { graphql, StaticQuery } from "gatsby"

function ContactForm({ data, darkMode }) {
  // const social = data.site.siteMetadata.social
  const [formStatus, setFormStatus] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    setSubmitStatus("loading");
    setFormStatus("");
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData)
    };
    fetch('https://innovate.pythonanywhere.com/portfolio/contact-form/', requestOptions)
      .then(response => response.json()).then(jsonData => {
        setFormStatus(jsonData.message);
        setSubmitStatus("");
      })
      .catch((error) => {
        setFormStatus("An error has occured");
        setSubmitStatus("");
      });
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
            {/* <div className="col-12">
              <select name="demo-category" id="demo-category">
                <option value>- Category -</option>
                <option value={1}>Manufacturing</option>
                <option value={1}>Shipping</option>
                <option value={1}>Administration</option>
                <option value={1}>Human Resources</option>
              </select>
            </div> */}
            {/* Break */}
            {/* <div className="col-4 col-12-small">
              <input
                type="radio"
                id="demo-priority-low"
                name="demo-priority"
                defaultChecked
              />
              <label htmlFor="demo-priority-low">Low</label>
            </div>
            <div className="col-4 col-12-small">
              <input
                type="radio"
                id="demo-priority-normal"
                name="demo-priority"
              />
              <label htmlFor="demo-priority-normal">Normal</label>
            </div>
            <div className="col-4 col-12-small">
              <input
                type="radio"
                id="demo-priority-high"
                name="demo-priority"
              />
              <label htmlFor="demo-priority-high">High</label>
            </div> */}
            {/* Break */}
            {/* <div className="col-6 col-12-small">
              <input type="checkbox" id="demo-copy" name="demo-copy" />
              <label htmlFor="demo-copy">Email me a copy</label>
            </div>
            <div className="col-6 col-12-small">
              <input
                type="checkbox"
                id="demo-human"
                name="demo-human"
                defaultChecked
              />
              <label htmlFor="demo-human">I am a human</label>
            </div> */}
            {/* Break */}
            <div className="col-12">
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message"
                rows={6}
                defaultValue={""}
                required
              />
            </div>
            <div className="col-12 transition-fade">{formStatus}</div>
            {/* Break */}
            <div className="col-12">
              <ul className="actions">
                <li>
                  <button type="submit" className={"primary " + submitStatus}><span>Submit</span></button>
                </li>
                <li>
                  <input type="reset" defaultValue="Reset" />
                </li>
              </ul>
            </div>
          </div>
        </form>
        {/* <form name="contact-form">
          <div className="form-row" >
            <input></input>
            <input></input>
          </div>
          <div className="form-row" >
            <input></input>
            <input></input>
          </div>
          <div className="form-row" >
            <textarea></textarea>
          </div>
          <div className="submission-status"></div>
          <button>Submit</button>
        </form> */}
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        authorFullName
        social {
          github
          linkedin
          facebook
          email
        }
      }
    }
  }
`

const ContactFormExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <ContactForm props data={data} {...props} />}
  />
)

export default ContactFormExport
