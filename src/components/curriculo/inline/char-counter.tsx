import { cn } from '@/lib/utils'

export interface CharCounterProps {
  atual: number
  max?: number
  min?: number
}

export function CharCounter({ atual, max, min }: CharCounterProps) {
  const foraDaFaixa =
    (max !== undefined && atual > max) || (min !== undefined && atual > 0 && atual < min)

  return (
    <span
      className={cn(
        'select-none text-[10px] font-sans tabular-nums',
        foraDaFaixa ? 'text-amber-600' : 'text-neutral-400',
      )}
    >
      {max !== undefined ? `${atual}/${max}` : atual}
    </span>
  )
}
