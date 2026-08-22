import { Plus } from 'lucide-react'
import { BlocoItem } from '@/components/curriculo/documento/bloco-item'
import { InlinePeriod } from '@/components/curriculo/inline/inline-period'
import { InlineSelect } from '@/components/curriculo/inline/inline-select'
import { InlineTags } from '@/components/curriculo/inline/inline-tags'
import { InlineText } from '@/components/curriculo/inline/inline-text'
import { ItemControls } from '@/components/curriculo/inline/item-controls'
import { useCurriculo } from '@/hooks/use-curriculo'
import { VINCULOS } from '@/lib/curriculo-constants'
import { periodoExperiencia } from '@/lib/curriculo-render'
import type { Experiencia } from '@/types/curriculo'

export interface ExperienciaItemProps {
  experiencia: Experiencia
}

export function ExperienciaItem({ experiencia }: ExperienciaItemProps) {
  const { dispatch, avisos } = useCurriculo()

  const prefixo = `experiencias.${experiencia.id}.`
  const avisosItem = avisos.filter(
    (aviso) => aviso.campo.startsWith(prefixo) && !aviso.campo.includes('.blocos.'),
  )
  const avisoPeriodo = avisosItem.some((aviso) => aviso.campo.startsWith(`${prefixo}data`))

  return (
    <div className="group/exp relative space-y-1.5">
      <ItemControls
        aoRemover={() => dispatch({ type: 'removerExperiencia', id: experiencia.id })}
        rotuloItem="experiência"
        className="absolute right-0 top-0 rounded bg-white/90 opacity-0 transition-opacity group-hover/exp:opacity-100 group-focus-within/exp:opacity-100"
      />

      <div className="flex flex-wrap items-baseline gap-x-1 font-bold text-sm">
        <InlineText
          valor={experiencia.empresa}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarExperiencia',
              id: experiencia.id,
              patch: { empresa: valor },
            })
          }
          rotulo="Empresa"
          placeholder="Empresa"
          autoDimensionar
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={experiencia.cargo}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarExperiencia',
              id: experiencia.id,
              patch: { cargo: valor },
            })
          }
          rotulo="Cargo"
          placeholder="Cargo"
          autoDimensionar
        />
        <InlineSelect
          valor={experiencia.vinculo ?? ''}
          opcoes={VINCULOS}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarExperiencia',
              id: experiencia.id,
              patch: { vinculo: valor === '' ? null : valor },
            })
          }
          rotulo="Vínculo"
          placeholder="Vínculo"
          permitirVazio
          className="text-xs font-normal text-neutral-500"
        />
        <span className="text-neutral-400">-</span>
        <InlinePeriod
          dataInicio={experiencia.data_inicio}
          dataFim={experiencia.data_fim}
          atual={experiencia.atual}
          onChange={(valores) =>
            dispatch({ type: 'atualizarExperiencia', id: experiencia.id, patch: valores })
          }
          rotuloAtual="Atuando"
          textoExibido={periodoExperiencia(experiencia)}
          aviso={avisoPeriodo}
        />
      </div>

      {avisosItem.length > 0 && (
        <div className="space-y-0.5">
          {avisosItem.map((aviso) => (
            <p key={aviso.campo} className="font-sans text-[10px] text-amber-600">
              {aviso.mensagem}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1 text-sm">
        <span className="font-semibold">Tecnologias:</span>
        <InlineTags
          tags={experiencia.tecnologias}
          onChange={(tecnologias) =>
            dispatch({
              type: 'atualizarExperiencia',
              id: experiencia.id,
              patch: { tecnologias },
            })
          }
          rotulo="Tecnologias da experiência"
          placeholder="Nova tecnologia"
          ordenavel={false}
        />
      </div>

      <div className="space-y-3">
        {experiencia.blocos.map((_, blocoIndex) => (
          <BlocoItem key={blocoIndex} experiencia={experiencia} blocoIndex={blocoIndex} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'adicionarBloco', experienciaId: experiencia.id })}
        title="Um bloco novo serve para descrever um contexto, cliente ou produto diferente dentro da mesma experiência."
        className="inline-flex items-center gap-1 font-sans text-xs text-neutral-400 hover:text-neutral-700"
      >
        <Plus className="h-3 w-3" />
        adicionar bloco de atuação
      </button>
    </div>
  )
}
