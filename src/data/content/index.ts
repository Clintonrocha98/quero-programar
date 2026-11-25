import JavaScriptContent, { frontmatter as javascriptMeta } from './technologies/javascript.mdx'
import HtmlContent, { frontmatter as htmlMeta } from './technologies/html.mdx'
import CssContent, { frontmatter as cssMeta } from './technologies/css.mdx'
import GoContent, { frontmatter as goMeta } from './technologies/go.mdx'
import JavaContent, { frontmatter as javaMeta } from './technologies/java.mdx'
import PhpContent, { frontmatter as phpMeta } from './technologies/php.mdx'
import PythonContent, { frontmatter as pythonMeta } from './technologies/python.mdx'
import TypescriptContent, { frontmatter as typescriptMeta } from './technologies/typescript.mdx'
import WebContent, { frontmatter as webMeta } from './technologies/web.mdx'

import Linguagens4Noobs, { frontmatter as linguagens4NoobsMeta } from './4noobs/linguagens.mdx'
import Frameworks4Noobs, { frontmatter as frameworks4NoobsMeta } from './4noobs/frameworks.mdx'
import Ferramentas4Noobs, { frontmatter as ferramentas4NoobsMeta } from './4noobs/ferramentas.mdx'
import BancoDeDados4Noobs, { frontmatter as bancoDeDados4NoobsMeta } from './4noobs/banco-de-dados.mdx'
import SistemasOperacionais4Noobs, { frontmatter as sistemasOperacionais4NoobsMeta } from './4noobs/sistemas-operacionais.mdx'
import Design4Noobs, { frontmatter as design4NoobsMeta } from './4noobs/design.mdx'
import Paradigmas4Noobs, { frontmatter as paradigmas4NoobsMeta } from './4noobs/paradigmas.mdx'
import Diversos4Noobs, { frontmatter as diversos4NoobsMeta } from './4noobs/diversos.mdx'
import Certificacoes4Noobs, { frontmatter as certificacoes4NoobsMeta } from './4noobs/certificacoes.mdx'

import ArtigosContent, { frontmatter as artigosMeta } from './pages/artigos.mdx'
import ResourcesContent, { frontmatter as resourcesMeta } from './pages/resources.mdx'
import InicianteContent, { frontmatter as inicianteMeta } from './pages/iniciante.mdx'
import StudyPlanContent, { frontmatter as studyPlanMeta } from './pages/study-plan.mdx'

import ComoMentorarContent, { frontmatter as comoMentorarMeta } from './mentoria/como-mentorar.mdx'
import ComoSerMentoradoContent, { frontmatter as comoSerMentoradoMeta } from './mentoria/como-ser-mentorado.mdx'
import RoteiroMentoriaContent, { frontmatter as roteiroMentoriaMeta } from './mentoria/roteiro.mdx'
import ModelosMentoriaContent, { frontmatter as modelosMentoriaMeta } from './mentoria/modelos.mdx'

