import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { NavItem } from '../../types/navigation'
import { useSidebar } from '../../hooks/use-sidebar'
import { useActiveRoute } from '../../hooks/use-active-route'
import { cn } from '../../lib/utils'
import { getIcon } from './sidebar-icons.tsx'

interface NavTreeItemProps {
  item: NavItem
  depth?: number
}

/**
 * Item individual da árvore de navegação.
 * Pode ser:
 * - Expansível (tem children)
 * - Link final (tem href)
 * 
 * Renderiza recursivamente seus filhos se expansível.
 */
export function NavTreeItem({ item, depth = 0 }: NavTreeItemProps) {
  const { expandedItems, toggleItem, closeSidebar } = useSidebar()
  const { isActive, isParentOfActive } = useActiveRoute()
  
  const isExpanded = expandedItems.includes(item.id)
  const hasChildren = item.children && item.children.length > 0
  const isCurrentActive = isActive(item.id)
  const isParent = isParentOfActive(item.id)
  
  const paddingLeft = depth === 0 ? 'pl-3' : depth === 1 ? 'pl-6' : 'pl-9'
  
  const Icon = item.icon ? getIcon(item.icon) : null

  // Se tem filhos, renderiza como botão expansível
  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleItem(item.id)}
          className={cn(
            'w-full flex items-center justify-between py-2 pr-3 text-sm font-medium rounded-md transition-colors',
            paddingLeft,
            isParent
              ? 'text-steel-blue-light bg-metal-800/50'
              : 'text-metal-300 hover:text-metal-100 hover:bg-metal-800/50'
          )}
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.label}</span>
            {item.badge && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-steel-blue/20 text-steel-blue-light">
                {item.badge}
              </span>
            )}
          </span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        
        {isExpanded && item.children && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => (
              <NavTreeItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Se tem href, renderiza como link
  if (item.href) {
    return (
      <Link
        to={item.href}
        onClick={closeSidebar}
        className={cn(
          'flex items-center gap-2 py-2 pr-3 text-sm rounded-md transition-colors',
          paddingLeft,
          isCurrentActive
            ? 'text-steel-blue-light bg-steel-blue/10 font-medium'
            : 'text-metal-300 hover:text-metal-100 hover:bg-metal-800/50'
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{item.label}</span>
        {item.badge && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-steel-blue/20 text-steel-blue-light">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  // Fallback para itens sem href nem children (como "Em breve")
  return (
    <div
      className={cn(
        'flex items-center gap-2 py-2 pr-3 text-sm text-metal-500 rounded-md cursor-not-allowed',
        paddingLeft
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{item.label}</span>
      {item.badge && (
        <span className="text-xs px-1.5 py-0.5 rounded bg-metal-800 text-metal-400">
          {item.badge}
        </span>
      )}
    </div>
  )
}
