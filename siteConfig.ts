const siteConfig = {
  name: "Praneeth Reddy",
  shortName: "praneeth-rdy",
  fullName: "Praneeth Reddy Kolanu",
  author: "Praneeth Kolanu",
  description:
    "Success is not how much money we make, it's the difference we bring in peoples' lives",
  // Short first-person introduction shown on the home page.
  bio: "I'm a software engineer and problem solver who enjoys turning complex challenges into useful software. My work brings together engineering, business thinking and project leadership.",
  url: "https://praneeth-rdy.github.io", // Domain of your site without prefix!
  prefix: "/",
  github: "https://github.com/praneeth-rdy",
  linkedin: "https://www.linkedin.com/in/praneeth-rdy/",
  facebook: "https://www.facebook.com/praneeth.kolanu/",
  email: "praneeth.kolanu.iitkgp@gmail.com",
  // Google Apps Script web app that appends a row to a Google Sheet; it expects requestType=POST and a formData JSON string keyed by the sheet's column headers.
  contactFormEndpoint:
    "https://script.google.com/macros/s/AKfycbylArxN264hjKzKJAUfUcCIUt-TLzMhfWMnM2ARyem8RZJxmNpQZGFJ06TovsJAlTwavA/exec",
} as const

export default siteConfig
