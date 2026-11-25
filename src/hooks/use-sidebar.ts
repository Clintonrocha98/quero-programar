import { useContext } from 'react'
import { SidebarContextValue } from '@/types/navigation'
import { SidebarContext } from '@/contexts/sidebar-context'

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
  }
  return context
}
