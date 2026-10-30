// Ambient declarations for packages that ship without TypeScript types.

declare module "postcss-easy-import" {
  const postcssEasyImport: (options?: Record<string, unknown>) => unknown
  export default postcssEasyImport
}
