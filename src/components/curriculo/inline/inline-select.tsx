import { cn } from '@/lib/utils'

export interface InlineSelectProps<T extends string> {
  valor: T | ''
  opcoes: readonly T[]
  onChange: (valor: T | '') => void
  rotulo: string
  placeholder?: string
  permitirVazio?: boolean
  className?: string
}

const classesCampo =
  '[font:inherit] appearance-none cursor-pointer rounded-sm border-0 bg-transparent px-0.5 outline-none hover:bg-neutral-100 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300'

export function InlineSelect<T extends string>({
  valor,
  opcoes,
  onChange,
  rotulo,
  placeholder,
  permitirVazio = false,
  className,
}: InlineSelectProps<T>) {
  return (
    <span className="relative inline-block align-baseline">
      <span
        aria-hidden="true"
        className={cn(classesCampo, className, 'invisible whitespace-pre block')}
      >
        {valor || placeholder || ' '}
      </span>
      <select
        value={valor}
        onChange={(evento) => onChange(evento.target.value as T | '')}
        aria-label={rotulo}
        className={cn(classesCampo, className, 'absolute inset-0 w-full')}
      >
        {permitirVazio && <option value="">{placeholder}</option>}
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </span>
  )
}
