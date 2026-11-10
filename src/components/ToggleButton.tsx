import React from "react"
import LineIcon from "./core/LineIcon"
import { LineIconName } from "../types/ui"
import "../styles/css/components/toggle-button.css"

interface ToggleProps {
  darkMode: boolean
  onClick: () => void
}

// Theme switch: shows the mode it switches to (moon in light mode, sun in
// dark mode).
function Toggle({ darkMode, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="toggle"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
    >
      <LineIcon name={darkMode ? LineIconName.Sun : LineIconName.Moon} />
    </button>
  )
}

export default Toggle
