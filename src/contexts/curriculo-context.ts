import { createContext, type Dispatch } from 'react'
import type { CurriculoAction } from '@/lib/curriculo-reducer'
import type { AvisoValidacao, CurriculoBuilderState } from '@/types/curriculo'

export interface CurriculoContextValue {
  state: CurriculoBuilderState
  dispatch: Dispatch<CurriculoAction>
  avisos: AvisoValidacao[]
  rascunhoSalvo: boolean
}

export const CurriculoContext = createContext<CurriculoContextValue | null>(null)
