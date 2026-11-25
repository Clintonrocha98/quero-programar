import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { NavItem } from '@/types/navigation'
import { navigationConfig } from '@/data/navigation'

export function useActiveRoute() {
  const location = useLocation()
  const pathname = location.pathname

  const { activeItemId, parentIds } = useMemo(() => {
    let foundActiveId: string | null = null
    let foundParentIds: string[] = []

    const findExactMatch = (items: NavItem[], currentParentPath: string[] = []): boolean => {
      for (const item of items) {
        if (item.href === pathname) {
          foundActiveId = item.id
          foundParentIds = [...currentParentPath]
          return true
        }

        if (item.children && item.children.length > 0) {
          if (findExactMatch(item.children, [...currentParentPath, item.id])) {
            return true
          }
        }
      }
      return false
    }

    const findPartialMatch = (items: NavItem[], currentParentPath: string[] = []): boolean => {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          if (findPartialMatch(item.children, [...currentParentPath, item.id])) {
            return true
          }
        }

        // O "/" final evita que /tecnologias case com /tecnologias-avancadas.
        if (item.href && item.href !== '/' && pathname.startsWith(item.href + '/')) {
          foundActiveId = item.id
          foundParentIds = [...currentParentPath]
          return true
        }
      }
      return false
    }

    if (!findExactMatch(navigationConfig.items)) {
      findPartialMatch(navigationConfig.items)
    }

    return {
      activeItemId: foundActiveId,
      parentIds: foundParentIds
    }
  }, [pathname])

  return {
    pathname,
    activeItemId,
    parentIds,
    isActive: (itemId: string) => itemId === activeItemId,
    isParentOfActive: (itemId: string) => parentIds.includes(itemId)
  }
}
