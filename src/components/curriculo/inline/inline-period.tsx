import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ANO_MINIMO, MESES_PT } from '@/lib/curriculo-constants'

const ANO_MAXIMO = new Date().getFullYear() + 1

export interface InlinePeriodProps {
  dataInicio: string | null
  dataFim: string | null
  atual: boolean
  onChange: (valores: { data_inicio: string | null; data_fim: string | null; atual: boolean }) => void
  rotuloAtual?: string
  textoExibido: string
  aviso?: boolean
}

interface MesAno {
  mes: string
  ano: string
}

function decompor(data: string | null): MesAno {
  if (!data) return { mes: '', ano: '' }

  const [ano, mes] = data.split('-')
  return { mes: mes ?? '', ano: ano ?? '' }
}

function compor(mes: string, ano: string): string | null {
  if (mes === '' || ano === '') return null

  return `${ano}-${mes.padStart(2, '0')}`
}

const classesSelectPopover =
  'rounded border border-neutral-300 bg-white px-1 py-0.5 text-sm text-neutral-800 disabled:cursor-not-allowed disabled:opacity-50'

export function InlinePeriod({
  dataInicio,
  dataFim,
  atual,
  onChange,
  rotuloAtual,
  textoExibido,
  aviso = false,
}: InlinePeriodProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [aberto, setAberto] = useState(false)
  const [mesInicio, setMesInicio] = useState('')
  const [anoInicio, setAnoInicio] = useState('')
  const [mesFim, setMesFim] = useState('')
  const [anoFim, setAnoFim] = useState('')
  const [atualLocal, setAtualLocal] = useState(atual)

  function abrirPopover() {
    const inicio = decompor(dataInicio)
    const fim = decompor(dataFim)

    setMesInicio(inicio.mes)
    setAnoInicio(inicio.ano)
    setMesFim(fim.mes)
    setAnoFim(fim.ano)
    setAtualLocal(atual)
    setAberto(true)
  }

  const aplicarEFechar = useCallback(() => {
    onChange({
      data_inicio: compor(mesInicio, anoInicio),
      data_fim: atualLocal ? null : compor(mesFim, anoFim),
      atual: atualLocal,
    })
    setAberto(false)
  }, [mesInicio, anoInicio, mesFim, anoFim, atualLocal, onChange])

  useEffect(() => {
    if (!aberto) return

    function aoClicarFora(evento: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(evento.target as Node)) {
        aplicarEFechar()
      }
    }

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        aplicarEFechar()
      }
    }

    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoPressionarTecla)

    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoPressionarTecla)
    }
  }, [aberto, aplicarEFechar])

  const anos: string[] = []
  for (let ano = ANO_MAXIMO; ano >= ANO_MINIMO; ano--) {
    anos.push(String(ano))
  }

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => {
          if (!aberto) abrirPopover()
        }}
        aria-haspopup="true"
        aria-expanded={aberto}
        className={cn(
          '[font:inherit] rounded-sm border-0 bg-transparent px-0.5 outline-none hover:bg-neutral-100 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300',
          !textoExibido && 'italic text-neutral-400',
          aviso && 'underline decoration-amber-500 decoration-wavy underline-offset-4',
        )}
      >
        {textoExibido || 'Período'}
      </button>

      {aberto && (
        <div className="absolute z-20 mt-1 w-64 rounded-md border border-neutral-200 bg-white p-3 font-sans text-sm text-neutral-800 shadow-lg">
          <div className="mb-2">
            <p className="mb-1 text-xs font-medium text-neutral-500">Início</p>
            <div className="flex gap-1">
              <select
                value={mesInicio}
                onChange={(evento) => setMesInicio(evento.target.value)}
                aria-label="Mês de início"
                className={classesSelectPopover}
              >
                <option value="">Mês</option>
                {MESES_PT.map((nome, indice) => (
                  <option key={nome} value={String(indice + 1).padStart(2, '0')}>
                    {nome}
                  </option>
                ))}
              </select>
              <select
                value={anoInicio}
                onChange={(evento) => setAnoInicio(evento.target.value)}
                aria-label="Ano de início"
                className={classesSelectPopover}
              >
                <option value="">Ano</option>
                {anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-1 text-xs font-medium text-neutral-500">Término</p>
            <div className="flex gap-1">
              <select
                value={mesFim}
                onChange={(evento) => setMesFim(evento.target.value)}
                disabled={atualLocal}
                aria-label="Mês de término"
                className={classesSelectPopover}
              >
                <option value="">Mês</option>
                {MESES_PT.map((nome, indice) => (
                  <option key={nome} value={String(indice + 1).padStart(2, '0')}>
                    {nome}
                  </option>
                ))}
              </select>
              <select
                value={anoFim}
                onChange={(evento) => setAnoFim(evento.target.value)}
                disabled={atualLocal}
                aria-label="Ano de término"
                className={classesSelectPopover}
              >
                <option value="">Ano</option>
                {anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="mb-3 flex items-center gap-2 text-xs text-neutral-600">
            <input
              type="checkbox"
              checked={atualLocal}
              onChange={(evento) => setAtualLocal(evento.target.checked)}
            />
            {rotuloAtual ?? 'Atual'}
          </label>

          <button
            type="button"
            onClick={aplicarEFechar}
            className="rounded bg-neutral-900 px-3 py-1 text-white"
          >
            Aplicar
          </button>
        </div>
      )}
    </span>
  )
}
