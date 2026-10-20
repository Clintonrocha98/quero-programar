import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { gruposModelo, modelos, type QuemEnvia } from '@/data/mentoria-modelos'
import type { Papel } from '@/data/mentoria-guias'
import { ModeloCopiavel } from './modelo-copiavel'
import { estiloPapel } from './papel'

type Filtro = Papel | 'todos'

const opcoesFiltro: { id: Filtro; rotulo: string; pontos: QuemEnvia[] }[] = [
  { id: 'todos', rotulo: 'Todos', pontos: ['mentor', 'mentorado'] },
  { id: 'mentor', rotulo: estiloPapel.mentor.rotulo, pontos: ['mentor'] },
  { id: 'mentorado', rotulo: estiloPapel.mentorado.rotulo, pontos: ['mentorado'] },
]

function passaNoFiltro(quemEnvia: QuemEnvia, filtro: Filtro) {
  return filtro === 'todos' || quemEnvia === 'ambos' || quemEnvia === filtro
}

export function ModelosLista() {
  const { hash } = useLocation()
  const [escolha, setEscolha] = useState<{ filtro: Filtro; hash: string }>({ filtro: 'todos', hash })

  const filtro = escolha.hash === hash ? escolha.filtro : 'todos'
  const idDoHash = decodeURIComponent(hash.slice(1))
  const totalVisiveis = modelos.filter((modelo) => passaNoFiltro(modelo.quemEnvia, filtro)).length

  return (
    <div className="not-prose my-8 space-y-8">
      <div className="space-y-2">
        <div
          role="group"
          aria-label="Filtrar por quem envia"
          className="inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-metal-700 bg-metal-950/60 p-1"
        >
          {opcoesFiltro.map((opcao) => {
            const ativo = opcao.id === filtro

            return (
              <button
                key={opcao.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => setEscolha({ filtro: opcao.id, hash })}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
                  ativo ? 'bg-metal-800 text-metal-100 shadow-sm' : 'text-metal-300 hover:bg-metal-800/60 hover:text-metal-100',
                )}
              >
                <span aria-hidden="true" className="flex -space-x-0.5">
                  {opcao.pontos.map((papel) => (
                    <span
                      key={papel}
                      className={cn('h-2 w-2 rounded-full ring-1 ring-metal-950', estiloPapel[papel].ponto)}
                    />
                  ))}
                </span>
                {opcao.rotulo}
              </button>
            )
          })}
        </div>
        <p aria-live="polite" className="text-sm text-metal-300">
          Mostrando {totalVisiveis} de {modelos.length}
        </p>
      </div>

      {gruposModelo.map((grupo) => {
        const modelosDoGrupo = modelos.filter((modelo) => modelo.grupo === grupo.id)
        const grupoSemVisiveis = !modelosDoGrupo.some((modelo) => passaNoFiltro(modelo.quemEnvia, filtro))

        return (
          <section
            key={grupo.id}
            hidden={grupoSemVisiveis}
            aria-labelledby={`grupo-${grupo.id}`}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h3 id={`grupo-${grupo.id}`} className="scroll-mt-24 text-xl font-bold text-metal-100">
                {grupo.titulo}
              </h3>
              <p className="text-sm text-metal-300">{grupo.descricao}</p>
            </div>

            <div className="space-y-4">
              {modelosDoGrupo.map((modelo) => (
                <ModeloCopiavel
                  key={modelo.id}
                  modelo={modelo}
                  hidden={!passaNoFiltro(modelo.quemEnvia, filtro)}
                  abertoInicialmente={modelo.id === idDoHash}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
