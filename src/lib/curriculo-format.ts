export function formatarTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)
  const tamanho = digitos.length

  if (tamanho === 0) return ''
  if (tamanho <= 2) return `(${digitos}`

  const ddd = digitos.slice(0, 2)
  const resto = digitos.slice(2)

  if (tamanho <= 6) return `(${ddd}) ${resto}`

  const tamanhoParte1 = tamanho <= 10 ? 4 : 5
  const parte1 = resto.slice(0, tamanhoParte1)
  const parte2 = resto.slice(tamanhoParte1)

  return `(${ddd}) ${parte1}-${parte2}`
}

export function slugificar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function normalizarUrl(url: string): string {
  const valor = url.trim()

  if (valor === '') return ''
  if (/^https?:\/\//i.test(valor)) return valor

  return `https://${valor}`
}
