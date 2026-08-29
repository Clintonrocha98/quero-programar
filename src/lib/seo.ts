import { fourNoobsData, technologies } from '@/data/content'
import seoData from '@/data/seo.json'

export interface SeoMeta {
  titulo: string
  descricao: string
  secao: string
}

const rotasEstaticas = seoData.rotas as Record<string, SeoMeta | undefined>

export const NOME_SITE = seoData.site.nome

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://quero-programar.pages.dev').replace(/\/+$/, '')

export const SEO_PADRAO: SeoMeta = {
  titulo: seoData.rotas['/'].titulo,
  descricao: seoData.site.descricao,
  secao: seoData.rotas['/'].secao,
}

/** Monta o titulo da aba a partir do titulo curto da pagina. */
export function montarTitulo(titulo: string): string {
  return titulo === NOME_SITE ? titulo : `${titulo} | ${NOME_SITE}`
}

function normalizarRota(pathname: string): string {
  const semBarraFinal = pathname.replace(/\/+$/, '')
  return semBarraFinal === '' ? '/' : semBarraFinal.toLowerCase()
}

function extrairId(rota: string, prefixo: string): string | null {
  if (!rota.startsWith(prefixo)) {
    return null
  }

  const id = rota.slice(prefixo.length)
  return id === '' || id.includes('/') ? null : id
}

/** Resolve os metadados de SEO de qualquer rota do site. */
export function resolverSeo(pathname: string): SeoMeta {
  const rota = normalizarRota(pathname)

  const estatica = rotasEstaticas[rota]
  if (estatica) {
    return estatica
  }

  const idTecnologia = extrairId(rota, '/tecnologias/')
  const tecnologia = idTecnologia ? technologies[idTecnologia] : undefined
  if (tecnologia) {
    return {
      titulo: tecnologia.meta.title,
      descricao: tecnologia.meta.description,
      secao: 'Tecnologias',
    }
  }

  const idCategoria = extrairId(rota, '/he4rt/4noobs/')
  const categoria = idCategoria ? fourNoobsData[idCategoria] : undefined
  if (categoria) {
    return {
      titulo: `${categoria.meta.title} 4Noobs`,
      descricao: categoria.meta.description,
      secao: 'He4rt 4Noobs',
    }
  }

  return SEO_PADRAO
}
