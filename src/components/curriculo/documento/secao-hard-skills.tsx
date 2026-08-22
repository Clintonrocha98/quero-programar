import { InlineTags } from '@/components/curriculo/inline/inline-tags'
import { useCurriculo } from '@/hooks/use-curriculo'

export function SecaoHardSkills() {
  const { state, dispatch } = useCurriculo()

  return (
    <section>
      <h2 className="text-[0.95em] font-bold uppercase tracking-wide border-b border-neutral-300 pb-1 mb-3 text-neutral-900">
        Hard Skills
      </h2>

      <div className="flex items-start gap-2 text-sm">
        <span className="select-none text-[0.7em] leading-[1.9]">●</span>
        <InlineTags
          tags={state.data.hard_skills}
          onChange={(skills) => dispatch({ type: 'definirHardSkills', skills })}
          rotulo="Hard skills"
          placeholder="Nova skill"
          ordenavel
        />
      </div>

      <p className="mt-1 font-sans text-[10px] text-neutral-400">
        Arraste para reordenar. Sugestão: linguagem → framework → ferramentas → testes → bancos →
        infra → front-end.
      </p>
    </section>
  )
}
