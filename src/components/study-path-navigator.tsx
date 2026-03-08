import { useState, Children, isValidElement, ReactNode, ReactElement, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

interface StudyPathSectionProps {
  title: string
  children: ReactNode
  description?: string
}

export function StudyPathSection({ children }: StudyPathSectionProps) {
  return <>{children}</>
}

interface StudyPathNavigatorProps {
  children: ReactNode
  className?: string
}

export function StudyPathNavigator({ children, className }: StudyPathNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)

  const sections = Children.toArray(children).filter(
    (child): child is ReactElement<StudyPathSectionProps> => 
      isValidElement(child) && child.type === StudyPathSection
  )

  const activeSection = sections[activeIndex]
  const totalSections = sections.length

  // Scroll active tab into view when index changes
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.children[activeIndex] as HTMLElement
      if (activeTab) {
        const containerWidth = tabsRef.current.offsetWidth
        const tabLeft = activeTab.offsetLeft
        const tabWidth = activeTab.offsetWidth
        
        // Calculate scroll position to center the tab
        const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2)
        
        tabsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIndex])

  const goToNext = () => {
    if (activeIndex < totalSections - 1) {
      setActiveIndex(activeIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle case with no sections
  if (!activeSection) {
    return <div className="p-4 text-center text-metal-400">Nenhuma seção encontrada.</div>
  }

  return (
    <div className={cn("flex flex-col gap-8 min-h-[600px] mt-8", className)}>
      
      {/* Horizontal Tabs Navigation */}
      <div className="sticky top-[70px] z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-metal-900/95 backdrop-blur supports-[backdrop-filter]:bg-metal-900/60 py-2 border-b border-metal-800 rounded">
        <div 
          ref={tabsRef}
          className="relative flex overflow-x-auto no-scrollbar gap-2 pb-1 w-fit mx-auto max-w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((_, index) => {
            const isActive = activeIndex === index
            const isCompleted = activeIndex > index
            
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 border flex-shrink-0",
                  isActive
                    ? "bg-steel-blue text-white border-steel-blue font-medium shadow-lg shadow-steel-blue/20"
                    : isCompleted
                      ? "bg-metal-900 text-steel-blue border-steel-blue/30 hover:bg-metal-800"
                      : "bg-metal-900 text-metal-400 border-metal-800 hover:bg-metal-800 hover:text-metal-200"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <span className={cn(
                    "flex items-center justify-center w-4 h-4 rounded-full text-[10px] border",
                    isActive ? "border-white/50 text-white" : "border-metal-600 text-metal-500"
                  )}>
                    {index + 1}
                  </span>
                )}
                Fase {index + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header da fase ativa */}
          <div className="mb-8 border-b border-metal-800 pb-6">
            <div className="flex items-center gap-2 text-steel-blue text-xs font-bold mb-2 uppercase tracking-wide">
              Fase {activeIndex + 1} de {totalSections}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {activeSection.props.title}
            </h2>
            {activeSection.props.description && (
              <p className="text-metal-300 mt-3 text-lg leading-relaxed">
                {activeSection.props.description}
              </p>
            )}
          </div>

          {/* Conteúdo */}
          <div className="prose prose-invert prose-metal max-w-none mb-12">
            {activeSection}
          </div>

          {/* Navegação Inferior */}
          <div className="flex items-center justify-between pt-8 border-t border-metal-800 gap-4">
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                activeIndex === 0
                  ? "text-metal-600 cursor-not-allowed opacity-50"
                  : "text-metal-300 hover:text-white hover:bg-metal-800"
              )}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            <button
              onClick={goToNext}
              disabled={activeIndex === totalSections - 1}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors text-sm font-medium ml-auto",
                activeIndex === totalSections - 1
                  ? "text-metal-600 cursor-not-allowed bg-metal-900 opacity-50"
                  : "bg-steel-blue hover:bg-steel-blue-dark text-white shadow-lg shadow-steel-blue/20"
              )}
            >
              {activeIndex === totalSections - 1 ? (
                "Concluído"
              ) : (
                <>
                  Próxima Fase
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
