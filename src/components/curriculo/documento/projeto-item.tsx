import { DicaButton } from '@/components/curriculo/dicas/dica-button'
import { BulletList } from '@/components/curriculo/inline/bullet-list'
import { InlineSelect } from '@/components/curriculo/inline/inline-select'
import { InlineTags } from '@/components/curriculo/inline/inline-tags'
import { InlineText } from '@/components/curriculo/inline/inline-text'
import { InlineTextarea } from '@/components/curriculo/inline/inline-textarea'
import { ItemControls } from '@/components/curriculo/inline/item-controls'
import { useCurriculo } from '@/hooks/use-curriculo'
import { ESCOPOS_PROJETO, LIMITES } from '@/lib/curriculo-constants'
import type { Projeto } from '@/types/curriculo'

export interface ProjetoItemProps {
  projeto: Projeto
  indice: number
  total: number
}

export function ProjetoItem({ projeto, indice, total }: ProjetoItemProps) {
  const { dispatch } = useCurriculo()
  const temDestaquePreenchido = projeto.destaques.some((destaque) => destaque.trim() !== '')

  return (
    <div className="group/proj relative space-y-1.5">
      <ItemControls
        aoRemover={() => dispatch({ type: 'removerProjeto', id: projeto.id })}
        aoSubir={
          indice > 0
            ? () => dispatch({ type: 'moverProjeto', id: projeto.id, direcao: 'cima' })
            : undefined
        }
        aoDescer={
          indice < total - 1
            ? () => dispatch({ type: 'moverProjeto', id: projeto.id, direcao: 'baixo' })
            : undefined
        }
        rotuloItem="projeto"
        className="absolute right-0 top-0 rounded bg-white/90 opacity-0 transition-opacity group-hover/proj:opacity-100 group-focus-within/proj:opacity-100"
      />

      <div className="flex flex-wrap items-baseline gap-x-1 font-bold text-sm">
        <InlineText
          valor={projeto.nome}
          onChange={(valor) =>
            dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { nome: valor } })
          }
          rotulo="Nome do projeto"
          placeholder="Nome do projeto"
          autoDimensionar
        />
        <span className="text-neutral-400">-</span>
        <InlineSelect
          valor={projeto.escopo}
          opcoes={ESCOPOS_PROJETO}
          onChange={(valor) => {
            if (valor === '') return
            dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { escopo: valor } })
          }}
          rotulo="Escopo do projeto"
          className="text-sm font-bold"
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={projeto.link}
          onChange={(valor) =>
            dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { link: valor } })
          }
          rotulo="Link do projeto"
          placeholder="URL do repositório/demo"
          autoDimensionar
          className="font-normal text-xs text-neutral-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1 text-sm">
        <span className="font-semibold">Stack:</span>
        <InlineTags
          tags={projeto.stack}
          onChange={(stack) =>
            dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { stack } })
          }
          rotulo="Stack do projeto"
          placeholder="Nova tecnologia"
          ordenavel={false}
        />
      </div>

      <InlineTextarea
        valor={projeto.descricao}
        onChange={(valor) =>
          dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { descricao: valor } })
        }
        rotulo="Descrição do projeto"
        placeholder="O que o projeto faz, em 1–3 linhas."
        className="text-sm leading-relaxed"
        maxSugerido={LIMITES.descricaoProjetoMax}
      />

      <div className="flex items-center justify-between gap-2">
        <p className="font-sans text-[10px] uppercase tracking-wide text-neutral-400">
          Destaques
        </p>
        <DicaButton tipo="destaques" />
      </div>

      <BulletList
        itens={projeto.destaques}
        onChange={(destaques) =>
          dispatch({ type: 'atualizarProjeto', id: projeto.id, patch: { destaques } })
        }
        rotuloItem="destaque"
        textoAdicionar="adicionar destaque"
        maxPorItem={LIMITES.realizacaoMax}
        minItens={temDestaquePreenchido ? LIMITES.destaquesMin : undefined}
        maxItens={temDestaquePreenchido ? LIMITES.destaquesMax : undefined}
        placeholder="Decisão técnica ou funcionalidade que merece destaque"
      />
    </div>
  )
}
