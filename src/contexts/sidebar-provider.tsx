import { useState, useCallback, ReactNode } from 'react'
import { SidebarContextValue } from '../types/navigation'
import { SidebarContext } from './sidebar-context'

interface SidebarProviderProps {
  children: ReactNode
  defaultExpanded?: string[]
}

/**
 * Provider para o estado global da sidebar
 */
export function SidebarProvider({ children, defaultExpanded = [] }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded)

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleItem = useCallback((id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }, [])

  const expandItem = useCallback((id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev : [...prev, id]
    )
  }, [])

  const collapseItem = useCallback((id: string) => {
    setExpandedItems(prev => prev.filter(item => item !== id))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedItems([])
  }, [])

  const value: SidebarContextValue = {
    isOpen,
    expandedItems,
    toggleSidebar,
    toggleItem,
    expandItem,
    collapseItem,
    collapseAll,
    closeSidebar,
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}
