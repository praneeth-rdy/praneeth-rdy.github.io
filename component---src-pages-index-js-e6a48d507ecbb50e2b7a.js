"use strict";(self.webpackChunkpraneeth_rdy_github_io=self.webpackChunkpraneeth_rdy_github_io||[]).push([[678],{6076:function(e,t,a){var n=a(7294);t.Z=function(e){let{color:t,margin:a}=e;return""===a&&(a="30px"),n.createElement("hr",{style:{backgroundColor:t,height:2,margin:a+" 0"}})}},7105:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var n=a(7294),r=a(5444),s=a(2729),c=a(6179),l=a(6076),o=a(6125),i=a(3201);function m(e){let{darkModeImage:t,lightModeImage:a,data:r,isDarkMode:s}=e;const c=r.site.siteMetadata.social,l=r.site.siteMetadata.authorFullName;return n.createElement("section",{className:"page-head intro-section"},n.createElement("div",{className:"intro-text"},n.createElement("div",null,n.createElement("h3",null,"Hello, I'm"),n.createElement("h1",null,l),n.createElement("h3",{className:"designation"},"Passionate Full Stack Developer"),n.createElement("a",{className:"link button grow",href:"19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf",download:"19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf"},"Download Resume"),n.createElement("div",{className:"icons-container"},n.createElement("a",{href:c.github,target:"_blank",className:"link",rel:"noreferrer"},n.createElement(i.hJX,{className:"icon",target:"_blank"})),n.createElement("a",{href:c.linkedin,target:"_blank",className:"link",rel:"noreferrer"},n.createElement(i.ltd,{className:"icon",target:"_blank"})),n.createElement("a",{href:c.facebook,target:"_blank",className:"link",rel:"noreferrer"},n.createElement(i.Am9,{className:"icon",target:"_blank"})),n.createElement("a",{href:"mailto:"+c.email,target:"_blank",className:"link",rel:"noreferrer"},n.createElement(i.SRX,{className:"icon"}))))),n.createElement(o.G,{className:"intro-image",image:s?t:a,style:{width:"400px"},alt:"Intro Image"}))}var d=e=>n.createElement(r.StaticQuery,{query:"3490982964",render:t=>n.createElement(m,Object.assign({props:!0,data:t},e))});var p=function(e){let{image:t}=e;return n.createElement("section",{className:"home-section post-content-body"},n.createElement("h2",{className:"section-heading"},"About"),n.createElement("div",{className:"about-content row"},n.createElement("figure",{className:"about-image"},n.createElement(o.G,{image:t,style:{borderRadius:"8px"},alt:"About Image"})),n.createElement("div",{className:"about-description"},n.createElement("p",null,"My name is Praneeth Reddy Kolanu, and I am a passionate problem solver who enjoys tackling complex challenges through a unique blend of technical expertise, business acumen, and project management skills."),n.createElement("p",null,"With a strong background in software engineering and business management, I am driven by a desire to leverage technology for the greater good. Whether it's building innovative software applications or contributing to open-source projects, I am always seeking new ways to make a positive impact on society."),n.createElement("p",null,"In my free time, I enjoy exploring new technologies, mastering data structures and algorithms, and honing my problem-solving skills. I am always up for a challenge and thrive in dynamic, fast-paced environments."))))};function g(e){let{data:t,isDarkMode:a}=e;const r=t.dataJson.skills;return n.createElement("section",{className:"home-section post-content-body"},n.createElement("h2",{className:"section-heading"},"Skillset"),n.createElement("div",{className:"skillset-section-module--skillCardsContainer--3goil"},r&&r.map(((e,t)=>{const r=a?e.darkModeLogo:e.lightModeLogo;return n.createElement("div",{key:t,className:"skillset-section-module--skillCard--+6nf+"},r.childImageSharp.gatsbyImageData&&n.createElement(o.G,{image:r.childImageSharp.gatsbyImageData,style:{borderRadius:"8px"},alt:"Skill Logo"}))}))))}var u=e=>n.createElement(r.StaticQuery,{query:"4135437569",render:t=>n.createElement(g,Object.assign({props:!0,data:t},e))});var h=e=>{let{children:t,text:a,position:r="top"}=e;const{0:s,1:c}=(0,n.useState)(!1);return n.createElement("div",{className:"tooltip-container",onMouseEnter:()=>{c(!0)},onMouseLeave:()=>{c(!1)},role:"tooltip"},t,s&&n.createElement("div",{className:`tooltip tooltip-${r}`},a))};function E(e){const{children:t,className:a,charLimit:r=100}=e,{0:s,1:c}=(0,n.useState)(!1),l=(null==t?void 0:t.toString())||"",o=l.length>r,i=o&&!s?l.slice(0,r).trim()+"...":l,m=()=>{c((e=>!e))};return n.createElement("p",{className:`expandable-text-container ${a}`},i,o&&n.createElement("span",{onClick:m,onKeyPress:e=>{"Enter"!==e.key&&" "!==e.key||m()},role:"button",tabIndex:0,className:"expandable-text"},s?"read less":"read more"))}const y="Completed",b="Present";function N(e){let{data:t}=e;const{0:a,1:r}=(0,n.useState)(!1),s=t.dataJson.experience;if(!s)return null;const c=a?s:s.slice(0,4),l=e=>{switch(e){case y:return"experience-status-tag-completed";case b:return"experience-status-tag-present";default:return""}},m=e=>{switch(e.toLowerCase()){case"position of responsibility":return"experience-type-tag-por";case"opensource":return"experience-type-tag-opensource";default:return""}},d=e=>{switch(e.toLowerCase()){case"position of responsibility":return"This experience is a Position of Responsibility at IIT Kharagpur";case"opensource":return"This experience is an Open Source Contribution";default:return""}};return n.createElement("section",{className:"home-section post-content-body"},n.createElement("h2",{className:"section-heading"},n.createElement("span",null,"Experience")),n.createElement("div",{className:"experience-container"},c.map(((e,t)=>n.createElement("div",{className:"experience-card b-shadow-card",key:t},n.createElement("div",{className:"experience-frontmatter-container"},n.createElement("span",{className:`experience-status-tag ${l(e.status)}`},e.status)),n.createElement("div",{className:"experience-header"},n.createElement("div",{className:"experience-org-container"},n.createElement("h3",{className:"experience-title"},e.org),e.orgLogo&&n.createElement(o.G,{image:e.orgLogo.childImageSharp.gatsbyImageData,alt:e.org,className:"experience-org-logo"}),!e.type&&e.returnOffer&&n.createElement(h,{text:"Received a return offer",position:"top"},n.createElement("span",{className:"experience-trophy"},n.createElement(i.QJe,{size:16})))),n.createElement("div",{className:"experience-header-tags"},e.type&&n.createElement(h,{text:d(e.type),position:"top"},n.createElement("span",{className:`experience-type-tag ${m(e.type)}`},e.type)),e.type&&e.returnOffer&&n.createElement(h,{text:"Received a return offer",position:"top"},n.createElement("span",{className:"experience-trophy"},n.createElement(i.QJe,{size:16}))))),n.createElement(E,{className:"experience-description",charLimit:120},e.description),n.createElement("div",{className:"experience-tags-container"},e.tags.map(((e,t)=>n.createElement("span",{className:"experience-tag",key:t},e)))),n.createElement("div",{className:"experience-roles-container"},e.roles.map(((e,t)=>n.createElement("div",{className:"experience-role",key:t},n.createElement("h4",{className:"experience-role-title"},e.title),n.createElement("p",{className:"experience-role-duration"},e.start,e.end&&` - ${e.end}`))))))))),s.length>4&&n.createElement("div",{className:"text-center experience-expand-container"},n.createElement("button",{className:"primary experience-expand-button",onClick:()=>{r((e=>!e))}},a?"Show Less":"Show More")))}var k=e=>n.createElement(r.StaticQuery,{query:"2884141188",render:t=>n.createElement(N,Object.assign({props:!0,data:t},e))}),f=a(2775);function v(e){let{data:t}=e;const{0:a,1:r}=(0,n.useState)(!1),s=t.dataJson.projects,c=a?s:s.slice(0,2);return n.createElement("section",{className:"home-section post-content-body"},n.createElement("h2",{className:"section-heading"},"Projects"),n.createElement("div",{className:"projects-section-module--projectCardsContainer--PaCzW"},c.map(((e,t)=>n.createElement("div",{key:t,className:"projects-section-module--card--vwkXR 'b-shadow' 'grow'"},n.createElement("div",{className:"projects-section-module--cardImage--V-AlC"},n.createElement(o.G,{image:e.thumbnail.childImageSharp.gatsbyImageData,alt:`${e.title} Image`})),n.createElement("div",{className:"projects-section-module--body--j07Pe"},n.createElement("div",{className:"projects-section-module--headingContainer--kB7Ng"},n.createElement("h3",{className:"projects-section-module--heading--4AjE6"},e.title),e.associatedWith.logo&&n.createElement(h,{text:`This project is associated with ${e.associatedWith.org}`,position:"top"},n.createElement("img",{src:e.associatedWith.logo.childImageSharp.gatsbyImageData.images.fallback.src,alt:e.associatedWith.org,className:"projects-section-module--orgLogo--toQDx"})),e.confidential&&n.createElement(h,{text:"Confidential information is hidden",position:"top"},n.createElement("span",{className:"projects-section-module--confidentialIcon--uLCD1"},n.createElement(f.AXp,{size:16})))),n.createElement("div",{className:"projects-section-module--descriptionContainer--i7jPI"},n.createElement(E,{className:"projects-section-module--cardDescription--3k1K7",charLimit:300},e.description)),n.createElement("div",{className:"projects-section-module--additionalInfo--AyrEu"},n.createElement("div",{className:"projects-section-module--stacksContainer--FFVrB"},e.stacks.map(((e,t)=>{let{childImageSharp:a}=e;return n.createElement(o.G,{key:t,className:"projects-section-module--stack--Lfztq",image:a.gatsbyImageData,alt:"Stack Image",objectFit:"contain"})}))),n.createElement("div",{className:"icons-container projects-section-module--projectLinks--sEqZm"},e.attachments.repository&&n.createElement("a",{className:"link",href:e.attachments.repository,target:"_blank",rel:"noreferrer"},n.createElement(i.hJX,null)),e.attachments.documentation&&n.createElement("a",{className:"link",href:e.attachments.documentation,target:"_blank",rel:"noreferrer"},n.createElement(i.uYZ,null)),e.attachments.site&&n.createElement("a",{className:"link",href:e.attachments.site,target:"_blank",rel:"noreferrer"},n.createElement(i.gjK,null))))))))),s.length>2&&n.createElement("div",{className:"text-center projects-expand-container"},n.createElement("button",{className:"primary projects-expand-button",onClick:()=>{r((e=>!e))}},a?"Show Less":"Show More")))}var x=e=>n.createElement(r.StaticQuery,{query:"2391164903",render:t=>n.createElement(v,Object.assign({props:!0,data:t},e))}),I=a(9589);const j=(e,t)=>{let{data:a}=e;const r=a.site.siteMetadata.navHeading,o=a.darkModeImage.childImageSharp.gatsbyImageData,i=a.lightModeImage.childImageSharp.gatsbyImageData,m=a.aboutPic.childImageSharp.gatsbyImageData;return n.createElement(I.Z,null,n.createElement(s.Z,{navHeading:r,path:"/"},n.createElement(c.Z,{title:"Home",keywords:["blog","gatsby","javascript","react"]}),n.createElement(d,{darkModeImage:o,lightModeImage:i}),n.createElement(l.Z,{color:"rgba(0, 0, 0, 0.5)"}),n.createElement(p,{image:m}),n.createElement(k,null),n.createElement(x,null),n.createElement(u,null)))};var w=e=>n.createElement(r.StaticQuery,{query:"3616611468",render:t=>n.createElement(j,Object.assign({location:e.location,props:!0,data:t},e))})}}]);
//# sourceMappingURL=component---src-pages-index-js-e6a48d507ecbb50e2b7a.js.map