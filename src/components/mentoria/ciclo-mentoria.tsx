import { Link } from 'react-router-dom'
import { Repeat } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRevelarAoRolar } from '@/hooks/use-revelar-ao-rolar'
import { gruposModelo, modelos } from '@/data/mentoria-modelos'
import { frequenciaAberta } from '@/data/mentoria-guias'

interface CicloMentoriaProps {
  destino: 'pagina-modelos' | 'mesma-pagina'
  titulo?: string
}

const atrasoConector = ['0ms', '150ms', '300ms']

function contarModelos(quantidade: number) {
  return quantidade === 1 ? '1 modelo' : `${quantidade} modelos`
}

function Etapas({ destino }: Pick<CicloMentoriaProps, 'destino'>) {
  const { ref, revelado } = useRevelarAoRolar<HTMLOListElement>()

  return (
    <ol ref={ref} data-revelado={revelado} className="group grid gap-2 md:grid-cols-4 md:gap-4">
      {gruposModelo.map((grupo, indice) => {
        const quantidade = modelos.filter((modelo) => modelo.grupo === grupo.id).length
        const temProxima = indice < gruposModelo.length - 1
        const etapaQueRepete = grupo.id === 'sessao'
        const alvo = destino === 'pagina-modelos' ? `/mentoria/modelos#grupo-${grupo.id}` : `#grupo-${grupo.id}`
        const preenchimento = cn(
          'absolute inset-0 bg-gradient-to-r from-steel-blue-light to-cyan-accent transition-transform duration-300 ease-out',
          'motion-safe:group-data-[revelado=true]:scale-100',
        )

        return (
          <li key={grupo.id} className="relative">
            {temProxima && (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-2 left-[1.3125rem] w-0.5 overflow-hidden bg-metal-700 md:hidden',
                    etapaQueRepete ? 'top-[3.5rem]' : 'top-[2.75rem]',
                  )}
                >
                  <span
                    className={cn(preenchimento, 'origin-top bg-gradient-to-b motion-safe:scale-y-0')}
                    style={{ transitionDelay: atrasoConector[indice] }}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -right-4 top-[1.3125rem] hidden h-0.5 overflow-hidden bg-metal-700 md:block',
                    etapaQueRepete ? 'left-[4.25rem]' : 'left-[2.75rem]',
                  )}
                >
                  <span
                    className={cn(preenchimento, 'origin-left motion-safe:scale-x-0')}
                    style={{ transitionDelay: atrasoConector[indice] }}
                  />
                </span>
              </>
            )}

            <Link
              to={alvo}
              className={cn(
                'flex gap-3 rounded-lg p-2 !no-underline transition-colors hover:bg-metal-800/40 md:flex-col',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
              )}
            >
              <span className="flex w-7 flex-shrink-0 flex-col items-center gap-1 md:w-auto md:flex-row md:gap-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-steel-blue-light/60 bg-metal-900 text-sm font-semibold tabular-nums text-metal-100">
                  {indice + 1}
                </span>
                {etapaQueRepete && (
                  <Repeat
                    aria-hidden="true"
                    className="h-4 w-4 text-cyan-accent motion-safe:group-data-[revelado=true]:animate-girar-uma-vez"
                    style={{ animationDelay: '450ms' }}
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-col gap-1 font-normal">
                <span className="font-semibold text-metal-100">{grupo.titulo}</span>
                <span className="text-sm leading-relaxed text-metal-300">{grupo.descricao}</span>
                {etapaQueRepete && (
                  <span className="text-sm leading-relaxed text-metal-300">{frequenciaAberta}</span>
                )}
                <span className="text-xs text-metal-300">{contarModelos(quantidade)}</span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export function CicloMentoria({ destino, titulo }: CicloMentoriaProps) {
  if (!titulo) {
    return (
      <nav aria-label="Etapas da mentoria" className="not-prose my-8">
        <Etapas destino={destino} />
      </nav>
    )
  }

  return (
    <section aria-labelledby="ciclo-mentoria-titulo" className="not-prose space-y-4">
      <h2 id="ciclo-mentoria-titulo" className="text-xl font-bold text-metal-100 sm:text-2xl">
        {titulo}
      </h2>
      <Etapas destino={destino} />
    </section>
  )
}
