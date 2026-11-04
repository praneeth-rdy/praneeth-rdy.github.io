import React, { useState } from "react"
import axios from "axios"

import siteConfig from "../../../siteConfig"
import {
  ContactField,
  type ContactFormErrors,
  type ContactFormValues,
} from "../../types/ui"
import {
  CONTACT_FIELD_ORDER,
  EMPTY_CONTACT_FORM,
  validateContactForm,
  validateField,
} from "../../utils/contact-form"

import "../../styles/css/screens/contact.css"

// Payload keys match the column headers of the Google Sheet behind the endpoint.
type ContactFormData = {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  timestamp: string
}

type FieldConfig = {
  field: ContactField
  placeholder: string
  column: string
} & (
  | { control: "input"; type: "text" | "email" | "tel" }
  | { control: "textarea"; rows: number }
)

// Rendered in this order; matches the form's original markup.
const FIELDS: FieldConfig[] = [
  {
    field: ContactField.Name,
    control: "input",
    type: "text",
    placeholder: "Name",
    column: "col-6 col-12-xsmall",
  },
  {
    field: ContactField.Email,
    control: "input",
    type: "email",
    placeholder: "Email",
    column: "col-6 col-12-xsmall",
  },
  {
    field: ContactField.Mobile,
    control: "input",
    type: "tel",
    placeholder: "Mobile",
    column: "col-6 col-12-xsmall",
  },
  {
    field: ContactField.Subject,
    control: "input",
    type: "text",
    placeholder: "Subject",
    column: "col-6 col-12-xsmall",
  },
  {
    field: ContactField.Message,
    control: "textarea",
    rows: 6,
    placeholder: "Enter your message",
    column: "col-12",
  },
]

const FIX_FIELDS_MESSAGE = "Please fix the highlighted fields"

type TouchedFields = Partial<Record<ContactField, boolean>>

function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_CONTACT_FORM)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [formStatusMessage, setFormStatusMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const clearForm = () => {
    setValues(EMPTY_CONTACT_FORM)
    setErrors({})
    setTouched({})
    setSubmitAttempted(false)
  }

  const handleChange = (field: ContactField, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
    // Re-validate live once the field has been visited (or a submit was
    // tried), so the message clears as soon as the value becomes valid.
    if (touched[field] || submitAttempted) {
      const nextErrors = { ...errors, [field]: validateField(field, value) }
      setErrors(nextErrors)
      if (
        formStatusMessage === FIX_FIELDS_MESSAGE &&
        CONTACT_FIELD_ORDER.every(f => !nextErrors[f])
      ) {
        setFormStatusMessage("")
      }
    }
  }

  const handleBlur = (field: ContactField) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }))
  }

  const formReset = () => {
    clearForm()
    setFormStatusMessage("")
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateContactForm(values)
    setErrors(validationErrors)
    setSubmitAttempted(true)
    setTouched(
      Object.fromEntries(
        CONTACT_FIELD_ORDER.map(f => [f, true])
      ) as TouchedFields
    )
    const firstInvalid = CONTACT_FIELD_ORDER.find(f => validationErrors[f])
    if (firstInvalid) {
      const control = e.currentTarget.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      setFormStatusMessage(FIX_FIELDS_MESSAGE)
      return
    }

    setFormStatusMessage("")
    setIsLoading(true)
    const formData: ContactFormData = {
      name: values[ContactField.Name],
      email: values[ContactField.Email],
      mobile: values[ContactField.Mobile],
      subject: values[ContactField.Subject],
      message: values[ContactField.Message],
      // Always in IST, e.g. "4 November 2026 at 9:30 am IST", whatever the
      // visitor's zone. Spelled out so Google Sheets stores it as text
      // instead of re-formatting it as a date.
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      }),
    }

    // The Apps Script expects requestType=POST plus a formData JSON string.
    // The script lowercases the sheet's column headers (Name, Email, Mobile,
    // Subject, Message, Timestamp) before matching, so the keys are sent in
    // lowercase.
    axios({
      method: "post",
      url: siteConfig.contactFormEndpoint,
      data: new URLSearchParams({
        requestType: "POST",
        formData: JSON.stringify(formData),
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then(response => {
        if (response.data?.success === true) {
          clearForm()
          setFormStatusMessage("Form submitted successfully")
        } else {
          console.error("Contact form submission failed", response.data)
          setFormStatusMessage("An error has occurred")
        }
      })
      .catch(error => {
        console.error("Contact form submission failed", error)
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
        <form
          method="post"
          onSubmit={formSubmit}
          onReset={formReset}
          noValidate
        >
          <div className="row gtr-uniform">
            {FIELDS.map(config => {
              const { field } = config
              const error = touched[field] ? errors[field] : undefined
              const errorId = `${field}-error`
              const controlProps = {
                name: field,
                id: field,
                placeholder: config.placeholder,
                value: values[field],
                required: true,
                className: error ? "invalid" : undefined,
                "aria-invalid": Boolean(error) || undefined,
                "aria-describedby": error ? errorId : undefined,
                onBlur: () => handleBlur(field),
              }
              return (
                <div className={config.column} key={field}>
                  {config.control === "textarea" ? (
                    <textarea
                      {...controlProps}
                      rows={config.rows}
                      onChange={e => handleChange(field, e.target.value)}
                    />
                  ) : (
                    <input
                      type={config.type}
                      {...controlProps}
                      onChange={e => handleChange(field, e.target.value)}
                    />
                  )}
                  {error && (
                    <p className="field-message" id={errorId}>
                      {error}
                    </p>
                  )}
                </div>
              )
            })}
            <div
              className="col-12 transition-fade"
              role="status"
              aria-live="polite"
            >
              {formStatusMessage}
            </div>
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
