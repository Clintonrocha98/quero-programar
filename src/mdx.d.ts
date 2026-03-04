declare module '*.mdx' {
  import type { ComponentType } from 'react'
  
  export const frontmatter: {
    id: string
    title: string
    description: string
    icon: string
    color: string
  }

  const MDXComponent: ComponentType
  export default MDXComponent
}
