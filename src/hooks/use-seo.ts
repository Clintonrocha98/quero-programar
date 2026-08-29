import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, montarTitulo, resolverSeo } from '@/lib/seo'

function definirConteudo(seletor: string, valor: string): void {
  document.querySelector(seletor)?.setAttribute('content', valor)
}

/** Sincroniza titulo e meta tags com a rota atual durante a navegacao no cliente. */
export function useSeo(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    const { titulo, descricao } = resolverSeo(pathname)
    const tituloCompleto = montarTitulo(titulo)
    const url = `${SITE_URL}${pathname}`

    document.title = tituloCompleto
    definirConteudo('meta[name="description"]', descricao)
    definirConteudo('meta[property="og:title"]', tituloCompleto)
    definirConteudo('meta[property="og:description"]', descricao)
    definirConteudo('meta[property="og:url"]', url)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [pathname])
}
