import React from "react"

function HorizontalLine({ color }) {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: 2,
      }}
    />
  )
}

export default HorizontalLine
