import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useSidebar } from '../../hooks/use-sidebar'
import { Sidebar } from './sidebar'
import { cn } from '../../lib/utils'

/**
 * Drawer da sidebar para dispositivos móveis.
 * Aparece como overlay quando aberto.
 */
export function SidebarDrawer() {
  const { isOpen, closeSidebar } = useSidebar()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Fecha o drawer ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeSidebar()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Previne scroll do body quando drawer está aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeSidebar])

  // Fecha com tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeSidebar])

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-metal-950 border-r border-metal-800 shadow-xl transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Header do Drawer */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-metal-800">
          <span className="font-bold text-lg text-metal-100">Menu</span>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md text-metal-300 hover:text-metal-100 hover:bg-metal-800 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo do Drawer */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>
      </div>
    </>
  )
}
