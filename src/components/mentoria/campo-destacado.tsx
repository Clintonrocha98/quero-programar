import type { ReactNode } from 'react'

interface CampoDestacadoProps {
  children: ReactNode
}

export function CampoDestacado({ children }: CampoDestacadoProps) {
  return <mark className="rounded bg-amber-accent/15 px-0.5 text-amber-accent">{children}</mark>
}
