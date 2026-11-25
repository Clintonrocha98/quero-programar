import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { technologiesForCards } from "@/data/content"
import { getTechnologyIcon } from "@/components/technology-icon"
import { cn } from "@/lib/utils"

const garantias = ["gratuito, sempre", "sem trilha obrigatória", "sem conta, sem cadastro", "curadoria de quem já passou por isso"]

const perguntasDaComunidade = [
  { pergunta: "onde eu aprendo javascript?", href: "/tecnologias/javascript" },
  { pergunta: "como eu monto meu currículo?", href: "/guia/curriculo" },
  { pergunta: "alguém pode me mentorar?", href: "/mentoria" },
  { pergunta: "meu código não funciona, e agora?", href: "/como-debugar" },
  { pergunta: "tem material da he4rt?", href: "/he4rt/4noobs" },
]

const painel = "rounded-xl border border-metal-700 bg-metal-900"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5">
      <section className={painel}>
        <div className="flex items-center gap-2 border-b border-metal-700 px-4 py-3" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-metal-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-metal-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-metal-700" />
          <span className="ml-3 font-mono text-xs text-metal-400">comunidade — por onde começar</span>
        </div>

        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-lg md:text-2xl">
              <span className="text-steel-blue-light">$ </span>
              <span className="inline-block overflow-hidden whitespace-nowrap align-bottom animate-digitar motion-reduce:animate-none">
                por onde eu começo?
              </span>
              <span className="inline-block h-[1.1em] w-[0.6ch] animate-piscar bg-primary align-[-0.15em] motion-reduce:animate-none" aria-hidden="true" />
            </p>

            <div className="mt-6 space-y-4 animate-responder motion-reduce:animate-none">
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-metal-100 lg:text-5xl">
                Pelo Plano de Estudos. Depois, escolha uma tecnologia.
              </h1>
              <p className="max-w-xl text-lg text-metal-400">
                As respostas que damos toda semana na comunidade, guardadas aqui. Tudo gratuito, com o porquê de cada indicação.
              </p>
              <Link
                to="/plano-de-estudos"
                className="inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-[filter,transform] hover:text-primary-foreground hover:no-underline hover:brightness-110 active:scale-[0.97]"
              >
                Abrir o Plano de Estudos
              </Link>
            </div>
          </div>

          <ul className="hidden space-y-1 font-mono text-[13px] text-metal-400 animate-responder motion-reduce:animate-none lg:block">
            {garantias.map((garantia) => (
              <li key={garantia}><span className="text-steel-blue-light">✓</span> {garantia}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className={cn(painel, "p-6")}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 text-lg font-semibold text-metal-100">Escolha uma tecnologia</h2>
            <Link to="/tecnologias" className="whitespace-nowrap font-mono text-xs text-metal-400 hover:text-metal-100 hover:no-underline">ls tecnologias/</Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {technologiesForCards.map((tech) => (
              <Link
                key={tech.id}
                to={tech.url}
                title={tech.name}
                className="flex min-w-0 items-center gap-2.5 rounded-lg border border-metal-700 bg-metal-850 px-3 py-2.5 text-sm text-metal-100 transition-colors hover:border-steel-blue-light hover:text-metal-100 hover:no-underline [&_img]:h-5 [&_img]:w-5 [&_svg]:h-5 [&_svg]:w-5"
              >
                {getTechnologyIcon(tech.id)}
                <span className="truncate">{tech.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={cn(painel, "p-6")}>
          <h2 className="m-0 text-lg font-semibold text-metal-100">Outras perguntas de toda semana</h2>
          <ul className="mt-3">
            {perguntasDaComunidade.map(({ pergunta, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex items-center justify-between gap-3 border-b border-dashed border-metal-700 py-2.5 font-mono text-[13px] text-metal-400 hover:text-metal-100 hover:no-underline"
                >
                  <span><span className="text-steel-blue-light">$ </span>{pergunta}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
