import React from "react"

function HorizontalLine({ color, margin }) {
  if (margin == "") {
    margin = "30px"
  }
  return (
    <hr
      style={{
        backgroundColor: color,
        height: 2,
        margin: margin + " 0",
      }}
    />
  )
}

export default HorizontalLine
