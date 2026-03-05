import { getPage } from "@/data/content"

export default function StudyPlanPage() {
  const page = getPage("study-plan")
  
  if (!page) {
    return (
      <div className="container min-h-screen mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-metal-100">Conteúdo não encontrado</h1>
        <p className="text-metal-400">O plano de estudos que você procura não está disponível.</p>
      </div>
    )
  }

  const { Content, meta } = page

  return (
    <div className="container min-h-screen mx-auto px-4 max-w-4xl py-10">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-metal-100 bg-gradient-to-r from-steel-blue-light to-cyan-accent bg-clip-text text-transparent inline-block">
          {meta.title}
        </h1>
        <p className="text-lg text-metal-300 max-w-2xl mx-auto leading-relaxed">
          {meta.description}
        </p>
      </header>

      <article className="prose prose-invert prose-metal max-w-none prose-headings:text-metal-100 prose-p:text-metal-300 prose-strong:text-steel-blue-light">
        <Content />
      </article>
    </div>
  )
}
