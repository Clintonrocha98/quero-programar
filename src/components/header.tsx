import { Menu, Code } from "lucide-react"
import { useSidebar } from "../hooks/use-sidebar"
import { Link } from "react-router-dom"

/**
 * Header mobile com logo e botão hamburger
 * Visível apenas em telas menores que lg (< 1024px)
 */
export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full bg-metal-950/80 backdrop-blur-md border-b border-metal-800 shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-steel-blue-light" />
            <span className="font-bold text-xl text-metal-100">QueroProgramar</span>
          </Link>

          {/* Botão Hamburger */}
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center p-2 rounded-md text-metal-300 hover:text-metal-100 hover:bg-metal-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-steel-blue transition-colors"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
