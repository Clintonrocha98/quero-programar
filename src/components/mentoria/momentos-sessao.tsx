import {
  Children,
  isValidElement,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Papel } from '@/data/mentoria-guias'

type IdMomento = 'antes' | 'durante' | 'depois'

interface MomentosSessaoProps {
  rotulo: string
  tom?: Papel
  children: ReactNode
}

interface MomentoSessaoProps {
  id: IdMomento
  children: ReactNode
}

const rotulosMomento: Record<IdMomento, string> = {
  antes: 'Antes',
  durante: 'Durante',
  depois: 'Depois',
}

const progressoPorIndice = ['0%', '50%', '100%']

const corDoTom: Record<Papel, string> = {
  mentor: 'var(--steel-blue-light)',
  mentorado: 'var(--cyan-accent)',
}

export function MomentoSessao({ children }: MomentoSessaoProps) {
  return <>{children}</>
}

export function MomentosSessao({ rotulo, tom = 'mentor', children }: MomentosSessaoProps) {
  const [indiceAtivo, setIndiceAtivo] = useState(0)
  const abasRef = useRef<(HTMLButtonElement | null)[]>([])

  const momentos = Children.toArray(children).filter(
    (filho): filho is ReactElement<MomentoSessaoProps> => isValidElement(filho) && filho.type === MomentoSessao,
  )
  const ultimoIndice = momentos.length - 1
  const anterior = indiceAtivo > 0 ? momentos[indiceAtivo - 1] : null
  const proximo = indiceAtivo < ultimoIndice ? momentos[indiceAtivo + 1] : null
  const estiloTom = { '--tom-lista': corDoTom[tom] } as CSSProperties

  const ativar = (indice: number) => {
    setIndiceAtivo(indice)
    abasRef.current[indice]?.focus()
  }

  const navegarComTeclado = (evento: KeyboardEvent<HTMLDivElement>) => {
    const destinos: Record<string, number> = {
      ArrowRight: indiceAtivo === ultimoIndice ? 0 : indiceAtivo + 1,
      ArrowLeft: indiceAtivo === 0 ? ultimoIndice : indiceAtivo - 1,
      Home: 0,
      End: ultimoIndice,
    }
    const destino = destinos[evento.key]

    if (destino === undefined) {
      return
    }

    evento.preventDefault()
    ativar(destino)
  }

  return (
    <div className="not-prose my-6 rounded-lg border border-metal-700 bg-metal-900/40" style={estiloTom}>
      <div className="relative px-4 pt-5 sm:px-6">
        <div aria-hidden="true" className="absolute left-10 right-10 top-[2.375rem] h-0.5 bg-metal-700 sm:left-12 sm:right-12">
          <div
            className="h-full transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: progressoPorIndice[indiceAtivo], backgroundColor: 'var(--tom-lista)' }}
          />
        </div>

        <div
          role="tablist"
          aria-label={rotulo}
          onKeyDown={navegarComTeclado}
          className="relative grid grid-cols-3 items-center"
        >
          {momentos.map((momento, indice) => {
            const id = momento.props.id
            const ativo = indice === indiceAtivo
            const alcancado = indice <= indiceAtivo
            const ehSessao = id === 'durante'

            return (
              <button
                key={id}
                ref={(elemento) => {
                  abasRef.current[indice] = elemento
                }}
                id={`momento-${id}-aba`}
                type="button"
                role="tab"
                aria-selected={ativo}
                aria-controls={`momento-${id}-painel`}
                tabIndex={ativo ? 0 : -1}
                onClick={() => setIndiceAtivo(indice)}
                className={cn(
                  'group flex flex-col items-center gap-2 rounded-lg px-1 py-1 text-sm font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
                  indice === 0 && 'items-start',
                  indice === ultimoIndice && 'items-end',
                  ativo ? 'text-metal-100' : 'text-metal-300 hover:text-metal-100',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'block border-2 transition-colors duration-300 motion-reduce:transition-none',
                    ehSessao ? 'h-7 w-14 rounded-md' : 'h-7 w-7 rounded-full',
                    alcancado ? 'bg-metal-900' : 'border-metal-600 bg-metal-900',
                  )}
                  style={alcancado ? { borderColor: 'var(--tom-lista)', backgroundColor: ativo ? 'var(--tom-lista)' : undefined } : undefined}
                />
                {rotulosMomento[id]}
              </button>
            )
          })}
        </div>
      </div>

      {momentos.map((momento, indice) => {
        const id = momento.props.id
        const ativo = indice === indiceAtivo

        return (
          <div
            key={id}
            id={`momento-${id}-painel`}
            role="tabpanel"
            aria-labelledby={`momento-${id}-aba`}
            tabIndex={0}
            hidden={!ativo}
            className="rounded-b-lg px-4 pb-4 pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-steel-blue-light sm:px-6"
          >
            <div className="mentoria-lista space-y-4 motion-safe:animate-surgir" data-layout="linhas">
              {momento.props.children}
            </div>
          </div>
        )
      })}

      <div className="flex flex-wrap justify-between gap-2 border-t border-metal-700/60 px-4 py-3 sm:px-6">
        {anterior ? (
          <button
            type="button"
            onClick={() => setIndiceAtivo(indiceAtivo - 1)}
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-steel-blue-light transition-colors hover:text-cyan-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Anterior: {rotulosMomento[anterior.props.id]}
          </button>
        ) : (
          <span />
        )}
        {proximo && (
          <button
            type="button"
            onClick={() => setIndiceAtivo(indiceAtivo + 1)}
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-steel-blue-light transition-colors hover:text-cyan-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light"
          >
            Próximo: {rotulosMomento[proximo.props.id]}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
