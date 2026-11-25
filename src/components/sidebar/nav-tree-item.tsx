import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { NavItem } from '@/types/navigation'
import { useSidebar } from '@/hooks/use-sidebar'
import { useActiveRoute } from '@/hooks/use-active-route'
import { cn } from '@/lib/utils'

interface NavTreeItemProps {
  item: NavItem
  depth?: number
}

const recuoPorProfundidade = ['pl-3', 'pl-6', 'pl-9']

export function NavTreeItem({ item, depth = 0 }: NavTreeItemProps) {
  const { expandedItems, toggleItem, closeSidebar } = useSidebar()
  const { isActive, isParentOfActive } = useActiveRoute()

  const isExpanded = expandedItems.includes(item.id)
  const recuo = recuoPorProfundidade[depth] ?? 'pl-9'
  const badge = item.badge && (
    <span className="ml-auto font-mono text-[11px] lowercase text-primary">{item.badge}</span>
  )

  if (item.children && item.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => toggleItem(item.id)}
          className={cn(
            'flex w-full items-center gap-1.5 border-l border-metal-700 py-1.5 pr-3 text-left text-sm transition-colors hover:bg-metal-900 hover:text-metal-100',
            recuo,
            isParentOfActive(item.id) ? 'text-metal-100' : 'text-metal-400',
          )}
          aria-expanded={isExpanded}
        >
          <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 transition-transform', isExpanded && 'rotate-90')} />
          <span>{item.label}</span>
          {badge}
        </button>

        {isExpanded && item.children.map((child) => (
          <NavTreeItem key={child.id} item={child} depth={depth + 1} />
        ))}
      </div>
    )
  }

  if (!item.href) return null

  const ativo = isActive(item.id)

  return (
    <Link
      to={item.href}
      onClick={closeSidebar}
      className={cn(
        'flex items-center border-l border-metal-700 py-1.5 pr-3 text-sm transition-colors hover:bg-metal-900 hover:text-metal-100 hover:no-underline',
        recuo,
        ativo
          ? 'bg-metal-900 text-metal-100 shadow-[inset_2px_0_0_var(--primary)]'
          : 'text-metal-400',
      )}
      aria-current={ativo ? 'page' : undefined}
    >
      <span className="pl-5">{item.label}</span>
      {badge}
    </Link>
  )
}
