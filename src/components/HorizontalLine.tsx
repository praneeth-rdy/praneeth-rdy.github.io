import React from "react"

interface HorizontalLineProps {
  color?: string
  margin?: string
}

function HorizontalLine({ color, margin }: HorizontalLineProps) {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: 2,
        ...(margin ? { margin: `${margin} 0` } : {}),
      }}
    />
  )
}

export default HorizontalLine
