import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, GraduationCap, Handshake, MessageSquareText, Sparkles, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { CicloMentoria } from '@/components/mentoria/ciclo-mentoria'
import { DegrauAFrente } from '@/components/mentoria/degrau-a-frente'
import { estiloPapel } from '@/components/mentoria/papel'
import type { Papel } from '@/data/mentoria-guias'
import { cn } from '@/lib/utils'

const criteriosAutoavaliacao = [
  { id: 'etapa', label: 'Você já passou pela etapa que a outra pessoa vive agora.' },
  { id: 'erros', label: 'Você consegue contar o que deu errado com você, não só o que deu certo.' },
  { id: 'nao-sei', label: 'Você topa dizer "não sei" e buscar a resposta junto.' },
  { id: 'tempo', label: 'Você tem um tempo livre de vez em quando (ex.: 30 min a 1h).' },
]

interface CardTrilha {
  href: string
  titulo: string
  descricao: string
  Icone: LucideIcon
}

interface CardTrilhaPapel extends CardTrilha {
  papel: Papel
  bordaTopo: string
}

const trilhas: CardTrilhaPapel[] = [
  {
    href: '/mentoria/como-mentorar',
    titulo: 'Quero mentorar',
    descricao: 'Como oferecer ajuda, conduzir as conversas e cuidar do seu tempo, a partir do que você já viveu.',
    Icone: Users,
    papel: 'mentor',
    bordaTopo: 'border-t-steel-blue-light hover:border-t-steel-blue-light',
  },
  {
    href: '/mentoria/como-ser-mentorado',
    titulo: 'Quero ser mentorado',
    descricao: 'Como encontrar alguém, pedir uma conversa e chegar a cada sessão com uma pauta clara.',
    Icone: GraduationCap,
    papel: 'mentorado',
    bordaTopo: 'border-t-cyan-accent hover:border-t-cyan-accent',
  },
]

const ferramentas: CardTrilha[] = [
  {
    href: '/mentoria/roteiro',
    titulo: 'Roteiro da sessão',
    descricao: 'Um passo a passo de 30 ou 60 minutos com perguntas-guia.',
    Icone: Clock,
  },
  {
    href: '/mentoria/modelos',
    titulo: 'Modelos de mensagem',
    descricao: 'Mensagens prontas para pedir, combinar, recusar e encerrar.',
    Icone: MessageSquareText,
  },
]

export default function MentoriaHubPage() {
  const [marcados, setMarcados] = useState<Record<string, boolean>>({})

  const totalMarcados = criteriosAutoavaliacao.filter((criterio) => marcados[criterio.id]).length
  const prontoParaMentorar = totalMarcados === criteriosAutoavaliacao.length

  const alternarCriterio = (id: string) => {
    setMarcados((anterior) => ({ ...anterior, [id]: !anterior[id] }))
  }

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <Handshake className="w-10 h-10 text-steel-blue-light" aria-hidden="true" />
          Mentoria
        </h1>
        <p className="text-xl font-medium text-metal-100 max-w-3xl leading-relaxed">
          Você não precisa ser sênior para mentorar. Basta já ter passado pela etapa que outra pessoa vive agora.
        </p>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          A permissão para mentorar é por tema, não por cargo. Ninguém está pronto para tudo, mas você já
          está pronto para alguém.
        </p>
      </div>

      <section aria-labelledby="passo-a-frente-titulo">
        <Card>
          <div className="p-6 sm:p-8 space-y-6">
            <h2 id="passo-a-frente-titulo" className="text-xl font-bold text-metal-100 m-0">
              De quem já passou para quem está passando
            </h2>
            <DegrauAFrente perspectiva="neutra" disposicao="lado-a-lado" className="my-0" />
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trilhas.map(({ href, titulo, descricao, Icone, papel, bordaTopo }) => (
          <Card
            key={href}
            className={cn(
              'h-full border-t-2 hover:border-metal-500 hover:shadow-lg hover:shadow-metal-900/50 transition-all duration-300',
              bordaTopo,
            )}
          >
            <Link to={href} className="flex h-full flex-col p-6 hover:no-underline group">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    'p-3 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300',
                    estiloPapel[papel].texto,
                    estiloPapel[papel].fundo,
                  )}
                >
                  <Icone className="w-7 h-7" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-metal-100 group-hover:text-steel-blue-light transition-colors m-0">
                  {titulo}
                </h2>
              </div>
              <p className="flex-1 text-metal-300 group-hover:text-metal-200 transition-colors font-normal">
                {descricao}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel-blue-light">
                Começar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Card>
        ))}
      </div>

      <section aria-labelledby="autoavaliacao-titulo">
        <Card>
          <div className="p-6 space-y-4">
            <h2 id="autoavaliacao-titulo" className="text-xl font-bold text-metal-100 m-0">
              Você já pode mentorar alguém em um tema se:
            </h2>

            <ul className="space-y-2">
              {criteriosAutoavaliacao.map((criterio) => {
                const idCampo = `autoavaliacao-${criterio.id}`
                const marcado = !!marcados[criterio.id]

                return (
                  <li key={criterio.id}>
                    <label
                      htmlFor={idCampo}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-metal-800/30',
                        marcado && 'bg-metal-800/20',
                      )}
                    >
                      <input
                        id={idCampo}
                        type="checkbox"
                        checked={marcado}
                        onChange={() => alternarCriterio(criterio.id)}
                        className="mt-1 h-5 w-5 flex-shrink-0 cursor-pointer accent-steel-blue"
                      />
                      <span className={cn('transition-colors', marcado ? 'text-metal-300' : 'text-metal-100')}>
                        {criterio.label}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>

            <div aria-hidden="true" className="flex gap-1.5">
              {criteriosAutoavaliacao.map((criterio) => (
                <span
                  key={criterio.id}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-colors duration-200 motion-reduce:transition-none',
                    marcados[criterio.id] ? 'bg-emerald-accent' : 'bg-metal-700',
                  )}
                />
              ))}
            </div>

            <div aria-live="polite">
              {prontoParaMentorar ? (
                <div className="flex items-start gap-3 rounded-lg border border-emerald-accent/30 bg-emerald-accent/10 p-4 motion-safe:animate-surgir">
                  <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-accent" aria-hidden="true" />
                  <p className="text-metal-200">
                    Você já pode ajudar alguém. Que tal começar hoje?{' '}
                    <Link
                      to="/mentoria/modelos#oferta-publica"
                      className="font-semibold text-emerald-accent underline-offset-4 hover:underline"
                    >
                      Use o modelo de oferta pública
                    </Link>{' '}
                    e conte para quem está começando que você está disponível.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-metal-300">
                  {totalMarcados} de {criteriosAutoavaliacao.length} marcados
                </p>
              )}
            </div>
          </div>
        </Card>
      </section>

      <CicloMentoria destino="pagina-modelos" titulo="Como funciona uma mentoria" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ferramentas.map(({ href, titulo, descricao, Icone }) => (
          <Card key={href} className="h-full hover:border-metal-500 transition-all duration-300">
            <Link to={href} className="flex h-full items-start gap-3 p-4 hover:no-underline group">
              <div className="text-cyan-accent bg-cyan-accent/10 p-2 rounded-lg">
                <Icone className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-metal-100 group-hover:text-steel-blue-light transition-colors m-0">
                  {titulo}
                </h3>
                <p className="text-sm text-metal-300">{descricao}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
