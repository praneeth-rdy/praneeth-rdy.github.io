// CSS modules are imported as `import * as Styles from "...module.css"`, so
// each class name is a named export.
declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export = classes
}
