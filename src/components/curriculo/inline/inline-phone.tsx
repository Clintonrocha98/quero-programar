import { InlineText } from '@/components/curriculo/inline/inline-text'
import { formatarTelefone } from '@/lib/curriculo-format'

export interface InlinePhoneProps {
  valor: string
  onChange: (valor: string) => void
  rotulo: string
  placeholder?: string
  className?: string
  autoDimensionar?: boolean
}

export function InlinePhone({
  valor,
  onChange,
  rotulo,
  placeholder,
  className,
  autoDimensionar,
}: InlinePhoneProps) {
  return (
    <InlineText
      valor={valor}
      onChange={(novoValor) => onChange(formatarTelefone(novoValor))}
      rotulo={rotulo}
      placeholder={placeholder}
      className={className}
      autoDimensionar={autoDimensionar}
    />
  )
}
