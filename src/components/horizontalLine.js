import React from "react"

function HorizontalLine({ color }) {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: 2,
        margin: "30px 0",
      }}
    />
  )
}

export default HorizontalLine
