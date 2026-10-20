import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cardapioTemas } from '@/data/mentoria-roteiro'

interface CardapioTemasProps {
  titulo: string
  children: ReactNode
}

export function CardapioTemas({ titulo, children }: CardapioTemasProps) {
  const [temaId, setTemaId] = useState<string | null>(null)

  const temaSelecionado = cardapioTemas.find((tema) => tema.id === temaId)

  return (
    <section
      aria-labelledby="cardapio-temas-titulo"
      className="not-prose my-10 rounded-lg border border-metal-700 bg-metal-900/60 p-4 sm:p-5"
    >
      <h2 id="cardapio-temas-titulo" className="text-xl font-bold text-metal-100">
        {titulo}
      </h2>
      <div className="mt-1 text-sm text-metal-300">{children}</div>

      <div role="group" aria-label="Temas" className="mt-4 flex flex-wrap gap-2">
        {cardapioTemas.map((tema) => {
          const ativo = tema.id === temaId

          return (
            <button
              key={tema.id}
              type="button"
              aria-pressed={ativo}
              aria-controls="cardapio-temas-perguntas"
              onClick={() => setTemaId(ativo ? null : tema.id)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
                ativo
                  ? 'border-steel-blue bg-steel-blue/20 text-steel-blue-light'
                  : 'border-metal-700 bg-metal-800/50 text-metal-300 hover:border-metal-500 hover:text-metal-100',
              )}
            >
              {tema.titulo}
            </button>
          )
        })}
      </div>

      <div id="cardapio-temas-perguntas" aria-live="polite" className="mt-4">
        {temaSelecionado ? (
          <div
            key={temaSelecionado.id}
            className="rounded-md border border-metal-700/60 bg-metal-950/50 p-4 motion-safe:animate-surgir"
          >
            <p className="text-sm font-semibold !text-cyan-accent">{temaSelecionado.titulo}</p>
            <ul className="grid list-disc gap-1 pl-5 pt-2 text-sm text-metal-300">
              {temaSelecionado.perguntas.map((pergunta) => (
                <li key={pergunta}>{pergunta}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-metal-300">Escolha um tema para ver perguntas que ajudam a começar a conversa.</p>
        )}
      </div>
    </section>
  )
}
