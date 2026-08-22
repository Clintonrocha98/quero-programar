import type {
  BlocoExperiencia,
  Certificacao,
  EscopoProjeto,
  Experiencia,
  Formacao,
  Idioma,
  NivelFormacao,
  NivelIdioma,
  Projeto,
  Vinculo,
} from '@/types/curriculo'

export const MESES_PT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export const VINCULOS: Vinculo[] = ['CLT', 'PJ', 'Estágio', 'Autônomo', 'Freelance']

export const ESCOPOS_PROJETO: EscopoProjeto[] = [
  'Back-end',
  'Front-end',
  'Fullstack',
  'Mobile',
  'CLI',
]

export const NIVEIS_FORMACAO: NivelFormacao[] = ['Técnico', 'Graduação', 'Pós']

export const NIVEIS_IDIOMA: NivelIdioma[] = [
  'Básico',
  'Intermediário',
  'Avançado',
  'Fluente',
  'Nativo',
]

export const ANO_MINIMO = 1980

export const LIMITES = {
  textoResumoMin: 400,
  textoResumoMax: 900,
  contextoMax: 500,
  realizacaoMax: 220,
  descricaoProjetoMax: 300,
  realizacoesMin: 3,
  realizacoesMax: 7,
  destaquesMin: 2,
  destaquesMax: 6,
} as const

export function novoBloco(): BlocoExperiencia {
  return { contexto: '', realizacoes: [''] }
}

export function novaExperiencia(): Experiencia {
  return {
    id: crypto.randomUUID(),
    empresa: '',
    cargo: '',
    vinculo: null,
    data_inicio: null,
    data_fim: null,
    atual: false,
    tecnologias: [],
    blocos: [novoBloco()],
  }
}

export function novoProjeto(): Projeto {
  return {
    id: crypto.randomUUID(),
    nome: '',
    escopo: 'Back-end',
    link: '',
    stack: [],
    descricao: '',
    destaques: [],
  }
}

export function novaFormacao(): Formacao {
  return {
    id: crypto.randomUUID(),
    instituicao: '',
    curso: '',
    nivel: 'Graduação',
    data_inicio: null,
    data_fim: null,
    em_andamento: false,
  }
}

export function novaCertificacao(): Certificacao {
  return {
    id: crypto.randomUUID(),
    nome: '',
    emissor: '',
    ano: '',
    url_credencial: '',
  }
}

export function novoIdioma(): Idioma {
  return {
    id: crypto.randomUUID(),
    idioma: '',
    nivel: 'Básico',
  }
}
