import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { estadoDoModelo } from '@/data/curriculo-modelo'
import { curriculoReducer } from '@/lib/curriculo-reducer'
import { carregarRascunho, salvarRascunho } from '@/lib/curriculo-storage'
import { validarCurriculo } from '@/lib/curriculo-validation'
import { CurriculoContext, type CurriculoContextValue } from '@/contexts/curriculo-context'

interface CurriculoProviderProps {
  children: ReactNode
}

export function CurriculoProvider({ children }: CurriculoProviderProps) {
  const [state, dispatch] = useReducer(
    curriculoReducer,
    undefined,
    () => carregarRascunho() ?? estadoDoModelo(),
  )
  const [rascunhoSalvo, setRascunhoSalvo] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRascunhoSalvo(salvarRascunho(state))
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [state])

  const avisos = useMemo(() => validarCurriculo(state.data), [state.data])

  const value: CurriculoContextValue = { state, dispatch, avisos, rascunhoSalvo }

  return <CurriculoContext.Provider value={value}>{children}</CurriculoContext.Provider>
}
