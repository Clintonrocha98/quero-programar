import { Tag } from "@/components/ui/tag"

interface ContentSectionProps {
  title: string
  level?: "beginner" | "intermediate" | "advanced" | "tools"
  children: React.ReactNode
}

export function ContentSection({ title, level, children }: ContentSectionProps) {
  const levelConfig: Record<string, { variant: "success" | "warning" | "error" | "primary"; label: string }> = {
    beginner: {
      variant: "success",
      label: "Iniciante",
    },
    intermediate: {
      variant: "warning",
      label: "Intermediário",
    },
    advanced: {
      variant: "error",
      label: "Avançado",
    },
    tools: {
      variant: "primary",
      label: "Ferramentas",
    },
  }

  const config = level ? levelConfig[level] : null

  return (
    <section className="mb-8 rounded-xl border border-metal-800 bg-metal-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-metal-800 justify-between">
        <h2 className="text-xl font-bold text-metal-100 m-0">{title}</h2>
        {config && (
          <Tag variant={config.variant} size="sm">
            {config.label}
          </Tag>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}
