import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'
import { InlineTextarea } from '@/components/curriculo/inline/inline-textarea'
import { ItemControls } from '@/components/curriculo/inline/item-controls'

export interface BulletListProps {
  itens: string[]
  onChange: (itens: string[]) => void
  rotuloItem: string
  placeholder?: string
  textoAdicionar: string
  maxPorItem?: number
  minItens?: number
  maxItens?: number
}

function mensagemFaixa(min: number | undefined, max: number | undefined): string {
  if (min !== undefined && max !== undefined) return `Recomendado: entre ${min} e ${max} itens.`
  if (min !== undefined) return `Recomendado: no mínimo ${min} itens.`
  if (max !== undefined) return `Recomendado: no máximo ${max} itens.`

  return ''
}

export function BulletList({
  itens,
  onChange,
  rotuloItem,
  placeholder,
  textoAdicionar,
  maxPorItem,
  minItens,
  maxItens,
}: BulletListProps) {
  const refs = useRef<(HTMLTextAreaElement | null)[]>([])
  const indiceFoco = useRef<number | null>(null)

  useEffect(() => {
    if (indiceFoco.current === null) return

    const indice = indiceFoco.current
    indiceFoco.current = null

    requestAnimationFrame(() => {
      refs.current[indice]?.focus()
    })
  }, [itens])

  function atualizarItem(indice: number, valor: string) {
    onChange(itens.map((item, posicao) => (posicao === indice ? valor : item)))
  }

  function removerItem(indice: number) {
    onChange(itens.filter((_, posicao) => posicao !== indice))
  }

  function moverItem(indice: number, direcao: -1 | 1) {
    const destino = indice + direcao
    if (destino < 0 || destino >= itens.length) return

    const novosItens = [...itens]
    const [item] = novosItens.splice(indice, 1)
    novosItens.splice(destino, 0, item)
    onChange(novosItens)
  }

  function adicionarItem() {
    indiceFoco.current = itens.length
    onChange([...itens, ''])
  }

  function aoTeclarItem(evento: KeyboardEvent<HTMLTextAreaElement>, indice: number) {
    if (evento.key === 'Enter') {
      evento.preventDefault()
      const novosItens = [...itens]
      novosItens.splice(indice + 1, 0, '')
      indiceFoco.current = indice + 1
      onChange(novosItens)
      return
    }

    if (evento.key === 'Backspace' && itens[indice] === '' && itens.length > 1) {
      evento.preventDefault()
      indiceFoco.current = Math.max(0, indice - 1)
      removerItem(indice)
    }
  }

  const totalPreenchidos = itens.filter((item) => item.trim() !== '').length
  const foraDaFaixa =
    (minItens !== undefined && totalPreenchidos < minItens) ||
    (maxItens !== undefined && totalPreenchidos > maxItens)

  return (
    <div>
      <ul>
        {itens.map((item, indice) => (
          <li key={indice} className="group flex items-start gap-2">
            <span className="select-none text-[0.7em] leading-[1.9]">●</span>
            <InlineTextarea
              valor={item}
              onChange={(valor) => atualizarItem(indice, valor)}
              rotulo={rotuloItem}
              placeholder={placeholder}
              className="flex-1"
              maxSugerido={maxPorItem}
              onKeyDown={(evento) => aoTeclarItem(evento, indice)}
              inputRef={(elemento) => {
                refs.current[indice] = elemento
              }}
            />
            <ItemControls
              aoSubir={indice > 0 ? () => moverItem(indice, -1) : undefined}
              aoDescer={indice < itens.length - 1 ? () => moverItem(indice, 1) : undefined}
              aoRemover={itens.length > 1 ? () => removerItem(indice) : undefined}
              rotuloItem={rotuloItem}
              className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={adicionarItem}
        className="inline-flex items-center gap-1 font-sans text-xs text-neutral-400 hover:text-neutral-700"
      >
        <Plus className="h-3 w-3" />
        {textoAdicionar}
      </button>

      {foraDaFaixa && (
        <p className="font-sans text-[10px] text-amber-600">{mensagemFaixa(minItens, maxItens)}</p>
      )}
    </div>
  )
}
