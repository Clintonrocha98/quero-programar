import { cn } from "@/lib/utils"
import { ExternalLink, Github } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import type { ReactNode } from "react"

interface ResourceCardProps {
  title: string
  url: string
  type?: string
  author?: string
  children?: ReactNode
}

const typeVariants: Record<string, "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default" | "outline"> = {
  curso: "primary",
  leitura: "success",
  documentacao: "info",
  repositorio: "default",
  artigo: "warning",
  quiz: "error",
  ferramenta: "info",
  desafio: "warning",
  tutorial: "primary",
}

export function ResourceCard({ title, url, type, author, children }: ResourceCardProps) {
  const tagVariant = type ? typeVariants[type.toLowerCase()] || "default" : "default"

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg flex flex-col",
        "bg-gradient-to-b from-metal-850 to-metal-900",
        "border border-metal-700",
        "p-4 h-full",
        "transition-all duration-300",
        "hover:border-metal-600 hover:shadow-lg hover:shadow-metal-950/50",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.02] before:to-transparent before:pointer-events-none"
      )}
    >
      <div className="relative flex items-start gap-3 flex-none">
        <div className="flex flex-1 justify-between w-full">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "font-semibold text-metal-200",
              "transition-colors duration-200",
              "hover:text-steel-blue-light"
            )}
          >
            {title}
            <ExternalLink className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
          </a>
          {type && (
            <Tag variant={tagVariant} size="sm" className="ml-3">
              {type}
            </Tag>
          )}
        </div>
      </div>
      
      {children && (
        <div className="relative mt-3 text-sm leading-relaxed text-metal-400 flex-1">
          {children}
        </div>
      )}
      
      {author && (
        <div className="relative mt-4 pt-4 border-t border-metal-700/50 flex items-center gap-2 text-xs text-metal-400">
          <Github className="w-4 h-4 text-metal-500" />
          <span>Criado por <span className="text-metal-300 font-medium">{author}</span></span>
        </div>
      )}
    </div>
  )
}
