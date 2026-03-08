/**
 * Tipos para o sistema de navegação da sidebar
 */

export interface NavItem {
  id: string
  label: string
  icon?: string           // Nome do ícone Lucide
  href?: string           // Se definido, é um link final
  children?: NavItem[]    // Se definido, é expansível
  badge?: string          // Opcional: "Novo", "Em breve"
}

export interface NavigationConfig {
  items: NavItem[]
  defaultExpanded?: string[]  // IDs das categorias expandidas por padrão
}

export interface SidebarContextValue {
  isOpen: boolean
  expandedItems: string[]
  toggleSidebar: () => void
  toggleItem: (id: string) => void
  expandItem: (id: string) => void
  collapseItem: (id: string) => void
  collapseAll: () => void
  closeSidebar: () => void
}
