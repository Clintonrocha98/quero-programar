import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { NavItem } from '../types/navigation'
import { navigationConfig } from '../data/navigation'

/**
 * Hook para detectar a rota ativa e encontrar o item de navegação correspondente
 */
export function useActiveRoute() {
  const location = useLocation()
  const pathname = location.pathname

  const { activeItemId, parentId } = useMemo(() => {
    let foundActiveId: string | null = null
    let foundParentId: string | null = null

    // Primeira passagem: busca matches EXATOS (prioridade alta)
    const findExactMatch = (items: NavItem[], parentId: string | null = null): boolean => {
      for (const item of items) {
        // Verifica match exato
        if (item.href === pathname) {
          foundActiveId = item.id
          foundParentId = parentId
          return true
        }

        // Busca recursivamente nos filhos
        if (item.children && item.children.length > 0) {
          if (findExactMatch(item.children, item.id)) {
            return true
          }
        }
      }
      return false
    }

    // Segunda passagem: busca matches PARCIAIS (para rotas dinâmicas não mapeadas)
    const findPartialMatch = (items: NavItem[], parentId: string | null = null): boolean => {
      for (const item of items) {
        // Busca primeiro nos filhos para encontrar match mais específico
        if (item.children && item.children.length > 0) {
          if (findPartialMatch(item.children, item.id)) {
            return true
          }
        }

        // Verifica match parcial (rota começa com href + /)
        // Usa href + '/' para evitar falsos positivos (ex: /tecnologias não deve match /tecnologias-avancadas)
        if (item.href && item.href !== '/' && pathname.startsWith(item.href + '/')) {
          foundActiveId = item.id
          foundParentId = parentId
          return true
        }
      }
      return false
    }

    // Tenta primeiro match exato
    if (!findExactMatch(navigationConfig.items)) {
      // Se não encontrou, tenta match parcial
      findPartialMatch(navigationConfig.items)
    }

    return {
      activeItemId: foundActiveId,
      parentId: foundParentId
    }
  }, [pathname])

  return {
    pathname,
    activeItemId,
    parentId,
    isActive: (itemId: string) => itemId === activeItemId,
    isParentOfActive: (itemId: string) => itemId === parentId
  }
}
