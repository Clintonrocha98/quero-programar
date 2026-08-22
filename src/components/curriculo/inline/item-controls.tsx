import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ItemControlsProps {
  aoRemover?: () => void
  aoSubir?: () => void
  aoDescer?: () => void
  rotuloItem: string
  className?: string
}

const classesBotao =
  'rounded p-0.5 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-30'

export function ItemControls({
  aoRemover,
  aoSubir,
  aoDescer,
  rotuloItem,
  className,
}: ItemControlsProps) {
  return (
    <span className={cn('flex gap-0.5 font-sans', className)}>
      <button
        type="button"
        onClick={aoSubir}
        disabled={!aoSubir}
        aria-label={`Mover ${rotuloItem} para cima`}
        className={classesBotao}
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={aoDescer}
        disabled={!aoDescer}
        aria-label={`Mover ${rotuloItem} para baixo`}
        className={classesBotao}
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={aoRemover}
        disabled={!aoRemover}
        aria-label={`Remover ${rotuloItem}`}
        className={classesBotao}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}
