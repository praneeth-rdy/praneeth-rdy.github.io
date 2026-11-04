// Client-side validation rules for the contact form (ContactForm.tsx). Every
// value is trimmed before it is checked. Each rule returns the message shown
// under the field, or undefined when the value passes.

import {
  ContactField,
  type ContactFormErrors,
  type ContactFormValues,
} from "../types/ui"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Applied after spaces, dashes, dots and parentheses are stripped.
const MOBILE_PATTERN = /^\+?\d{7,15}$/
const MOBILE_SEPARATORS = /[\s\-.()]/g

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  [ContactField.Name]: "",
  [ContactField.Email]: "",
  [ContactField.Mobile]: "",
  [ContactField.Subject]: "",
  [ContactField.Message]: "",
}

/** Fields in document order; used to validate all and to focus the first error. */
export const CONTACT_FIELD_ORDER: ContactField[] = [
  ContactField.Name,
  ContactField.Email,
  ContactField.Mobile,
  ContactField.Subject,
  ContactField.Message,
]

export function validateField(
  field: ContactField,
  value: string
): string | undefined {
  const trimmed = value.trim()
  switch (field) {
    case ContactField.Name:
      if (!trimmed) return "Please enter your name"
      if (trimmed.length < 2 || trimmed.length > 80)
        return "Name should be 2 to 80 characters"
      return undefined
    case ContactField.Email:
      if (!trimmed) return "Please enter your email address"
      if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address"
      return undefined
    case ContactField.Mobile:
      if (!trimmed) return "Please enter your mobile number"
      if (!MOBILE_PATTERN.test(trimmed.replace(MOBILE_SEPARATORS, "")))
        return "Enter a valid mobile number (7 to 15 digits)"
      return undefined
    case ContactField.Subject:
      if (!trimmed) return "Please add a subject"
      if (trimmed.length < 3 || trimmed.length > 120)
        return "Subject should be 3 to 120 characters"
      return undefined
    case ContactField.Message:
      if (!trimmed) return "Please write a message"
      if (trimmed.length < 10) return "Message should be at least 10 characters"
      if (trimmed.length > 2000)
        return "Message should be under 2000 characters"
      return undefined
  }
}

export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {}
  for (const field of CONTACT_FIELD_ORDER) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
