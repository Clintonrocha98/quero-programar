import type { ReactNode } from 'react'

interface ListaEmCartoesProps {
  variante: 'principio' | 'limite' | 'dica'
  children: ReactNode
}

export function ListaEmCartoes({ variante, children }: ListaEmCartoesProps) {
  return (
    <div className="mentoria-lista" data-layout="grade" data-tom={variante}>
      {children}
    </div>
  )
}
