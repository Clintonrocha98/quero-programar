import { cn } from '@/lib/utils'

export interface InlineTextProps {
  valor: string
  onChange: (valor: string) => void
  rotulo: string
  placeholder?: string
  className?: string
  autoDimensionar?: boolean
  aviso?: boolean
}

const classesTipografia = '[font:inherit] px-0.5'

const classesInterativas =
  'rounded-sm border-0 bg-transparent outline-none hover:bg-neutral-100 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300 placeholder:italic placeholder:text-neutral-400'

const classesAviso = 'underline decoration-amber-500 decoration-wavy underline-offset-4'

export function InlineText({
  valor,
  onChange,
  rotulo,
  placeholder,
  className,
  autoDimensionar = false,
  aviso = false,
}: InlineTextProps) {
  if (autoDimensionar) {
    return (
      <span className="relative inline-block align-baseline">
        <span
          aria-hidden="true"
          className={cn(classesTipografia, 'invisible whitespace-pre block')}
        >
          {valor || placeholder || ' '}
        </span>
        <input
          type="text"
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          aria-label={rotulo}
          placeholder={placeholder}
          className={cn(
            classesTipografia,
            classesInterativas,
            aviso && classesAviso,
            'absolute inset-0 w-full',
            className,
          )}
        />
      </span>
    )
  }

  return (
    <input
      type="text"
      value={valor}
      onChange={(evento) => onChange(evento.target.value)}
      aria-label={rotulo}
      placeholder={placeholder}
      className={cn(classesTipografia, classesInterativas, aviso && classesAviso, 'block w-full', className)}
    />
  )
}
