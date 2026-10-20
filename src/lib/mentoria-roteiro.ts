import type { BlocoRoteiro, DuracaoSessao, RoteiroSessao } from '@/data/mentoria-roteiro'

export interface BlocoComFaixa {
  bloco: BlocoRoteiro
  inicio: number
  fim: number
}

export function calcularFaixas(blocos: BlocoRoteiro[], duracao: DuracaoSessao): BlocoComFaixa[] {
  let inicio = 0

  return blocos.map((bloco) => {
    const fim = inicio + bloco.minutos[duracao]
    const faixa = { bloco, inicio, fim }
    inicio = fim
    return faixa
  })
}

export function formatarFaixa(inicio: number, fim: number): string {
  return `${inicio}–${fim}`
}

export function montarTextoRoteiro(roteiro: RoteiroSessao, duracao: DuracaoSessao): string {
  const linhas = calcularFaixas(roteiro.blocos, duracao).map(
    ({ bloco, inicio, fim }) => `${formatarFaixa(inicio, fim)} min · ${bloco.titulo}`,
  )

  return [roteiro.titulo, `Duração: ${duracao} min`, '', ...linhas].join('\n')
}
