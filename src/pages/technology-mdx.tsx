import { useParams, Navigate } from "react-router-dom"
import { getTechnology, hasTechnology } from "@/data/content"

export default function TechnologyPage() {
  const { nome } = useParams()

  if (!nome || !hasTechnology(nome)) {
    return <Navigate to="/404" replace />
  }

  const technology = getTechnology(nome)

  if (!technology) {
    return <Navigate to="/404" replace />
  }

  const { Content, meta } = technology

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <div className="mb-12">
        <div className="flex items-center gap-6 mb-6">
          <span className={`inline-flex items-center justify-center w-16 h-16 rounded-xl text-white font-bold text-2xl shadow-lg shadow-black/20 ${meta.color}`}>
            {meta.icon}
          </span>
          <div>
            <h1 className="text-4xl font-bold text-metal-100 mb-2">{meta.title}</h1>
            <p className="text-xl text-metal-300">{meta.description}</p>
          </div>
        </div>
      </div>
      
      <article className="prose prose-invert prose-metal max-w-none">
        <Content />
      </article>
    </div>
  )
}
