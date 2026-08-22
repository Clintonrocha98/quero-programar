import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClipboard } from '@/hooks/use-clipboard'

export interface BotaoCopiarPromptProps {
  texto: string
  className?: string
  rotulo?: string
}

export function BotaoCopiarPrompt({ texto, className, rotulo = 'Copiar prompt' }: BotaoCopiarPromptProps) {
  const { copiado, erro, copiar } = useClipboard()

  const rotuloExibido = copiado ? 'Copiado' : erro ? 'Não foi possível copiar' : rotulo

  return (
    <button
      type="button"
      onClick={() => copiar(texto)}
      aria-label={rotuloExibido}
      className={cn('inline-flex items-center gap-1.5 transition-colors', className)}
    >
      {copiado ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {rotuloExibido}
    </button>
  )
}
