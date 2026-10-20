import { ReactNode } from 'react'
import { Sidebar, SidebarDrawer } from '../sidebar'
import Footer from '../footer'
import { cn } from '@/lib/utils'

type LarguraLayout = 'padrao' | 'media' | 'ampla'

interface AppLayoutProps {
  children: ReactNode
  largura?: LarguraLayout
}

const classesLargura: Record<LarguraLayout, string> = {
  padrao: 'max-w-4xl',
  media: 'max-w-6xl',
  ampla: 'max-w-[1440px]',
}

/**
 * Layout principal da aplicação com sidebar e conteúdo.
 *
 * Desktop (lg+): Sidebar fixa à esquerda, conteúdo à direita
 * Mobile (<lg): Drawer overlay, conteúdo ocupa tela toda
 */
export function AppLayout({ children, largura = 'padrao' }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-metal-950">
      {/* Drawer mobile */}
      <SidebarDrawer />

      {/* Sidebar Desktop - fixa à esquerda */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-metal-800 bg-metal-950 pt-4">
          <Sidebar showLogo />
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="lg:pl-64">
        <main className="min-h-[calc(100vh-4rem)] py-10">
          <div className={cn('container mx-auto px-4', classesLargura[largura])}>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
