import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getMentoriaPage, mentoriaPages } from '@/data/content'
import NotFound from '@/pages/not-found'

export default function MentoriaPagina() {
  const { pagina = '' } = useParams()
  const { hash } = useLocation()
  const page = getMentoriaPage(pagina)

  useEffect(() => {
    const alvo = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null

    if (alvo) {
      alvo.scrollIntoView()
      return
    }

    window.scrollTo(0, 0)
  }, [pagina, hash])

  if (!page) {
    return <NotFound />
  }

  const { Content, meta } = page
  const outrasPaginas = Object.entries(mentoriaPages).filter(([id]) => id !== pagina.toLowerCase())

  return (
    <div className="space-y-10">
      <Breadcrumb items={[{ label: 'Mentoria', href: '/mentoria' }, { label: meta.title }]} />

      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-metal-100 bg-gradient-to-r from-steel-blue-light to-cyan-accent bg-clip-text text-transparent inline-block">
          {meta.title}
        </h1>
        <p className="text-lg text-metal-300 max-w-2xl leading-relaxed">{meta.description}</p>
      </header>

      <article className="mentoria-artigo prose prose-invert prose-metal max-w-none prose-headings:text-metal-100 prose-p:text-metal-300 prose-strong:text-steel-blue-light">
        <Content />
      </article>

      <nav aria-labelledby="mentoria-continue" className="border-t border-metal-800 pt-8">
        <h2 id="mentoria-continue" className="text-lg font-semibold text-metal-100 mb-4">
          Continue pela seção
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {outrasPaginas.map(([id, item]) => (
            <li key={id}>
              <Link
                to={`/mentoria/${id}`}
                className="group flex h-full flex-col gap-1 rounded-lg border border-metal-700 bg-metal-900/50 p-4 transition-colors hover:border-metal-500 hover:no-underline"
              >
                <span className="inline-flex items-center gap-1 font-semibold text-metal-100 group-hover:text-steel-blue-light transition-colors">
                  {item.meta.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="text-sm text-metal-300">{item.meta.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
