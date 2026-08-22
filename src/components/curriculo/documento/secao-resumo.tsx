import { DicaButton } from '@/components/curriculo/dicas/dica-button'
import { InlineTextarea } from '@/components/curriculo/inline/inline-textarea'
import { useCurriculo } from '@/hooks/use-curriculo'
import { LIMITES } from '@/lib/curriculo-constants'

export function SecaoResumo() {
  const { state, dispatch } = useCurriculo()

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <p className="font-sans text-[10px] uppercase tracking-wide text-neutral-400">
          Resumo profissional
        </p>
        <DicaButton tipo="resumo" />
      </div>
      <InlineTextarea
        valor={state.data.resumo.texto_resumo}
        onChange={(valor) => dispatch({ type: 'atualizarResumo', campo: 'texto_resumo', valor })}
        rotulo="Resumo profissional"
        placeholder="Objetivo, principais competências, o valor que você entrega e o seu diferencial."
        className="text-justify text-sm leading-relaxed"
        maxSugerido={LIMITES.textoResumoMax}
        minSugerido={LIMITES.textoResumoMin}
      />
    </div>
  )
}
