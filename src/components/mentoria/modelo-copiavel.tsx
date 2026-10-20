import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClipboard } from '@/hooks/use-clipboard'
import type { ModeloMensagem } from '@/data/mentoria-modelos'
import { CampoDestacado } from './campo-destacado'
import { estiloPapel } from './papel'

function TextoComCampos({ texto }: { texto: string }) {
  const partes = texto.split(/(\[[^\]]+\])/g)

  return (
    <>
      {partes.map((parte, indice) =>
        /^\[[^\]]+\]$/.test(parte) ? (
          <CampoDestacado key={indice}>{parte}</CampoDestacado>
        ) : (
          <span key={indice}>{parte}</span>
        ),
      )}
    </>
  )
}

interface ModeloCopiavelProps {
  modelo: ModeloMensagem
  abertoInicialmente?: boolean
  hidden?: boolean
}

export function ModeloCopiavel({ modelo, abertoInicialmente = false, hidden = false }: ModeloCopiavelProps) {
  const { copiado, erro, copiar } = useClipboard()
  const [aberto, setAberto] = useState(abertoInicialmente)
  const [cortado, setCortado] = useState(false)
  const refTexto = useRef<HTMLPreElement>(null)
  const papel = estiloPapel[modelo.quemEnvia]
  const idTexto = `${modelo.id}-texto`
  const mostrarAlternancia = cortado || aberto
  const mostrarDegrade = cortado && !aberto

  useEffect(() => {
    if (abertoInicialmente) {
      setAberto(true)
    }
  }, [abertoInicialmente])

  useEffect(() => {
    const elemento = refTexto.current

    if (!elemento || aberto) {
      return
    }

    const medir = () => setCortado(elemento.scrollHeight > elemento.clientHeight + 1)
    medir()

    const observador = new ResizeObserver(medir)
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [aberto])

  return (
    <article
      id={modelo.id}
      hidden={hidden}
      className="scroll-mt-24 rounded-lg border border-metal-700 bg-metal-900/60"
      aria-labelledby={`${modelo.id}-titulo`}
    >
      <header className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h4 id={`${modelo.id}-titulo`} className="text-base font-semibold text-metal-100">
            {modelo.titulo}
          </h4>
          <p className="text-sm text-metal-300">
            <span className="font-medium text-metal-200">Quando usar:</span> {modelo.quando}
          </p>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
              papel.fundo,
              papel.texto,
            )}
          >
            <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', papel.ponto)} />
            {papel.rotulo}
          </span>
        </div>
        <button
          type="button"
          onClick={() => copiar(modelo.texto)}
          aria-label={`Copiar modelo: ${modelo.titulo}`}
          className="inline-flex w-fit flex-shrink-0 items-center gap-2 rounded-lg bg-steel-blue px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-steel-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent"
        >
          {copiado ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          <span aria-live="polite">{copiado ? 'Copiado!' : erro ? 'Não foi possível copiar' : 'Copiar'}</span>
        </button>
      </header>

      <div
        className={cn(
          'relative mx-4 mb-4 rounded-2xl rounded-tl-sm border border-l-2 border-metal-700/60 bg-metal-950/60 p-4',
          papel.bordaEsquerda,
        )}
      >
        <pre
          id={idTexto}
          ref={refTexto}
          className={cn(
            'm-0 whitespace-pre-wrap break-words bg-transparent p-0 font-sans text-sm leading-relaxed text-metal-200',
            !aberto && 'line-clamp-6',
          )}
        >
          <TextoComCampos texto={modelo.texto} />
        </pre>
        {mostrarDegrade && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-2xl bg-gradient-to-t from-metal-950 via-metal-950/70"
          />
        )}
      </div>

      {mostrarAlternancia && (
        <div className="px-4 pb-4">
          <button
            type="button"
            aria-expanded={aberto}
            aria-controls={idTexto}
            onClick={() => setAberto((anterior) => !anterior)}
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-steel-blue-light transition-colors hover:text-cyan-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light"
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', aberto && 'rotate-180')} aria-hidden="true" />
            {aberto ? 'Mostrar menos' : 'Ver mensagem inteira'}
          </button>
        </div>
      )}
    </article>
  )
}
