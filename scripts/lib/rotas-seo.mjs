import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const RAIZ = new URL('../../', import.meta.url).pathname
const CONTEUDO = join(RAIZ, 'src/data/content')

function carregarEnv(arquivo) {
  if (!existsSync(arquivo)) {
    return
  }

  for (const linha of readFileSync(arquivo, 'utf8').split('\n')) {
    const par = /^\s*([\w.-]+)\s*=\s*(.*)$/.exec(linha)

    if (par && !par[1].startsWith('#')) {
      process.env[par[1]] ??= par[2].trim().replace(/^["']|["']$/g, '')
    }
  }
}

carregarEnv(join(RAIZ, '.env'))

const seoData = JSON.parse(readFileSync(join(RAIZ, 'src/data/seo.json'), 'utf8'))

export const SITE = seoData.site

export const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://quero-programar.pages.dev').replace(/\/+$/, '')

function lerFrontmatter(arquivo) {
  const fonte = readFileSync(arquivo, 'utf8')
  const bloco = /export const frontmatter\s*=\s*(\{[\s\S]*?\n\})/.exec(fonte)

  if (!bloco) {
    throw new Error(`Frontmatter nao encontrado em ${arquivo}`)
  }

  const frontmatter = new Function(`return ${bloco[1]}`)()

  if (!frontmatter.title || !frontmatter.description) {
    throw new Error(`Frontmatter sem title ou description em ${arquivo}`)
  }

  return frontmatter
}

function lerPasta(pasta, montarRota) {
  return readdirSync(join(CONTEUDO, pasta))
    .filter((arquivo) => arquivo.endsWith('.mdx'))
    .map((arquivo) => {
      const id = arquivo.replace(/\.mdx$/, '')
      const frontmatter = lerFrontmatter(join(CONTEUDO, pasta, arquivo))
      return montarRota(id, frontmatter)
    })
}

/** Converte o caminho da rota no nome de arquivo usado pela imagem OG. */
export function slugDaRota(caminho) {
  return caminho === '/' ? 'home' : caminho.replace(/^\//, '').replace(/\//g, '-')
}

/** Monta o titulo da aba a partir do titulo curto da pagina. */
export function montarTitulo(titulo) {
  return titulo === SITE.nome ? titulo : `${titulo} | ${SITE.nome}`
}

/** Lista todas as rotas do site com seus metadados de SEO. */
export function listarRotas() {
  const estaticas = Object.entries(seoData.rotas).map(([caminho, meta]) => ({ caminho, ...meta }))

  const tecnologias = lerPasta('technologies', (id, frontmatter) => ({
    caminho: `/tecnologias/${id}`,
    titulo: frontmatter.title,
    descricao: frontmatter.description,
    secao: 'Tecnologias',
  }))

  const categorias = lerPasta('4noobs', (id, frontmatter) => ({
    caminho: `/he4rt/4noobs/${id}`,
    titulo: `${frontmatter.title} 4Noobs`,
    descricao: frontmatter.description,
    secao: 'He4rt 4Noobs',
  }))

  return [...estaticas, ...tecnologias, ...categorias].map((rota) => ({
    ...rota,
    slug: slugDaRota(rota.caminho),
    tituloCompleto: montarTitulo(rota.titulo),
    url: `${SITE_URL}${rota.caminho}`,
    urlImagem: `${SITE_URL}/og/${slugDaRota(rota.caminho)}.png`,
  }))
}
