import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, MessageSquare } from 'lucide-react'
import { navigationConfig } from '@/data/navigation'
import { useSidebar } from '@/hooks/use-sidebar'
import { useActiveRoute } from '@/hooks/use-active-route'
import { NavTreeItem } from './nav-tree-item'
import { cn } from '@/lib/utils'
import he4rtLogo from '@/assets/he4rt-logo.png'

interface SidebarProps {
  className?: string
  showLogo?: boolean
}

const linkExterno = 'text-metal-400 hover:text-metal-100'

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
      className={cn('flex h-full flex-1 flex-col', className)}
      aria-label="Navegação principal"
    >
      {showLogo && (
        <Link to="/" className="flex items-center px-5 pb-4 pt-1 font-mono text-[15px] font-semibold text-metal-100 hover:text-metal-100 hover:no-underline">
          <span className="text-primary">~/</span>quero-programar
        </Link>
      )}

      <div className="flex-1 space-y-0.5 px-3">
        {navigationConfig.items.map(item => (
          <NavTreeItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-metal-700 px-5 py-4 text-xs text-metal-400">
        <div className="flex items-center gap-2">
          <img src={he4rtLogo} alt="" className="h-4 w-4 object-contain" />
          <span className="flex-1">Membro da <span className="text-metal-200">He4rt Developers</span></span>
          <a href="https://discord.gg/xJNRcM4h" target="_blank" rel="noopener noreferrer" className={linkExterno}>
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Discord He4rt</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex-1">
            Feito por{' '}
            <a href="https://github.com/clintonrocha98" target="_blank" rel="noopener noreferrer" className="text-metal-200 hover:text-metal-100">Clinton Rocha</a>
          </span>
          <a href="https://github.com/clintonrocha98" target="_blank" rel="noopener noreferrer" className={linkExterno}>
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/clintonrocha" target="_blank" rel="noopener noreferrer" className={linkExterno}>
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
