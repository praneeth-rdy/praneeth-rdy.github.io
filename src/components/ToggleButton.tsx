import React from "react"
import "../styles/css/components/toggle-button.css"

interface ToggleProps {
  darkMode: boolean
  onClick: () => void
}

function Toggle({ darkMode, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`toggle${darkMode ? " night" : ""}`}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
    >
      <span className="notch" />
    </button>
  )
}

export default Toggle
