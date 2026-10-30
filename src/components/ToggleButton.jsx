import React from "react"
import "../styles/css/components/toggle-button.css"

function Toggle({ darkMode, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`toggle${darkMode ? " night" : ""}`}
      aria-hidden="true"
    >
      <div className="notch">
        {/* <div className="crater" />
                <div className="crater" /> */}
      </div>
      {/* <div>
                <div className="shape sm" />
                <div className="shape sm" />
                <div className="shape md" />
                <div className="shape lg" />
            </div> */}
    </div>
  )
}

export default Toggle
