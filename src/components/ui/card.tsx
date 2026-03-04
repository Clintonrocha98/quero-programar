import {cn} from "@/lib/utils"
import type {ReactNode} from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function Card({children, className}: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-gradient-to-b from-metal-850 to-metal-900",
        "border border-metal-700",
        "transition-all duration-300",
        "hover:border-metal-600",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.03] before:to-transparent before:pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({children, className}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "px-5 py-4",
        "border-b border-metal-700/50",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardContent({children, className}: CardContentProps) {
  return (
    <div className={cn("px-5 py-4", className)}>
      {children}
    </div>
  )
}

export function CardFooter({children, className}: CardFooterProps) {
  return (
    <div
      className={cn(
        "px-5 py-4",
        "border-t border-metal-700/50",
        "bg-metal-900/50",
        className
      )}
    >
      {children}
    </div>
  )
}
