import { Plus } from 'lucide-react'
import { ProjetoItem } from '@/components/curriculo/documento/projeto-item'
import { useCurriculo } from '@/hooks/use-curriculo'

export function SecaoProjetos() {
  const { state, dispatch } = useCurriculo()
  const projetos = state.data.projetos

  return (
    <section>
      <h2 className="text-[0.95em] font-bold uppercase tracking-wide border-b border-neutral-300 pb-1 mb-3 text-neutral-900">
        Projetos
      </h2>

      <div className="space-y-5">
        {projetos.map((projeto, indice) => (
          <ProjetoItem key={projeto.id} projeto={projeto} indice={indice} total={projetos.length} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'adicionarProjeto' })}
        className="mt-4 inline-flex items-center gap-1 font-sans text-xs text-neutral-400 hover:text-neutral-700"
      >
        <Plus className="h-3 w-3" />
        adicionar projeto
      </button>
    </section>
  )
}
