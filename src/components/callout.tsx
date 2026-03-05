import { cn } from "@/lib/utils"
import { Lightbulb, AlertTriangle, Star, Info } from "lucide-react"
import type { ReactNode } from "react"

type CalloutType = "tip" | "warning" | "insight" | "info"

interface CalloutProps {
  type?: CalloutType | string
  children: ReactNode
}

const calloutStyles: Record<
  CalloutType,
  {
    container: string
    iconWrapper: string
    icon: ReactNode
    label: string
  }
> = {
  tip: {
    container: "border-steel-blue/30 bg-steel-blue/10",
    iconWrapper: "bg-steel-blue/20 text-steel-blue-light",
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Dica",
  },
  warning: {
    container: "border-amber-accent/30 bg-amber-accent/10",
    iconWrapper: "bg-amber-accent/20 text-amber-accent",
    icon: <AlertTriangle className="h-4 w-4" />,
    label: "Importante",
  },
  insight: {
    container: "border-cyan-accent/30 bg-cyan-accent/10",
    iconWrapper: "bg-cyan-accent/20 text-cyan-accent",
    icon: <Star className="h-4 w-4" />,
    label: "Minha Opinião",
  },
  info: {
    container: "border-metal-600/50 bg-metal-800/50",
    iconWrapper: "bg-metal-700 text-metal-300",
    icon: <Info className="h-4 w-4" />,
    label: "Info",
  },
}

export function Callout({ type = "tip", children }: CalloutProps) {
  // Use a type guard or fallback for unknown types
  const calloutType = (calloutStyles[type as CalloutType] ? type : "tip") as CalloutType
  const style = calloutStyles[calloutType]

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-4 mb-4",
        "transition-all duration-300",
        style.container
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
          style.iconWrapper
        )}
      >
        {style.icon}
      </div>
      <div className="flex-1 pt-0.5">
        <span className="font-semibold text-sm text-metal-200">
          {style.label}:
        </span>
        <span className="ml-1 text-sm text-metal-300">{children}</span>
      </div>
    </div>
  )
}
