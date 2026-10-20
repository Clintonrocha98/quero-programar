import { useId, type ReactNode } from 'react'
import { Flag } from 'lucide-react'
import { useRevelarAoRolar } from '@/hooks/use-revelar-ao-rolar'
import { frequenciaAberta } from '@/data/mentoria-guias'

interface ConversaOuVariasProps {
  children: ReactNode
}

interface FormaConversaProps {
  tipo: 'unica' | 'longa'
  titulo: string
  children: ReactNode
}

function TracoUnico() {
  return (
    <svg viewBox="0 0 160 24" aria-hidden="true" className="h-6 w-40 text-metal-500" fill="none">
      <circle cx="8" cy="12" r="4" fill="currentColor" />
      <line x1="12" y1="12" x2="128" y2="12" stroke="currentColor" strokeWidth="2" />
      <Flag x="128" y="2" width="20" height="20" strokeWidth={2} />
    </svg>
  )
}

function TracoAberto() {
  const idBase = useId().replace(/:/g, '')
  const idMascara = `${idBase}-mascara`
  const idDegrade = `${idBase}-degrade`
  const { ref, revelado } = useRevelarAoRolar<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      data-revelado={revelado}
      viewBox="0 0 160 24"
      aria-hidden="true"
      className="group h-6 w-40 text-metal-500"
      fill="none"
    >
      <defs>
        <linearGradient id={idDegrade} x1="80" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={idMascara} maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="24">
          <rect x="0" y="0" width="160" height="24" fill={`url(#${idDegrade})`} />
        </mask>
      </defs>
      <line x1="12" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="48" y1="12" x2="76" y2="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="12" r="4" fill="currentColor" />
      <circle cx="44" cy="12" r="4" fill="currentColor" />
      <circle cx="80" cy="12" r="4" fill="currentColor" />
      <line
        x1="84"
        y1="12"
        x2="160"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        mask={`url(#${idMascara})`}
        className="motion-safe:group-data-[revelado=true]:animate-fluir"
      />
    </svg>
  )
}

export function FormaConversa({ tipo, titulo, children }: FormaConversaProps) {
  return (
    <div className="flex flex-col rounded-lg border border-metal-700 bg-metal-900/40 p-4 sm:p-5">
      <div className="not-prose space-y-3">
        <h3 className="text-lg font-semibold text-metal-100">{titulo}</h3>
        {tipo === 'unica' ? <TracoUnico /> : <TracoAberto />}
      </div>
      <div className="mt-4 [&_ul]:!mb-0">{children}</div>
    </div>
  )
}

export function ConversaOuVarias({ children }: ConversaOuVariasProps) {
  return (
    <div className="my-6 space-y-6">
      <p>{frequenciaAberta}</p>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  )
}
