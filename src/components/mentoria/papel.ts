import type { QuemEnvia } from '@/data/mentoria-modelos'

interface EstiloPapel {
  rotulo: string
  texto: string
  borda: string
  bordaEsquerda: string
  fundo: string
  ponto: string
}

export const estiloPapel: Record<QuemEnvia, EstiloPapel> = {
  mentor: {
    rotulo: 'Quem mentora',
    texto: 'text-steel-blue-light',
    borda: 'border-steel-blue-light',
    bordaEsquerda: 'border-l-steel-blue-light',
    fundo: 'bg-steel-blue/15',
    ponto: 'bg-steel-blue-light',
  },
  mentorado: {
    rotulo: 'Quem é mentorado',
    texto: 'text-cyan-accent',
    borda: 'border-cyan-accent',
    bordaEsquerda: 'border-l-cyan-accent',
    fundo: 'bg-cyan-accent/10',
    ponto: 'bg-cyan-accent',
  },
  ambos: {
    rotulo: 'Os dois',
    texto: 'text-metal-200',
    borda: 'border-metal-500',
    bordaEsquerda: 'border-l-metal-500',
    fundo: 'bg-metal-800/60',
    ponto: 'bg-metal-200',
  },
}
