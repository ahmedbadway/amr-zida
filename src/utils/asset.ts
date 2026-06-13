// Resolve a public asset path against Vite's BASE_URL so images and videos
// load correctly under both root and sub-path (e.g. GitHub Pages) deploys.
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
