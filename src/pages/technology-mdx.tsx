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
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className={`inline-flex items-center justify-center w-14 h-14 rounded-xl text-white font-bold text-xl ${meta.color}`}>
            {meta.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{meta.title}</h1>
            <p className="text-slate-600">{meta.description}</p>
          </div>
        </div>
      </div>
      
      <article className="prose prose-slate max-w-none">
        <Content />
      </article>
    </div>
  )
}
