export type Vinculo = 'CLT' | 'PJ' | 'Estágio' | 'Autônomo' | 'Freelance'
export type EscopoProjeto = 'Back-end' | 'Front-end' | 'Fullstack' | 'Mobile' | 'CLI'
export type NivelFormacao = 'Técnico' | 'Graduação' | 'Pós'
export type NivelIdioma = 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo'

export interface CurriculoHeader {
  nome_completo: string
  email: string
  telefone: string
  linkedin_url: string
  github_url: string
}

export interface CurriculoResumo {
  texto_resumo: string
}

export interface BlocoExperiencia {
  contexto: string
  realizacoes: string[]
}

export interface Experiencia {
  id: string
  empresa: string
  cargo: string
  vinculo: Vinculo | null
  data_inicio: string | null
  data_fim: string | null
  atual: boolean
  tecnologias: string[]
  blocos: BlocoExperiencia[]
}

export interface Projeto {
  id: string
  nome: string
  escopo: EscopoProjeto
  link: string
  stack: string[]
  descricao: string
  destaques: string[]
}

export interface Formacao {
  id: string
  instituicao: string
  curso: string
  nivel: NivelFormacao
  data_inicio: string | null
  data_fim: string | null
  em_andamento: boolean
}

export interface Certificacao {
  id: string
  nome: string
  emissor: string
  ano: string
  url_credencial: string
}

export interface Idioma {
  id: string
  idioma: string
  nivel: NivelIdioma
}

export interface CurriculoOpcionais {
  formacao: Formacao[]
  certificacoes: Certificacao[]
  idiomas: Idioma[]
}

export interface CurriculoData {
  header: CurriculoHeader
  resumo: CurriculoResumo
  experiencias: Experiencia[]
  hard_skills: string[]
  projetos: Projeto[]
  opcionais: CurriculoOpcionais
}

export type SecaoOpcional = keyof CurriculoOpcionais

export interface CurriculoBuilderState {
  data: CurriculoData
  opcionaisAtivos: Record<SecaoOpcional, boolean>
}

export interface AvisoValidacao {
  campo: string
  mensagem: string
}
