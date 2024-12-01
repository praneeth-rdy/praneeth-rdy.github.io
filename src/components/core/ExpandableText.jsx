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

  return (
    <p className={`expandable-text-container ${className}`}>
      {displayText}
      {shouldTruncate && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="expandable-text"
        >
          {isExpanded ? "read less" : "read more"}
        </span>
      )}
    </p>
  )
}
