import React, { useState } from "react"
import "../../styles/css/components/core/tooltip.css"

const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={`tooltip tooltip-${position}`}>{text}</div>}
    </div>
  )
}

export default Tooltip
