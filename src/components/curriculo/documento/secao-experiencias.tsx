import { Plus } from 'lucide-react'
import { ExperienciaItem } from '@/components/curriculo/documento/experiencia-item'
import { useCurriculo } from '@/hooks/use-curriculo'
import { ordenarExperiencias } from '@/lib/curriculo-render'

const CLASSES_TITULO =
  'text-[0.95em] font-bold uppercase tracking-wide border-b border-neutral-300 pb-1 mb-3 text-neutral-900'

export function SecaoExperiencias() {
  const { state, dispatch, avisos } = useCurriculo()
  const experiencias = ordenarExperiencias(state.data.experiencias)
  const avisoAtual = avisos.find((aviso) => aviso.campo === 'experiencias.atual')

  return (
    <section>
      <h2 className={CLASSES_TITULO}>Experiências Profissionais</h2>

      {avisoAtual && (
        <p className="mb-2 font-sans text-[10px] text-amber-600">{avisoAtual.mensagem}</p>
      )}

      <p className="mb-3 font-sans text-[10px] text-neutral-400">
        As experiências são ordenadas automaticamente da mais recente para a mais antiga.
      </p>

      <div className="space-y-5">
        {experiencias.map((experiencia) => (
          <ExperienciaItem key={experiencia.id} experiencia={experiencia} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'adicionarExperiencia' })}
        className="mt-4 inline-flex items-center gap-1 font-sans text-xs text-neutral-400 hover:text-neutral-700"
      >
        <Plus className="h-3 w-3" />
        adicionar experiência
      </button>
    </section>
  )
}
