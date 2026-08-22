import { Plus } from 'lucide-react'
import { InlinePeriod } from '@/components/curriculo/inline/inline-period'
import { InlineSelect } from '@/components/curriculo/inline/inline-select'
import { InlineText } from '@/components/curriculo/inline/inline-text'
import { ItemControls } from '@/components/curriculo/inline/item-controls'
import { useCurriculo } from '@/hooks/use-curriculo'
import { NIVEIS_FORMACAO, NIVEIS_IDIOMA } from '@/lib/curriculo-constants'
import { formatarPeriodoFormacao } from '@/lib/curriculo-render'
import type { Certificacao, Formacao, Idioma } from '@/types/curriculo'

const CLASSES_TITULO =
  'text-[0.95em] font-bold uppercase tracking-wide border-b border-neutral-300 pb-1 mb-3 text-neutral-900'

const CLASSES_CONTROLES =
  'absolute right-0 top-0 rounded bg-white/90 opacity-0 transition-opacity group-hover/opc:opacity-100 group-focus-within/opc:opacity-100'

const CLASSES_BOTAO_ADICIONAR =
  'mt-3 inline-flex items-center gap-1 font-sans text-xs text-neutral-400 hover:text-neutral-700'

function LinhaFormacao({ item }: { item: Formacao }) {
  const { dispatch } = useCurriculo()

  return (
    <div className="group/opc relative">
      <ItemControls
        aoRemover={() => dispatch({ type: 'removerItemOpcional', secao: 'formacao', id: item.id })}
        rotuloItem="formação"
        className={CLASSES_CONTROLES}
      />
      <div className="flex flex-wrap items-baseline gap-x-1 text-sm">
        <InlineText
          valor={item.instituicao}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'formacao',
              id: item.id,
              patch: { instituicao: valor },
            })
          }
          rotulo="Instituição"
          placeholder="Instituição"
          autoDimensionar
          className="font-bold"
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={item.curso}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'formacao',
              id: item.id,
              patch: { curso: valor },
            })
          }
          rotulo="Curso"
          placeholder="Curso"
          autoDimensionar
        />
        <InlineSelect
          valor={item.nivel}
          opcoes={NIVEIS_FORMACAO}
          onChange={(valor) => {
            if (valor === '') return
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'formacao',
              id: item.id,
              patch: { nivel: valor },
            })
          }}
          rotulo="Nível de formação"
          className="text-xs text-neutral-500"
        />
        <span className="text-neutral-400">-</span>
        <InlinePeriod
          dataInicio={item.data_inicio}
          dataFim={item.data_fim}
          atual={item.em_andamento}
          onChange={({ data_inicio, data_fim, atual }) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'formacao',
              id: item.id,
              patch: { data_inicio, data_fim, em_andamento: atual },
            })
          }
          rotuloAtual="Em andamento"
          textoExibido={formatarPeriodoFormacao(item)}
        />
      </div>
    </div>
  )
}

function LinhaCertificacao({ item }: { item: Certificacao }) {
  const { dispatch } = useCurriculo()

  return (
    <div className="group/opc relative">
      <ItemControls
        aoRemover={() =>
          dispatch({ type: 'removerItemOpcional', secao: 'certificacoes', id: item.id })
        }
        rotuloItem="certificação"
        className={CLASSES_CONTROLES}
      />
      <div className="flex flex-wrap items-baseline gap-x-1 text-sm">
        <InlineText
          valor={item.nome}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'certificacoes',
              id: item.id,
              patch: { nome: valor },
            })
          }
          rotulo="Certificação"
          placeholder="Certificação"
          autoDimensionar
          className="font-bold"
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={item.emissor}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'certificacoes',
              id: item.id,
              patch: { emissor: valor },
            })
          }
          rotulo="Emissor"
          placeholder="Emissor"
          autoDimensionar
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={item.ano}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'certificacoes',
              id: item.id,
              patch: { ano: valor },
            })
          }
          rotulo="Ano"
          placeholder="Ano"
          autoDimensionar
        />
        <span className="text-neutral-400">-</span>
        <InlineText
          valor={item.url_credencial}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'certificacoes',
              id: item.id,
              patch: { url_credencial: valor },
            })
          }
          rotulo="URL da credencial"
          placeholder="URL da credencial"
          autoDimensionar
          className="text-xs text-neutral-500"
        />
      </div>
    </div>
  )
}

