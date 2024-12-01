import React, { useState } from "react"
import "../../styles/css/components/core/accordion.css"
import { FaChevronDown } from "react-icons/fa"

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span className="accordion-icon">
              <FaChevronDown />
            </span>
          </div>
          <div
            className={`accordion-content ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
