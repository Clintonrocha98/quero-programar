import { cn } from "@/lib/utils"

interface SectionProps {
  title: string
  level?: "beginner" | "intermediate" | "advanced" | "tools"
  children: React.ReactNode
}

export function Section({ title, level, children }: SectionProps) {
  const levelStyles: Record<string, { badge: string; label: string }> = {
    beginner: {
      badge: "bg-emerald-accent/20 text-emerald-accent border-emerald-accent/30",
      label: "Iniciante",
    },
    intermediate: {
      badge: "bg-amber-accent/20 text-amber-accent border-amber-accent/30",
      label: "Intermediário",
    },
    advanced: {
      badge: "bg-rose-accent/20 text-rose-accent border-rose-accent/30",
      label: "Avançado",
    },
    tools: {
      badge: "bg-steel-blue/20 text-steel-blue-light border-steel-blue/30",
      label: "Ferramentas",
    },
  }

  const levelStyle = level ? levelStyles[level] : null

  return (
    <section className="mb-8 rounded-xl border border-metal-800 bg-metal-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-metal-800">
        <h2 className="text-xl font-bold text-metal-100 m-0">{title}</h2>
        {levelStyle && (
          <span className={cn("inline-block rounded-full border px-3 py-1 text-xs font-medium", levelStyle.badge)}>
            {levelStyle.label}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}
