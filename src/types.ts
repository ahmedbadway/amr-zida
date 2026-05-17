export type Page = 'home' | 'projects' | 'contact'

export interface Project {
  id: number
  title: string
  tag: string
  year: string
  location: string
  description: string
  img: string
}

export interface PageProps {
  onNav: (p: Page) => void
}
