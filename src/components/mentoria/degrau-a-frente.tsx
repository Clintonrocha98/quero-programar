import { useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { exemplosPassoAFrente, type Papel } from '@/data/mentoria-guias'

interface DegrauAFrenteProps {
  perspectiva: Papel | 'neutra'
  disposicao?: 'empilhada' | 'lado-a-lado'
  children?: ReactNode
  className?: string
}

const rotulosPorPerspectiva: Record<DegrauAFrenteProps['perspectiva'], { atras: string; aFrente: string }> = {
  neutra: { atras: 'Quem está passando', aFrente: 'Quem já passou' },
  mentor: { atras: 'Quem está passando', aFrente: 'Você' },
  mentorado: { atras: 'Você', aFrente: 'Quem já passou' },
}

function Marcador({ rotulo, cor }: { rotulo: string; cor: string }) {
  return (
    <span
      className="mb-2 flex items-start gap-1.5 pr-1 text-sm font-semibold leading-snug text-metal-100 motion-safe:animate-pousar"
      style={{ animationDelay: '520ms' }}
    >
      <span className={cn('mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full', cor)} />
      {rotulo}
    </span>
  )
}

export function DegrauAFrente({ perspectiva, disposicao = 'empilhada', children, className }: DegrauAFrenteProps) {
  const [exemploId, setExemploId] = useState(exemplosPassoAFrente[0].id)

  const exemplo = exemplosPassoAFrente.find((item) => item.id === exemploId) ?? exemplosPassoAFrente[0]
  const rotulos = rotulosPorPerspectiva[perspectiva]
  const temLista = !!children
  const ladoALado = !temLista && disposicao === 'lado-a-lado'

  return (
    <figure
      className={cn(
        'not-prose my-8 grid gap-4',
        temLista && 'md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:grid-rows-[auto_auto_1fr] md:gap-x-12',
        ladoALado && 'md:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:gap-x-12',
        className,
      )}
    >
      <div
        className={cn(
          'w-full',
          ladoALado ? 'max-w-[28rem] md:col-start-1 md:row-span-2 md:row-start-1 md:self-center' : 'max-w-[22rem]',
          temLista && 'md:col-start-1 md:row-start-1',
        )}
      >
        <div aria-hidden="true">
          <div className="grid grid-cols-3 items-end border-b border-metal-700">
            <div className="flex flex-col justify-end">
              <Marcador rotulo={rotulos.atras} cor="bg-cyan-accent" />
              <div
                className="h-[3.2rem] origin-bottom border-t-2 border-cyan-accent bg-metal-800 motion-safe:animate-subir-degrau sm:h-16"
                style={{ animationDelay: '0ms' }}
              />
            </div>
            <div className="flex flex-col justify-end">
              <Marcador rotulo={rotulos.aFrente} cor="bg-steel-blue-light" />
              <div
                className="h-[5.6rem] origin-bottom border-t-2 border-steel-blue-light bg-metal-800 motion-safe:animate-subir-degrau sm:h-28"
                style={{ animationDelay: '90ms' }}
              />
            </div>
            <div
              className="h-32 origin-bottom border-x-2 border-t-2 border-dashed border-metal-600 motion-safe:animate-subir-degrau sm:h-40"
              style={{ animationDelay: '180ms' }}
            />
          </div>
          <div key={exemplo.id} className="grid grid-cols-3 pt-2 text-sm leading-snug text-metal-300">
            <span className="pr-2 motion-safe:animate-surgir">{exemplo.atras}</span>
            <span className="pr-2 motion-safe:animate-surgir">{exemplo.aFrente}</span>
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-label="Exemplos por tema"
        className={cn(
          'flex flex-wrap gap-2',
          ladoALado ? 'md:col-start-2 md:row-start-1 md:self-end' : 'max-w-[22rem]',
          temLista && 'md:col-start-1 md:row-start-2',
        )}
      >
        {exemplosPassoAFrente.map((item) => {
          const ativo = item.id === exemplo.id

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setExemploId(item.id)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
                ativo
                  ? 'border-steel-blue bg-steel-blue/20 text-steel-blue-light'
                  : 'border-metal-700 bg-metal-800/50 text-metal-300 hover:border-metal-500 hover:text-metal-100',
              )}
            >
              {item.tema}
            </button>
          )
        })}
      </div>

      {temLista && (
        <div
          className="mentoria-lista order-last pt-4 text-metal-300 md:order-none md:col-start-2 md:row-span-3 md:row-start-1 md:self-center md:pt-0"
          data-layout="linhas"
          style={{ '--tom-lista': 'var(--cyan-accent)' } as CSSProperties}
        >
          {children}
        </div>
      )}

      <figcaption
        aria-live="polite"
        className={cn(
          'text-base leading-relaxed text-metal-200',
          ladoALado ? 'max-w-md md:col-start-2 md:row-start-2 md:self-start md:text-lg' : 'max-w-[22rem]',
          temLista && 'md:col-start-1 md:row-start-3',
        )}
      >
        <span key={exemplo.id} className="block motion-safe:animate-surgir">
          {exemplo.frase}
        </span>
      </figcaption>
    </figure>
  )
}
