import React, { useState } from "react"
import "../../styles/css/components/core/tooltip.css"

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      role="tooltip"
    >
      {children}
      {isVisible && <div className={`tooltip tooltip-${position}`}>{text}</div>}
    </div>
  )
}

export default Tooltip
