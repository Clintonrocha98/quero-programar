import { ExternalLink } from "lucide-react"

interface ResourceCardProps {
  title: string
  url: string
  type?: string
  children?: React.ReactNode
}

export function ResourceCard({ title, url, type, children }: ResourceCardProps) {
  const typeColors: Record<string, string> = {
    curso: "bg-blue-100 text-blue-800",
    leitura: "bg-green-100 text-green-800",
    documentacao: "bg-purple-100 text-purple-800",
    repositorio: "bg-gray-100 text-gray-800",
    artigo: "bg-yellow-100 text-yellow-800",
    quiz: "bg-pink-100 text-pink-800",
    ferramenta: "bg-cyan-100 text-cyan-800",
    desafio: "bg-orange-100 text-orange-800",
    tutorial: "bg-indigo-100 text-indigo-800",
  }

  const typeColor = type ? typeColors[type.toLowerCase()] || "bg-slate-100 text-slate-800" : ""

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            {title}
            <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
          </a>
          {type && (
            <span className={`ml-3 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColor}`}>
              {type}
            </span>
          )}
        </div>
      </div>
      {children && (
        <div className="mt-2 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}
