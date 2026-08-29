import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { SITE, SITE_URL, listarRotas } from './lib/rotas-seo.mjs'

const RAIZ = new URL('../', import.meta.url).pathname
const DIST = join(RAIZ, 'dist')
const MARCADOR = /<!--seo-->[\s\S]*?<!--\/seo-->/

function escapar(valor) {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function montarTags(rota) {
  const titulo = escapar(rota.tituloCompleto)
  const descricao = escapar(rota.descricao)

  return [
    '<!--seo-->',
    `<title>${titulo}</title>`,
    `<meta name="description" content="${descricao}" />`,
    `<link rel="canonical" href="${rota.url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapar(SITE.nome)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${rota.url}" />`,
    `<meta property="og:title" content="${titulo}" />`,
    `<meta property="og:description" content="${descricao}" />`,
    `<meta property="og:image" content="${rota.urlImagem}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${titulo}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    '<!--/seo-->',
  ].join('\n  ')
}

function caminhoDoArquivo(rota) {
  return rota.caminho === '/' ? join(DIST, 'index.html') : join(DIST, `${rota.caminho.slice(1)}.html`)
}

function gerarSitemap(rotas) {
  const urls = rotas.map((rota) => `  <url>\n    <loc>${rota.url}</loc>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function gerarRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

if (!MARCADOR.test(template)) {
  throw new Error('Marcador <!--seo--> nao encontrado em dist/index.html')
}

const rotas = listarRotas()

for (const rota of rotas) {
  const html = template.replace(MARCADOR, montarTags(rota))
  const arquivo = caminhoDoArquivo(rota)
  mkdirSync(dirname(arquivo), { recursive: true })
  writeFileSync(arquivo, html)
}

writeFileSync(join(DIST, 'sitemap.xml'), gerarSitemap(rotas))
writeFileSync(join(DIST, 'robots.txt'), gerarRobots())

console.log(`html: ${rotas.length} paginas, sitemap.xml e robots.txt gerados em dist`)
