import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ComeceAgoraProps {
  acao: { rotulo: string; href: string }
  children: ReactNode
}

export function ComeceAgora({ acao, children }: ComeceAgoraProps) {
  return (
    <section
      aria-labelledby="comece-agora-titulo"
      className="not-prose mt-14 rounded-xl bg-gradient-to-r from-steel-blue-light to-cyan-accent p-px"
    >
      <div className="space-y-5 rounded-[calc(0.75rem-1px)] bg-metal-900 p-5 sm:p-6">
        <h2 id="comece-agora-titulo" className="text-2xl font-bold text-metal-100">
          Comece agora
        </h2>
        <div className="mentoria-passos text-metal-200">{children}</div>
        <div className="flex sm:justify-end">
          <Link
            to={acao.href}
            className="inline-flex w-full items-center justify-center rounded-lg bg-steel-blue px-5 py-2.5 text-sm font-semibold !text-metal-100 !no-underline transition-colors hover:ring-2 hover:ring-steel-blue-light/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent focus-visible:ring-offset-2 focus-visible:ring-offset-metal-900 sm:w-auto"
          >
            {acao.rotulo}
          </Link>
        </div>
      </div>
    </section>
  )
}
