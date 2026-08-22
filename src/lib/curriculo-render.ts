import { MESES_PT } from '@/lib/curriculo-constants'
import { normalizarUrl } from '@/lib/curriculo-format'
import type {
  CurriculoData,
  CurriculoHeader,
  Experiencia,
  Formacao,
  Projeto,
  SecaoOpcional,
} from '@/types/curriculo'

export function formatarMesAno(data: string | null): string {
  if (!data) return ''

  const [ano, mes] = data.split('-')
  const nomeMes = MESES_PT[Number(mes) - 1]

  if (!nomeMes) return ''

  return `${nomeMes}/${ano}`
}

export function nomeRenderizado(header: CurriculoHeader): string {
  return header.nome_completo.toUpperCase()
}

export function linhaContato(header: CurriculoHeader): string {
  return [header.email, header.telefone].filter((valor) => valor.trim() !== '').join(' | ')
}

export function linksHeader(header: CurriculoHeader): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = []

  if (header.linkedin_url.trim() !== '') {
    links.push({ label: 'LinkedIn', url: normalizarUrl(header.linkedin_url) })
  }

  if (header.github_url.trim() !== '') {
    links.push({ label: 'Github', url: normalizarUrl(header.github_url) })
  }

  return links
}

export function sufixoVinculo(exp: Experiencia): string {
  if (!exp.vinculo || exp.vinculo === 'CLT') return ''

  return ` (${exp.vinculo})`
}

export function periodoExperiencia(exp: Experiencia): string {
  const inicio = formatarMesAno(exp.data_inicio)
  const fim = exp.atual ? 'Atuando' : formatarMesAno(exp.data_fim)

  if (!inicio) return fim
  if (!fim) return inicio

  return `${inicio} – ${fim}`
}

export function tituloExperiencia(exp: Experiencia): string {
  const cargoComVinculo = `${exp.cargo.trim()}${sufixoVinculo(exp)}`.trim()

  const partes = [exp.empresa.trim(), cargoComVinculo, periodoExperiencia(exp)].filter(
    (parte) => parte !== '',
  )

  return partes.join(' - ')
}

export function linhaTecnologias(exp: Experiencia): string {
  if (exp.tecnologias.length === 0) return ''

  return `Tecnologias: ${exp.tecnologias.join(', ')}.`
}

export function linhaHardSkills(skills: string[]): string {
  if (skills.length === 0) return ''

  return `${skills.join(', ')}.`
}

export function tituloProjeto(proj: Projeto): { texto: string; link: string | null } {
  return {
    texto: `${proj.nome} - ${proj.escopo}`,
    link: proj.link.trim() === '' ? null : normalizarUrl(proj.link),
  }
}

export function linhaStack(proj: Projeto): string {
  return proj.stack.join(' - ')
}

export function ordenarExperiencias(exps: Experiencia[]): Experiencia[] {
  return [...exps].sort((a, b) => {
    if (!a.data_inicio && !b.data_inicio) return 0
    if (!a.data_inicio) return 1
    if (!b.data_inicio) return -1

    if (a.data_inicio === b.data_inicio) {
      if (a.atual === b.atual) return 0
      return a.atual ? -1 : 1
    }

    return a.data_inicio > b.data_inicio ? -1 : 1
  })
}

export function experienciaTemConteudo(exp: Experiencia): boolean {
  return exp.empresa.trim() !== '' && exp.cargo.trim() !== ''
}

export function blocosVisiveis(
  exp: Experiencia,
): { contexto: string; realizacoes: string[] }[] {
  return exp.blocos
    .map((bloco) => ({
      contexto: bloco.contexto,
      realizacoes: bloco.realizacoes.filter((realizacao) => realizacao.trim() !== ''),
    }))
    .filter((bloco) => bloco.contexto.trim() !== '' || bloco.realizacoes.length > 0)
}

export function formatarPeriodoFormacao(f: Formacao): string {
  const inicio = formatarMesAno(f.data_inicio)
  const fim = f.em_andamento ? 'Em andamento' : formatarMesAno(f.data_fim)

  if (!inicio) return fim
  if (!fim) return inicio

  return `${inicio} – ${fim}`
}

type SecoesVisiveisPdf = Record<
  | 'resumo'
  | 'experiencias'
  | 'hard_skills'
  | 'projetos'
  | 'formacao'
  | 'certificacoes'
  | 'idiomas',
  boolean
>

export function secoesVisiveisPdf(
  data: CurriculoData,
  opcionaisAtivos: Record<SecaoOpcional, boolean>,
): SecoesVisiveisPdf {
  return {
    resumo: data.resumo.texto_resumo.trim() !== '',
    experiencias: data.experiencias.some(experienciaTemConteudo),
    hard_skills: data.hard_skills.length > 0,
    projetos: data.projetos.some((projeto) => projeto.nome.trim() !== ''),
    formacao:
      opcionaisAtivos.formacao &&
      data.opcionais.formacao.some((item) => item.instituicao.trim() !== ''),
    certificacoes:
      opcionaisAtivos.certificacoes &&
      data.opcionais.certificacoes.some((item) => item.nome.trim() !== ''),
    idiomas:
      opcionaisAtivos.idiomas && data.opcionais.idiomas.some((item) => item.idioma.trim() !== ''),
  }
}
