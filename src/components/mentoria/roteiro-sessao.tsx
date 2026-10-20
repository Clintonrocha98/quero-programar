import { useState } from 'react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClipboard } from '@/hooks/use-clipboard'
import {
  ajudaRoteiro,
  duracoesSessao,
  roteiros,
  type DuracaoSessao,
  type RoteiroSessao as Roteiro,
} from '@/data/mentoria-roteiro'
import { calcularFaixas, formatarFaixa, montarTextoRoteiro } from '@/lib/mentoria-roteiro'
import { BarraTempoRoteiro } from './barra-tempo-roteiro'

const estiloOpcao = (ativo: boolean) =>
  cn(
    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light',
    ativo ? 'bg-steel-blue text-white shadow-sm' : 'text-metal-300 hover:bg-metal-800 hover:text-metal-100',
  )

export function RoteiroSessao() {
  const [roteiroId, setRoteiroId] = useState<Roteiro['id']>(roteiros[0].id)
  const [duracao, setDuracao] = useState<DuracaoSessao>(60)
  const [marcados, setMarcados] = useState<Record<string, boolean>>({})
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({})
  const { copiado, erro, copiar } = useClipboard()

  const roteiro = roteiros.find((item) => item.id === roteiroId) ?? roteiros[0]
  const faixas = calcularFaixas(roteiro.blocos, duracao)
  const totalMarcados = roteiro.blocos.filter((bloco) => marcados[bloco.id]).length

  const trocarRoteiro = (id: Roteiro['id']) => {
    if (id === roteiroId) {
      return
    }

    setRoteiroId(id)
    setMarcados({})
    setExpandidos({})
  }

  const alternarMarcado = (id: string) => {
    setMarcados((anterior) => ({ ...anterior, [id]: !anterior[id] }))
  }

  const alternarExpandido = (id: string) => {
    setExpandidos((anterior) => ({ ...anterior, [id]: !anterior[id] }))
  }

  return (
    <div className="not-prose my-8 rounded-lg border border-metal-700 bg-metal-900/60">
      <div className="flex flex-col gap-4 border-b border-metal-700/50 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span id="roteiro-tipo-rotulo" className="text-sm font-medium text-metal-200">
              Escolha o tipo
            </span>
            <div
              role="group"
              aria-labelledby="roteiro-tipo-rotulo"
              className="inline-flex w-fit rounded-lg border border-metal-700 bg-metal-950/60 p-1"
            >
              {roteiros.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === roteiroId}
                  onClick={() => trocarRoteiro(item.id)}
                  className={estiloOpcao(item.id === roteiroId)}
                >
                  {item.titulo}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span id="roteiro-duracao-rotulo" className="text-sm font-medium text-metal-200">
              Escolha o tempo
            </span>
            <div
              role="group"
              aria-labelledby="roteiro-duracao-rotulo"
              className="inline-flex w-fit rounded-lg border border-metal-700 bg-metal-950/60 p-1"
            >
              {duracoesSessao.map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  aria-pressed={opcao === duracao}
                  onClick={() => setDuracao(opcao)}
                  className={estiloOpcao(opcao === duracao)}
                >
                  {opcao} min
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-metal-300">{roteiro.descricao}</p>
      </div>

      <div key={roteiro.id} className="border-b border-metal-700/50 p-4 motion-safe:animate-surgir sm:px-5">
        <BarraTempoRoteiro faixas={faixas} duracao={duracao} marcados={marcados} />
      </div>

      <p className="px-4 pt-4 text-xs leading-relaxed text-metal-300 sm:px-5">{ajudaRoteiro.perguntas}</p>

      <ol className="divide-y divide-metal-800/60">
        {faixas.map(({ bloco, inicio, fim }) => {
          const idCampo = `roteiro-${roteiro.id}-${bloco.id}`
          const idPerguntas = `${idCampo}-perguntas`
          const marcado = !!marcados[bloco.id]
          const expandido = !!expandidos[bloco.id]

          return (
            <li key={bloco.id} className={cn('transition-colors', marcado && 'bg-metal-800/20')}>
              <div className="flex items-start gap-3 p-4 sm:px-5">
                <input
                  id={idCampo}
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternarMarcado(bloco.id)}
                  className="mt-1 h-5 w-5 flex-shrink-0 cursor-pointer accent-steel-blue"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <label
                    htmlFor={idCampo}
                    className="flex cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    <span className="font-mono text-sm tabular-nums text-cyan-accent">
                      {formatarFaixa(inicio, fim)} min
                    </span>
                    <span
                      className={cn(
                        'font-semibold transition-colors',
                        marcado ? 'text-metal-300 line-through' : 'text-metal-100',
                      )}
                    >
                      {bloco.titulo}
                    </span>
                  </label>
                  <p className="text-sm leading-relaxed text-metal-300">{bloco.descricao}</p>

                  <button
                    type="button"
                    aria-expanded={expandido}
                    aria-controls={idPerguntas}
                    onClick={() => alternarExpandido(bloco.id)}
                    className="inline-flex items-center gap-1 rounded text-sm font-medium text-steel-blue-light transition-colors hover:text-cyan-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue-light"
                  >
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', expandido && 'rotate-180')}
                      aria-hidden="true"
                    />
                    Perguntas-guia
                  </button>

                  {expandido && (
                    <ul
                      id={idPerguntas}
                      className="grid list-disc gap-1 pl-5 pt-2 text-sm text-metal-300 motion-safe:animate-surgir"
                    >
                      {bloco.perguntas.map((pergunta) => (
                        <li key={pergunta}>{pergunta}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="flex flex-col gap-3 border-t border-metal-700/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-metal-300" aria-live="polite">
          <span className="font-semibold text-steel-blue-light">{totalMarcados}</span> de{' '}
          {roteiro.blocos.length} blocos
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-sm leading-relaxed text-metal-300 sm:max-w-xs sm:text-right">{ajudaRoteiro.copiar}</p>
          <button
            type="button"
            onClick={() => copiar(montarTextoRoteiro(roteiro, duracao))}
            className="inline-flex w-fit flex-shrink-0 items-center gap-2 rounded-lg bg-steel-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-steel-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent"
          >
            {copiado ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            <span aria-live="polite">{copiado ? 'Copiado!' : erro ? 'Não foi possível copiar' : 'Copiar roteiro'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