export interface TechnologyMeta {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export interface FourNoobsMeta {
  id: string
  title: string
  description: string
  icon: string
  color?: string
}

export interface PageMeta {
  id: string
  title: string
  description: string
}

export interface ContentItem<T = TechnologyMeta | PageMeta | FourNoobsMeta> {
  meta: T
  Content: React.ComponentType
}

export const technologies: Record<string, ContentItem<TechnologyMeta>> = {
  javascript: {
    meta: javascriptMeta,
    Content: JavaScriptContent,
  },
  html: {
    meta: htmlMeta,
    Content: HtmlContent,
  },
  css: {
    meta: cssMeta,
    Content: CssContent,
  },
  go: {
    meta: goMeta,
    Content: GoContent,
  },
  java: {
    meta: javaMeta,
    Content: JavaContent,
  },
  php: {
    meta: phpMeta,
    Content: PhpContent,
  },
  python: {
    meta: pythonMeta,
    Content: PythonContent,
  },
  typescript: {
    meta: typescriptMeta,
    Content: TypescriptContent,
  },
  web: {
    meta: webMeta,
    Content: WebContent,
  },
}

export const pages: Record<string, ContentItem<PageMeta>> = {
  artigos: {
    meta: artigosMeta,
    Content: ArtigosContent,
  },
  resources: {
    meta: resourcesMeta,
    Content: ResourcesContent,
  },
  iniciante: {
    meta: inicianteMeta,
    Content: InicianteContent,
  },
  "study-plan": {
    meta: studyPlanMeta,
    Content: StudyPlanContent,
  },
}

export const mentoriaPages: Record<string, ContentItem<PageMeta>> = {
  "como-mentorar": {
    meta: comoMentorarMeta,
    Content: ComoMentorarContent,
  },
  "como-ser-mentorado": {
    meta: comoSerMentoradoMeta,
    Content: ComoSerMentoradoContent,
  },
  roteiro: {
    meta: roteiroMentoriaMeta,
    Content: RoteiroMentoriaContent,
  },
  modelos: {
    meta: modelosMentoriaMeta,
    Content: ModelosMentoriaContent,
  },
}

export const fourNoobsData: Record<string, ContentItem<FourNoobsMeta>> = {
  linguagens: {
    meta: { ...linguagens4NoobsMeta, id: 'linguagens', color: 'bg-blue-500/10 text-blue-500' },
    Content: Linguagens4Noobs,
  },
  frameworks: {
    meta: { ...frameworks4NoobsMeta, id: 'frameworks', color: 'bg-green-500/10 text-green-500' },
    Content: Frameworks4Noobs,
  },
  ferramentas: {
    meta: { ...ferramentas4NoobsMeta, id: 'ferramentas', color: 'bg-orange-500/10 text-orange-500' },
    Content: Ferramentas4Noobs,
  },
  "banco-de-dados": {
    meta: { ...bancoDeDados4NoobsMeta, id: 'banco-de-dados', color: 'bg-indigo-500/10 text-indigo-500' },
    Content: BancoDeDados4Noobs,
  },
  "sistemas-operacionais": {
    meta: { ...sistemasOperacionais4NoobsMeta, id: 'sistemas-operacionais', color: 'bg-stone-500/10 text-stone-500' },
    Content: SistemasOperacionais4Noobs,
  },
  design: {
    meta: { ...design4NoobsMeta, id: 'design', color: 'bg-pink-500/10 text-pink-500' },
    Content: Design4Noobs,
  },
  paradigmas: {
    meta: { ...paradigmas4NoobsMeta, id: 'paradigmas', color: 'bg-purple-500/10 text-purple-500' },
    Content: Paradigmas4Noobs,
  },
  diversos: {
    meta: { ...diversos4NoobsMeta, id: 'diversos', color: 'bg-yellow-500/10 text-yellow-500' },
    Content: Diversos4Noobs,
  },
  certificacoes: {
    meta: { ...certificacoes4NoobsMeta, id: 'certificacoes', color: 'bg-cyan-500/10 text-cyan-500' },
    Content: Certificacoes4Noobs,
  },
}

export interface TechnologyCardInfo {
  id: string
  name: string
  description: string
  icon: string
  color: string
  url: string
}

export const technologiesList: TechnologyMeta[] = Object.values(technologies).map(t => t.meta)

export const technologiesForCards: TechnologyCardInfo[] = Object.values(technologies).map(t => ({
  id: t.meta.id,
  name: t.meta.title,
  description: t.meta.description,
  icon: t.meta.icon,
  color: t.meta.color,
  url: `/tecnologias/${t.meta.id}`,
}))

export const fourNoobsForCards: TechnologyCardInfo[] = Object.values(fourNoobsData).map(t => ({
  id: t.meta.id,
  name: t.meta.title,
  description: t.meta.description,
  icon: t.meta.icon,
  color: t.meta.color || 'bg-gray-500/10 text-gray-500',
  url: `/he4rt/4noobs/${t.meta.id}`,
}))

export function getTechnology(id: string): ContentItem<TechnologyMeta> | undefined {
  return technologies[id.toLowerCase()]
}

export function hasTechnology(id: string): boolean {
  return id.toLowerCase() in technologies
}

export function getPage(id: string): ContentItem<PageMeta> | undefined {
  return pages[id.toLowerCase()]
}

export function hasPage(id: string): boolean {
  return id.toLowerCase() in pages
}

export function getMentoriaPage(id: string): ContentItem<PageMeta> | undefined {
  const chave = id.toLowerCase()
  return Object.prototype.hasOwnProperty.call(mentoriaPages, chave) ? mentoriaPages[chave] : undefined
}

export function getFourNoobs(id: string): ContentItem<FourNoobsMeta> | undefined {
  return fourNoobsData[id.toLowerCase()]
}

export function hasFourNoobs(id: string): boolean {
  return id.toLowerCase() in fourNoobsData
}
