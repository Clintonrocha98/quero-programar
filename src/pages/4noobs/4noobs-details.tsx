import { useParams, Navigate } from 'react-router-dom'
import { getFourNoobs, hasFourNoobs } from '../../data/content'

export default function FourNoobsCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()

  if (!categoryId || !hasFourNoobs(categoryId)) {
    return <Navigate to="/he4rt/4noobs" replace />
  }

  const categoryData = getFourNoobs(categoryId)
  
  if (!categoryData) {
    return <Navigate to="/he4rt/4noobs" replace />
  }

  const { meta, Content } = categoryData

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          {meta.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          {meta.description}
        </p>
      </div>

      <div className="prose prose-invert prose-metal max-w-none hover:prose-a:text-steel-blue-light/80">
        <Content />
      </div>
    </div>
  )
}
