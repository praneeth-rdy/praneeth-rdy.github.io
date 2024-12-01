import React, { useState } from "react"

export default function ExpandableText(props) {
  const { children, className, charLimit = 100 } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const text = children?.toString() || ""
  const shouldTruncate = text.length > charLimit
  const displayText =
    shouldTruncate && !isExpanded
      ? text.slice(0, charLimit).trim() + "..."
      : text

  const toggleExpand = () => {
    setIsExpanded(current => !current)
  }

  return (
    <p className={`expandable-text-container ${className}`}>
      {displayText}
      {shouldTruncate && (
        <span
          onClick={toggleExpand}
          onKeyPress={e => {
            if (e.key === "Enter" || e.key === " ") {
              toggleExpand()
            }
          }}
          role="button"
          tabIndex={0}
          className="expandable-text"
        >
          {isExpanded ? "read less" : "read more"}
        </span>
      )}
    </p>
  )
}
