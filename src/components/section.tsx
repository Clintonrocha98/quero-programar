interface SectionProps {
  title: string
  level?: "beginner" | "intermediate" | "advanced" | "tools"
  children: React.ReactNode
}

export function Section({ title, level, children }: SectionProps) {
  const levelStyles: Record<string, { badge: string; label: string }> = {
    beginner: {
      badge: "bg-green-100 text-green-800 border-green-200",
      label: "Iniciante",
    },
    intermediate: {
      badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Intermediario",
    },
    advanced: {
      badge: "bg-red-100 text-red-800 border-red-200",
      label: "Avancado",
    },
    tools: {
      badge: "bg-slate-100 text-slate-800 border-slate-200",
      label: "Ferramentas",
    },
  }

  const levelStyle = level ? levelStyles[level] : null

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-800 mb-0">{title}</h2>
        {levelStyle && (
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${levelStyle.badge}`}>
            {levelStyle.label}
          </span>
        )}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </section>
  )
}
