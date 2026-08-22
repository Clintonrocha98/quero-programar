import { Sparkles } from 'lucide-react'
import { DICAS } from '@/data/curriculo-dicas'
import { BotaoCopiarPrompt } from '@/components/curriculo/dicas/botao-copiar-prompt'

export function PainelDicas() {
  return (
    <aside className="hidden w-[300px] flex-shrink-0 space-y-4 2xl:block 2xl:sticky 2xl:top-24">
      <div className="flex items-center gap-2 text-white">
        <Sparkles className="h-4 w-4 text-cyan-accent" />
        <p className="font-semibold">Dicas de preenchimento</p>
      </div>
      <p className="text-sm text-metal-400">Prompts prontos para colar numa IA de sua confiança.</p>

      {Object.values(DICAS).map((dica) => (
        <div key={dica.tipo} className="space-y-2 rounded-lg border border-metal-700 bg-metal-900/50 p-4">
          <p className="font-semibold text-metal-100">{dica.titulo}</p>

          <ul className="space-y-1 text-sm text-metal-400">
            {dica.regras.map((regra) => (
              <li key={regra} className="flex gap-1.5">
                <span aria-hidden="true">•</span>
                <span>{regra}</span>
              </li>
            ))}
          </ul>

          <BotaoCopiarPrompt
            texto={dica.prompt}
            className="w-full justify-center rounded border border-cyan-accent/30 bg-cyan-accent/10 px-2 py-1.5 text-xs font-medium text-cyan-accent hover:bg-cyan-accent/20"
          />
        </div>
      ))}
    </aside>
  )
}
