import { useState } from 'react'

export function useClipboard(timeoutMs = 2000) {
  const [copiado, setCopiado] = useState(false)
  const [erro, setErro] = useState(false)

  const copiar = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setErro(false)
    } catch {
      setErro(true)
      setCopiado(false)
    }
    setTimeout(() => {
      setCopiado(false)
      setErro(false)
    }, timeoutMs)
  }

  return { copiado, erro, copiar }
}
