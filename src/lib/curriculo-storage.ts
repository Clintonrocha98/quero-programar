import type { CurriculoBuilderState } from '@/types/curriculo'

const CHAVE = 'qp:curriculo-rascunho:v1'

interface PayloadRascunho {
  versao: 1
  state: CurriculoBuilderState
}

export function carregarRascunho(): CurriculoBuilderState | null {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (!bruto) return null

    const payload = JSON.parse(bruto) as PayloadRascunho

    if (payload?.versao !== 1 || !payload.state?.data?.header) return null

    return payload.state
  } catch {
    return null
  }
}

export function salvarRascunho(state: CurriculoBuilderState): boolean {
  try {
    const payload: PayloadRascunho = { versao: 1, state }
    localStorage.setItem(CHAVE, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function limparRascunho(): void {
  try {
    localStorage.removeItem(CHAVE)
  } catch {
    return
  }
}
