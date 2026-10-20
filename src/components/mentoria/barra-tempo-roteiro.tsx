import { cn } from '@/lib/utils'
import { ajudaRoteiro, type DuracaoSessao } from '@/data/mentoria-roteiro'
import type { BlocoComFaixa } from '@/lib/mentoria-roteiro'

interface BarraTempoRoteiroProps {
  faixas: BlocoComFaixa[]
  duracao: DuracaoSessao
  marcados: Record<string, boolean>
}

export function BarraTempoRoteiro({ faixas, duracao, marcados }: BarraTempoRoteiroProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm leading-relaxed text-metal-300">{ajudaRoteiro.marcar}</p>
      <div aria-hidden="true" className="space-y-1">
        <div className="flex h-6 gap-0.5 overflow-hidden rounded-md">
          {faixas.map(({ bloco }) => {
            const minutos = bloco.minutos[duracao]
            const marcado = !!marcados[bloco.id]

            return (
              <div
                key={bloco.id}
                style={{ flexGrow: minutos }}
                className={cn(
                  'flex min-w-0 basis-0 items-center justify-center text-[11px] font-semibold tabular-nums',
                  'transition-[flex-grow,background-color,color] duration-300 ease-out motion-reduce:transition-none',
                  marcado ? 'bg-steel-blue-light text-metal-950' : 'bg-metal-700 text-metal-200',
                )}
              >
                {minutos}
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-metal-300">
          <span>0 min</span>
          <span>{duracao} min</span>
        </div>
      </div>
    </div>
  )
}
