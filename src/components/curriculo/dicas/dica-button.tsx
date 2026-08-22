import { useCallback, useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { DICAS, type TipoDica } from '@/data/curriculo-dicas'
import { BotaoCopiarPrompt } from '@/components/curriculo/dicas/botao-copiar-prompt'

export interface DicaButtonProps {
  tipo: TipoDica
}

export function DicaButton({ tipo }: DicaButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [aberto, setAberto] = useState(false)
  const dica = DICAS[tipo]

  const fechar = useCallback(() => setAberto(false), [])

  useEffect(() => {
    if (!aberto) return

    function aoClicarFora(evento: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(evento.target as Node)) {
        fechar()
      }
    }

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        fechar()
      }
    }

    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoPressionarTecla)

    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoPressionarTecla)
    }
  }, [aberto, fechar])

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-label={`Dica de preenchimento: ${dica.titulo}`}
        className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 font-sans text-[11px] text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
      >
        <Sparkles className="h-3 w-3" />
        Dica com IA
      </button>

      {aberto && (
        <div className="absolute right-0 z-20 mt-1 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-neutral-200 bg-white p-3 font-sans text-neutral-800 shadow-lg">
          <p className="mb-2 text-xs font-semibold text-neutral-900">{dica.titulo}</p>

          <ul className="mb-3 space-y-1 text-[11px] text-neutral-600">
            {dica.regras.map((regra) => (
              <li key={regra} className="flex gap-1.5">
                <span aria-hidden="true">•</span>
                <span>{regra}</span>
              </li>
            ))}
          </ul>

          <div className="mb-3 max-h-32 overflow-y-auto rounded border border-neutral-200 bg-neutral-50 p-2 text-[11px] leading-relaxed text-neutral-700 whitespace-pre-wrap">
            {dica.prompt}
          </div>

          <BotaoCopiarPrompt
            texto={dica.prompt}
            className="w-full justify-center rounded border border-neutral-300 bg-neutral-900 px-2 py-1.5 text-[11px] font-medium text-white hover:bg-neutral-800"
          />
        </div>
      )}
    </div>
  )
}
