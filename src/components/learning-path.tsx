import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface LearningPathProps {
  children: ReactNode
  className?: string
}

interface LearningPathItemProps {
  children: ReactNode
  isLast?: boolean
}

export function LearningPath({ children, className }: LearningPathProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}

export function LearningPathItem({ children, isLast = false }: LearningPathItemProps) {
  return (
    <div className="relative flex gap-4">
      {/* Timeline connector */}
      <div className="relative flex flex-col items-center">
        {/* Node dot */}
        <div
          className={cn(
            "relative z-10 flex h-4 w-4 items-center justify-center",
            "rounded-full border-2 border-steel-blue bg-metal-900",
            "shadow-[0_0_8px_rgba(74,111,165,0.4)]"
          )}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-steel-blue-light" />
        </div>
        
        {/* Connecting line */}
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1 min-h-[24px]",
              "bg-gradient-to-b from-steel-blue/60 via-metal-700 to-metal-700/50"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        {children}
      </div>
    </div>
  )
}

// Componente auxiliar para wrapper de conteudo na timeline
interface LearningPathContentProps {
  children: ReactNode
  className?: string
}

export function LearningPathContent({ children, className }: LearningPathContentProps) {
  return (
    <div className={cn("-mt-1", className)}>
      {children}
    </div>
  )
}
