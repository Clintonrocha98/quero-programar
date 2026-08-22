import { useContext } from 'react'
import { CurriculoContext, type CurriculoContextValue } from '@/contexts/curriculo-context'

export function useCurriculo(): CurriculoContextValue {
  const context = useContext(CurriculoContext)
  if (!context) {
    throw new Error('useCurriculo deve ser usado dentro de um CurriculoProvider')
  }
  return context
}
