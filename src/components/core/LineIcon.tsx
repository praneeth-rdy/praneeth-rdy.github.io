import React from "react"
import { LineIconName } from "../../types/ui"

interface LineIconProps {
  name: LineIconName
}

// Decorative stroke icons from the home page concept. Size and colour come
// from the surrounding CSS (currentColor); they are hidden from assistive
// technology because the adjacent text carries the meaning.
function LineIcon({ name }: LineIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === LineIconName.Arrow && <path d="M5 12h14m-6-6 6 6-6 6" />}
      {name === LineIconName.Star && (
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" />
      )}
      {name === LineIconName.Code && (
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
      )}
      {name === LineIconName.Fork && (
        <>
          <circle cx="6" cy="4" r="2" />
          <circle cx="18" cy="4" r="2" />
          <circle cx="12" cy="20" r="2" />
          <path d="M6 6v4l6 4 6-4V6m-6 8v4" />
        </>
      )}
      {name === LineIconName.Camera && (
        <>
          <path d="M3 7h5l2-3h4l2 3h5v13H3Z" />
          <circle cx="12" cy="13" r="4" />
        </>
      )}
      {name === LineIconName.Sun && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
      )}
      {name === LineIconName.Moon && (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      )}
    </svg>
  )
}

export default LineIcon
