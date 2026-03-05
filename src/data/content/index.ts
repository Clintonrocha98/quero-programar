// Importacao dos arquivos MDX de tecnologias
import JavaScriptContent, { frontmatter as javascriptMeta } from './javascript.mdx'
import HtmlContent, { frontmatter as htmlMeta } from './html.mdx'
import CssContent, { frontmatter as cssMeta } from './css.mdx'
import GoContent, { frontmatter as goMeta } from './go.mdx'
import JavaContent, { frontmatter as javaMeta } from './java.mdx'
import PhpContent, { frontmatter as phpMeta } from './php.mdx'
import PythonContent, { frontmatter as pythonMeta } from './python.mdx'
import TypescriptContent, { frontmatter as typescriptMeta } from './typescript.mdx'
import WebContent, { frontmatter as webMeta } from './web.mdx'

// Importacao dos arquivos MDX de paginas
import ArtigosContent, { frontmatter as artigosMeta } from './artigos.mdx'
import ResourcesContent, { frontmatter as resourcesMeta } from './resources.mdx'
import InicianteContent, { frontmatter as inicianteMeta } from './iniciante.mdx'
import StudyPlanContent, { frontmatter as studyPlanMeta } from './study-plan.mdx'

export interface TechnologyMeta {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export interface PageMeta {
  id: string
  title: string
  description: string
}

export interface ContentItem<T = TechnologyMeta | PageMeta> {
  meta: T
  Content: React.ComponentType
}

// Mapa de todas as tecnologias disponiveis
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

// Mapa de paginas de conteudo
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

// Interface compativel com LanguageCard
export interface TechnologyCardInfo {
  id: string
  name: string
  description: string
  icon: string
  color: string
  url: string
}

// Lista de metadados das tecnologias para exibir na pagina de listagem
export const technologiesList: TechnologyMeta[] = Object.values(technologies).map(t => t.meta)

// Lista formatada para uso com LanguageCard
export const technologiesForCards: TechnologyCardInfo[] = Object.values(technologies).map(t => ({
  id: t.meta.id,
  name: t.meta.title,
  description: t.meta.description,
  icon: t.meta.icon,
  color: t.meta.color,
  url: `/tecnologias/${t.meta.id}`,
}))

// Funcao auxiliar para buscar uma tecnologia pelo ID
export function getTechnology(id: string): ContentItem<TechnologyMeta> | undefined {
  return technologies[id.toLowerCase()]
}

// Verifica se uma tecnologia existe
export function hasTechnology(id: string): boolean {
  return id.toLowerCase() in technologies
}

// Funcao auxiliar para buscar uma pagina pelo ID
export function getPage(id: string): ContentItem<PageMeta> | undefined {
  return pages[id.toLowerCase()]
}

// Verifica se uma pagina existe
export function hasPage(id: string): boolean {
  return id.toLowerCase() in pages
}
