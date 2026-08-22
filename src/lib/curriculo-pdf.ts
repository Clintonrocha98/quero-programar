import { pdf } from '@react-pdf/renderer'
import { createElement } from 'react'
import { CurriculoPdfDocument } from '@/components/curriculo/pdf/curriculo-pdf-document'
import { slugificar } from '@/lib/curriculo-format'
import type { CurriculoData, SecaoOpcional } from '@/types/curriculo'

export async function baixarCurriculoPdf(
  data: CurriculoData,
  opcionaisAtivos: Record<SecaoOpcional, boolean>,
): Promise<void> {
  const documentElement = createElement(CurriculoPdfDocument, {
    data,
    opcionaisAtivos,
  }) as Parameters<typeof pdf>[0]
  const blob = await pdf(documentElement).toBlob()
  const url = URL.createObjectURL(blob)
  const slug = slugificar(data.header.nome_completo) || 'sem-nome'

  const link = document.createElement('a')
  link.href = url
  link.download = `curriculo-${slug}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
