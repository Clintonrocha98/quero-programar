import { ExternalLink } from "lucide-react"
import { ResourceProps } from "@/types"
import { cn } from "@/lib/utils"

export function ResourceLink({ resource }: { resource: ResourceProps }) {
  const getBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      curso: "bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30",
      leitura: "bg-steel-blue/20 text-steel-blue-light border border-steel-blue/30",
      artigo: "bg-amber-accent/20 text-amber-accent border border-amber-accent/30",
      ferramenta: "bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30",
      repositório: "bg-metal-600/50 text-metal-300 border border-metal-500/30",
      modelo: "bg-rose-accent/20 text-rose-accent border border-rose-accent/30",
      quiz: "bg-rose-accent/20 text-rose-accent border border-rose-accent/30",
      desafio: "bg-rose-accent/20 text-rose-accent border border-rose-accent/30",
      youtube: "bg-rose-accent/20 text-rose-accent border border-rose-accent/30",
      exercício: "bg-amber-accent/20 text-amber-accent border border-amber-accent/30",
      documentação: "bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30",
      recursos: "bg-steel-blue/20 text-steel-blue-light border border-steel-blue/30",
      roadmap: "bg-steel-blue/20 text-steel-blue-light border border-steel-blue/30",
      livro: "bg-amber-accent/20 text-amber-accent border border-amber-accent/30",
      tutorial: "bg-steel-blue/20 text-steel-blue-light border border-steel-blue/30",
      site: "bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30",
    }

    return colors[type.toLowerCase()] || "bg-metal-700/50 text-metal-300 border border-metal-600/30"
  }

  return (
    <div className="border border-metal-700/50 rounded-lg p-3 hover:bg-metal-800/50 hover:border-metal-600 transition-all duration-200">
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:no-underline group"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("inline-flex px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap", getBadgeColor(resource.type))}>
            {resource.type}
          </span>
          <div className="flex-1 font-medium text-metal-200 group-hover:text-steel-blue-light flex items-center gap-1 transition-colors">
            {resource.title}
            <ExternalLink className="h-3 w-3 inline opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        {resource.description && (
            <p className="text-sm text-metal-400 group-hover:text-metal-300 transition-colors font-normal">
                {resource.description}
            </p>
        )}
      </a>
    </div>
  )
}
