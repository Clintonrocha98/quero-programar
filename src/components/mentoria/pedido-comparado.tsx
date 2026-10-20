import { Check, X } from 'lucide-react'

interface PedidoComparadoProps {
  vago: string
  especifico: string
}

export function PedidoComparado({ vago, especifico }: PedidoComparadoProps) {
  return (
    <div className="not-prose my-4 grid gap-3 md:grid-cols-[2fr_3fr]">
      <div className="space-y-2 rounded-lg border border-metal-700 bg-metal-900/40 p-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-metal-300">
          <X className="h-4 w-4" aria-hidden="true" />
          Grande e vago
        </span>
        <span className="block rounded-2xl rounded-br-sm border border-metal-700 bg-metal-950/60 px-4 py-3 text-metal-300">
          {vago}
        </span>
      </div>
      <div className="space-y-2 rounded-lg border border-emerald-accent/40 bg-emerald-accent/5 p-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-accent">
          <Check className="h-4 w-4" aria-hidden="true" />
          Fácil de aceitar
        </span>
        <span className="block rounded-2xl rounded-br-sm border border-emerald-accent/30 bg-metal-950/60 px-4 py-3 text-metal-100">
          {especifico}
        </span>
      </div>
    </div>
  )
}
