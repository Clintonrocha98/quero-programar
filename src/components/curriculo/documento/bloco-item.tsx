import { DicaButton } from '@/components/curriculo/dicas/dica-button'
import { BulletList } from '@/components/curriculo/inline/bullet-list'
import { InlineTextarea } from '@/components/curriculo/inline/inline-textarea'
import { ItemControls } from '@/components/curriculo/inline/item-controls'
import { useCurriculo } from '@/hooks/use-curriculo'
import { LIMITES } from '@/lib/curriculo-constants'
import type { Experiencia } from '@/types/curriculo'

export interface BlocoItemProps {
  experiencia: Experiencia
  blocoIndex: number
}

export function BlocoItem({ experiencia, blocoIndex }: BlocoItemProps) {
  const { dispatch } = useCurriculo()
  const bloco = experiencia.blocos[blocoIndex]
  const podeRemover = experiencia.blocos.length > 1

  return (
    <div className="group/bloco relative space-y-1">
      {podeRemover && (
        <ItemControls
          aoRemover={() =>
            dispatch({ type: 'removerBloco', experienciaId: experiencia.id, blocoIndex })
          }
          rotuloItem="bloco"
          className="absolute right-0 top-6 rounded bg-white/90 opacity-0 transition-opacity group-hover/bloco:opacity-100 group-focus-within/bloco:opacity-100"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <p className="font-sans text-[10px] uppercase tracking-wide text-neutral-400">
          Atuação e realizações
        </p>
        <DicaButton tipo="atuacao" />
      </div>

      <InlineTextarea
        valor={bloco.contexto}
        onChange={(valor) =>
          dispatch({
            type: 'atualizarBloco',
            experienciaId: experiencia.id,
            blocoIndex,
            patch: { contexto: valor },
          })
        }
        rotulo="Contexto do bloco"
        placeholder="Descreva o cenário, o produto ou o problema em que você atuou (não as tarefas)."
        className="text-justify text-sm leading-relaxed"
        maxSugerido={LIMITES.contextoMax}
      />

      <BulletList
        itens={bloco.realizacoes}
        onChange={(realizacoes) =>
          dispatch({
            type: 'atualizarBloco',
            experienciaId: experiencia.id,
            blocoIndex,
            patch: { realizacoes },
          })
        }
        rotuloItem="realização"
        textoAdicionar="adicionar realização"
        maxPorItem={LIMITES.realizacaoMax}
        minItens={LIMITES.realizacoesMin}
        maxItens={LIMITES.realizacoesMax}
        placeholder="Comece com um verbo e mostre resultado + meio (ex.: Implementei X para reduzir Y)"
      />
    </div>
  )
}
