import { Link } from "react-router-dom"
import { ArrowRight, Bug, Briefcase, BookOpen, FileText, Github, Handshake, Linkedin, Map, MessageSquare, Terminal } from "lucide-react"
import { technologiesForCards } from "@/data/content"
import { getTechnologyIcon } from "@/components/technology-icon"
import { cn } from "@/lib/utils"
import he4rtLogo from "@/assets/he4rt-logo.png"

const blocosSecundarios = [
  { href: "/guia/curriculo", titulo: "Modelo de Currículo", texto: "Monte o seu e exporte em PDF.", Icone: Briefcase },
  { href: "/mentoria", titulo: "Mentoria", texto: "Como pedir e como dar mentoria.", Icone: Handshake },
]

const atalhos = [
  { href: "/he4rt/4noobs", rotulo: "4Noobs", Icone: BookOpen },
  { href: "/como-debugar", rotulo: "Como Debugar", Icone: Bug },
  { href: "/recursos", rotulo: "Recursos", Icone: BookOpen },
  { href: "/artigos", rotulo: "Artigos", Icone: FileText },
]

const linksAutor = [
  { href: "https://github.com/clintonrocha98", rotulo: "GitHub", Icone: Github },
  { href: "https://www.linkedin.com/in/clintonrocha", rotulo: "LinkedIn", Icone: Linkedin },
]

const linksHe4rt = [
  { href: "https://github.com/he4rt/", rotulo: "GitHub He4rt", Icone: Github },
  { href: "https://discord.gg/xJNRcM4h", rotulo: "Discord He4rt", Icone: MessageSquare },
]

const bloco = "rounded-2xl border border-metal-800 bg-metal-900 p-5 transition-colors hover:border-metal-600 hover:no-underline"

function LinksExternos({ links }: { links: typeof linksAutor }) {
  return links.map(({ href, rotulo, Icone }) => (
    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-metal-100">
      <Icone className="h-4 w-4" />
      <span className="sr-only">{rotulo}</span>
    </a>
  ))
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100dvh-5rem)]">
      <header className="space-y-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-metal-700 bg-metal-800 px-3 py-1 text-sm text-steel-blue-light">
          <Terminal className="h-4 w-4" />
          <span>Aprenda de graça</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-metal-100 xl:text-4xl">
          Aprenda com o melhor que existe na{" "}
          <span className="bg-gradient-to-r from-steel-blue-light to-cyan-accent bg-clip-text text-transparent">web</span>.
        </h1>
        <p className="max-w-2xl text-metal-300">
          Conteúdos gratuitos e bem selecionados para quem aprende programação sozinho, do básico ao primeiro emprego.
        </p>
      </header>

      <div className="grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-4 lg:grid-rows-2">
        <Link to="/plano-de-estudos" className={cn(bloco, "group flex flex-col justify-between bg-gradient-to-br from-steel-blue/20 to-metal-900 lg:col-span-2 lg:row-span-2")}>
          <div className="space-y-3">
            <Map className="h-8 w-8 text-steel-blue-light" />
            <span className="block text-xs font-semibold uppercase tracking-wider text-cyan-accent">Comece aqui</span>
            <h2 className="m-0 text-2xl font-bold text-metal-100">Plano de Estudos</h2>
            <p className="text-metal-300">Um guia do que estudar antes de começar a programar.</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 font-semibold text-steel-blue-light">
            Abrir o plano <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className={cn(bloco, "flex flex-col justify-between lg:col-span-2")}>
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-lg font-bold text-metal-100">Tecnologias</h2>
            <Link to="/tecnologias" className="text-sm text-steel-blue-light">Ver todas →</Link>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-9">
            {technologiesForCards.map((tech) => (
              <Link
                key={tech.id}
                to={tech.url}
                title={tech.name}
                className="flex aspect-square items-center justify-center rounded-lg bg-metal-850 p-2 transition-transform hover:scale-110 [&_img]:h-7 [&_img]:w-7 [&_svg]:h-7 [&_svg]:w-7"
              >
                {getTechnologyIcon(tech.id)}
                <span className="sr-only">{tech.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {blocosSecundarios.map(({ href, titulo, texto, Icone }) => (
          <Link key={href} to={href} className={cn(bloco, "flex flex-col gap-2")}>
            <Icone className="h-6 w-6 text-emerald-accent" />
            <h2 className="m-0 text-lg font-bold text-metal-100">{titulo}</h2>
            <p className="text-sm text-metal-400">{texto}</p>
          </Link>
        ))}
      </div>

      <footer className="flex flex-col gap-3 border-t border-metal-800 pt-4 lg:flex-row lg:items-center lg:justify-between">
        <nav className="flex flex-wrap gap-2" aria-label="Atalhos">
          {atalhos.map(({ href, rotulo, Icone }) => (
            <Link key={href} to={href} className="inline-flex items-center gap-1.5 rounded-full border border-metal-700 bg-metal-900 px-3 py-1 text-sm text-metal-300 hover:border-metal-500 hover:text-metal-100 hover:no-underline">
              <Icone className="h-3.5 w-3.5" /> {rotulo}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm text-metal-400 xl:flex-row xl:gap-6">
          <div className="flex items-center gap-3">
            <img src={he4rtLogo} alt="" className="h-5 w-5 object-contain" />
            <span>Membro da <span className="font-medium text-metal-200">He4rt Developers</span></span>
            <LinksExternos links={linksHe4rt} />
          </div>
          <div className="flex items-center gap-3">
            <span>
              Feito por{" "}
              <a href="https://github.com/clintonrocha98" target="_blank" rel="noopener noreferrer" className="font-medium text-metal-200 hover:text-steel-blue-light">
                Clinton Rocha
              </a>
            </span>
            <LinksExternos links={linksAutor} />
          </div>
        </div>
      </footer>
    </div>
  )
}
