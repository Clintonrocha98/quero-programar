import { useState, type KeyboardEvent, type Ref } from 'react'
import { cn } from '@/lib/utils'
import { CharCounter } from '@/components/curriculo/inline/char-counter'

export interface InlineTextareaProps {
  valor: string
  onChange: (valor: string) => void
  rotulo: string
  placeholder?: string
  className?: string
  maxSugerido?: number
  minSugerido?: number
  onKeyDown?: (evento: KeyboardEvent<HTMLTextAreaElement>) => void
  inputRef?: Ref<HTMLTextAreaElement>
}

const classesTipografia = '[font:inherit] px-0.5 whitespace-pre-wrap'

const classesInterativas =
  'rounded-sm border-0 bg-transparent outline-none hover:bg-neutral-100 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300 placeholder:italic placeholder:text-neutral-400'

export function InlineTextarea({
  valor,
  onChange,
  rotulo,
  placeholder,
  className,
  maxSugerido,
  minSugerido,
  onKeyDown,
  inputRef,
}: InlineTextareaProps) {
  const [focado, setFocado] = useState(false)

  const mostrarContador = focado && (maxSugerido !== undefined || minSugerido !== undefined)

  return (
    <div className={cn('w-full', className)}>
      <div className="grid">
        <div aria-hidden="true" className={cn(classesTipografia, 'invisible [grid-area:1/1]')}>
          {valor + ' '}
        </div>
        <textarea
          ref={inputRef}
          rows={1}
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          aria-label={rotulo}
          placeholder={placeholder}
          className={cn(classesTipografia, classesInterativas, 'w-full resize-none overflow-hidden [grid-area:1/1]')}
        />
      </div>
      {mostrarContador && (
        <div className="flex justify-end">
          <CharCounter atual={valor.length} max={maxSugerido} min={minSugerido} />
        </div>
      )}
    </div>
  )
}
