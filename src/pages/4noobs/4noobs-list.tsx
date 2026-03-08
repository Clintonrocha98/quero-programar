import { BookOpen } from 'lucide-react'
import TechnologyCard from '../../components/technology-card'
import { fourNoobsForCards } from '../../data/content'

export default function FourNoobsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-steel-blue-light" />
          4Noobs
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          Repositórios criados pela comunidade He4rt Developers para ajudar iniciantes a 
          entenderem linguagens de programação, frameworks e ferramentas essenciais para o mercado de trabalho.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fourNoobsForCards.map((category) => (
          <TechnologyCard
            key={category.id}
            language={category}
          />
        ))}
      </div>
    </div>
  )
}
