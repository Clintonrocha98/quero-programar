import { Lightbulb, AlertTriangle, Star, Info } from "lucide-react"

interface TipProps {
  type?: "tip" | "warning" | "insight" | "info"
  children: React.ReactNode
}

export function Tip({ type = "tip", children }: TipProps) {
  const styles = {
    tip: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0" />,
      label: "Dica",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-800",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />,
      label: "Importante",
    },
    insight: {
      container: "bg-purple-50 border-purple-200 text-purple-800",
      icon: <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />,
      label: "Minha Opiniao",
    },
    info: {
      container: "bg-slate-50 border-slate-200 text-slate-700",
      icon: <Info className="h-5 w-5 text-slate-500 flex-shrink-0" />,
      label: "Info",
    },
  }

  const style = styles[type]

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 my-4 ${style.container}`}>
      {style.icon}
      <div className="flex-1">
        <span className="font-semibold text-sm">{style.label}:</span>
        <span className="ml-1 text-sm">{children}</span>
      </div>
    </div>
  )
}
