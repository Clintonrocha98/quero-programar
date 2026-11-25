import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code } from 'lucide-react'
import { navigationConfig } from '@/data/navigation'
import { useSidebar } from '@/hooks/use-sidebar'
import { useActiveRoute } from '@/hooks/use-active-route'
import { NavTreeItem } from './nav-tree-item'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  showLogo?: boolean
}

export function Sidebar({ className, showLogo = false }: SidebarProps) {
  const { expandItem } = useSidebar()
  const { parentIds } = useActiveRoute()

  useEffect(() => {
    if (parentIds && parentIds.length > 0) {
      parentIds.forEach(id => expandItem(id))
    }
  }, [parentIds, expandItem])

  return (
    <nav
      className={cn('flex flex-col h-full py-4', className)}
      aria-label="Navegação principal"
    >
      {showLogo && (
        <Link to="/" className="flex items-center space-x-2 px-6 pb-4 mb-2 border-b border-metal-800">
          <Code className="h-6 w-6 shrink-0 text-steel-blue-light" />
          <span className="font-bold text-xl text-metal-100">QueroProgramar</span>
        </Link>
      )}
      
      <div className="px-3 space-y-1">
        {navigationConfig.items.map(item => (
          <NavTreeItem key={item.id} item={item} />
        ))}
      </div>
    </nav>
  )
}