function LinhaIdioma({ item }: { item: Idioma }) {
  const { dispatch } = useCurriculo()

  return (
    <div className="group/opc relative">
      <ItemControls
        aoRemover={() => dispatch({ type: 'removerItemOpcional', secao: 'idiomas', id: item.id })}
        rotuloItem="idioma"
        className={CLASSES_CONTROLES}
      />
      <div className="flex flex-wrap items-baseline gap-x-1 text-sm">
        <InlineText
          valor={item.idioma}
          onChange={(valor) =>
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'idiomas',
              id: item.id,
              patch: { idioma: valor },
            })
          }
          rotulo="Idioma"
          placeholder="Idioma"
          autoDimensionar
          className="font-bold"
        />
        <span className="text-neutral-400">-</span>
        <InlineSelect
          valor={item.nivel}
          opcoes={NIVEIS_IDIOMA}
          onChange={(valor) => {
            if (valor === '') return
            dispatch({
              type: 'atualizarItemOpcional',
              secao: 'idiomas',
              id: item.id,
              patch: { nivel: valor },
            })
          }}
          rotulo="Nível de idioma"
        />
      </div>
    </div>
  )
}

export function SecoesOpcionais() {
  const { state, dispatch } = useCurriculo()
  const { opcionaisAtivos, data } = state

  return (
    <>
      {opcionaisAtivos.formacao && (
        <section>
          <h2 className={CLASSES_TITULO}>Formação</h2>
          <div className="space-y-3">
            {data.opcionais.formacao.map((item) => (
              <LinhaFormacao key={item.id} item={item} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'adicionarItemOpcional', secao: 'formacao' })}
            className={CLASSES_BOTAO_ADICIONAR}
          >
            <Plus className="h-3 w-3" />
            adicionar formação
          </button>
        </section>
      )}

      {opcionaisAtivos.certificacoes && (
        <section>
          <h2 className={CLASSES_TITULO}>Certificações</h2>
          <div className="space-y-3">
            {data.opcionais.certificacoes.map((item) => (
              <LinhaCertificacao key={item.id} item={item} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'adicionarItemOpcional', secao: 'certificacoes' })}
            className={CLASSES_BOTAO_ADICIONAR}
          >
            <Plus className="h-3 w-3" />
            adicionar certificação
          </button>
        </section>
      )}

      {opcionaisAtivos.idiomas && (
        <section>
          <h2 className={CLASSES_TITULO}>Idiomas</h2>
          <div className="space-y-3">
            {data.opcionais.idiomas.map((item) => (
              <LinhaIdioma key={item.id} item={item} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'adicionarItemOpcional', secao: 'idiomas' })}
            className={CLASSES_BOTAO_ADICIONAR}
          >
            <Plus className="h-3 w-3" />
            adicionar idioma
          </button>
        </section>
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-2 rounded border border-dashed border-neutral-300 bg-neutral-50 p-3 font-sans text-xs text-neutral-600">
        <span className="font-medium">Seções opcionais:</span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={opcionaisAtivos.formacao}
            onChange={() => dispatch({ type: 'alternarSecaoOpcional', secao: 'formacao' })}
          />
          Formação
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={opcionaisAtivos.certificacoes}
            onChange={() => dispatch({ type: 'alternarSecaoOpcional', secao: 'certificacoes' })}
          />
          Certificações
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={opcionaisAtivos.idiomas}
            onChange={() => dispatch({ type: 'alternarSecaoOpcional', secao: 'idiomas' })}
          />
          Idiomas
        </label>
      </div>
    </>
  )
}
