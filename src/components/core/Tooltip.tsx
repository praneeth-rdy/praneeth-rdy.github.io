import React, { useId, useState } from "react"
import "../../styles/css/components/core/tooltip.css"
import { TooltipPosition, type WithChildren } from "../../types/ui"

// The container is focusable so keyboard users can reveal the tooltip; it has
// no widget role of its own, which these two rules would otherwise flag.
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */

interface TooltipProps extends WithChildren {
  text: React.ReactNode
  position?: TooltipPosition
}

const Tooltip = ({
  children,
  text,
  position = TooltipPosition.Top,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const id = useId()

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") hide()
  }

  return (
    <div
      className="tooltip-container"
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      aria-describedby={isVisible ? id : undefined}
    >
      {children}
      {isVisible && (
        <div id={id} role="tooltip" className={`tooltip tooltip-${position}`}>
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
