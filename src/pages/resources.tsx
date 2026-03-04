import { getPage } from "@/data/content"

export default function ResourcesPage() {
  const page = getPage("resources")
  
  if (!page) {
    return <div>Conteudo nao encontrado</div>
  }

  const { Content, meta } = page

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          {meta.title}
        </h1>
        <p className="text-slate-600 max-w-2xl">
          {meta.description}
        </p>
      </header>

      <article className="prose prose-slate max-w-none">
        <Content />
      </article>
    </div>
  )
}






