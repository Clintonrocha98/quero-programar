import {
  novaCertificacao,
  novaExperiencia,
  novaFormacao,
  novoBloco,
  novoIdioma,
  novoProjeto,
} from '@/lib/curriculo-constants'
import { estadoDoModelo } from '@/data/curriculo-modelo'
import type {
  BlocoExperiencia,
  Certificacao,
  CurriculoBuilderState,
  CurriculoHeader,
  CurriculoOpcionais,
  CurriculoResumo,
  Experiencia,
  Formacao,
  Idioma,
  Projeto,
  SecaoOpcional,
} from '@/types/curriculo'

export type CurriculoAction =
  | { type: 'hidratar'; state: CurriculoBuilderState }
  | { type: 'atualizarHeader'; campo: keyof CurriculoHeader; valor: string }
  | { type: 'atualizarResumo'; campo: keyof CurriculoResumo; valor: string }
  | { type: 'adicionarExperiencia' }
  | { type: 'removerExperiencia'; id: string }
  | {
      type: 'atualizarExperiencia'
      id: string
      patch: Partial<Omit<Experiencia, 'id' | 'blocos'>>
    }
  | { type: 'adicionarBloco'; experienciaId: string }
  | { type: 'removerBloco'; experienciaId: string; blocoIndex: number }
  | {
      type: 'atualizarBloco'
      experienciaId: string
      blocoIndex: number
      patch: Partial<BlocoExperiencia>
    }
  | { type: 'definirHardSkills'; skills: string[] }
  | { type: 'adicionarProjeto' }
  | { type: 'removerProjeto'; id: string }
  | { type: 'atualizarProjeto'; id: string; patch: Partial<Omit<Projeto, 'id'>> }
  | { type: 'moverProjeto'; id: string; direcao: 'cima' | 'baixo' }
  | { type: 'alternarSecaoOpcional'; secao: SecaoOpcional }
  | { type: 'adicionarItemOpcional'; secao: SecaoOpcional }
  | { type: 'removerItemOpcional'; secao: SecaoOpcional; id: string }
  | {
      type: 'atualizarItemOpcional'
      secao: SecaoOpcional
      id: string
      patch: Partial<Formacao> | Partial<Certificacao> | Partial<Idioma>
    }
  | { type: 'restaurarModelo' }

function adicionarItemNaSecao(
  opcionais: CurriculoOpcionais,
  secao: SecaoOpcional,
): CurriculoOpcionais {
  switch (secao) {
    case 'formacao':
      return { ...opcionais, formacao: [...opcionais.formacao, novaFormacao()] }
    case 'certificacoes':
      return { ...opcionais, certificacoes: [...opcionais.certificacoes, novaCertificacao()] }
    case 'idiomas':
      return { ...opcionais, idiomas: [...opcionais.idiomas, novoIdioma()] }
    default:
      throw new Error(`Seção opcional desconhecida: ${String(secao)}`)
  }
}

function removerItemDaSecao(
  opcionais: CurriculoOpcionais,
  secao: SecaoOpcional,
  id: string,
): CurriculoOpcionais {
  switch (secao) {
    case 'formacao':
      return { ...opcionais, formacao: opcionais.formacao.filter((item) => item.id !== id) }
    case 'certificacoes':
      return {
        ...opcionais,
        certificacoes: opcionais.certificacoes.filter((item) => item.id !== id),
      }
    case 'idiomas':
      return { ...opcionais, idiomas: opcionais.idiomas.filter((item) => item.id !== id) }
    default:
      throw new Error(`Seção opcional desconhecida: ${String(secao)}`)
  }
}

function atualizarItemDaSecao(
  opcionais: CurriculoOpcionais,
  secao: SecaoOpcional,
  id: string,
  patch: Partial<Formacao> | Partial<Certificacao> | Partial<Idioma>,
): CurriculoOpcionais {
  switch (secao) {
    case 'formacao':
      return {
        ...opcionais,
        formacao: opcionais.formacao.map((item) =>
          item.id === id ? { ...item, ...(patch as Partial<Formacao>) } : item,
        ),
      }
    case 'certificacoes':
      return {
        ...opcionais,
        certificacoes: opcionais.certificacoes.map((item) =>
          item.id === id ? { ...item, ...(patch as Partial<Certificacao>) } : item,
        ),
      }
    case 'idiomas':
      return {
        ...opcionais,
        idiomas: opcionais.idiomas.map((item) =>
          item.id === id ? { ...item, ...(patch as Partial<Idioma>) } : item,
        ),
      }
    default:
      throw new Error(`Seção opcional desconhecida: ${String(secao)}`)
  }
}

export function curriculoReducer(
  state: CurriculoBuilderState,
  action: CurriculoAction,
): CurriculoBuilderState {
  switch (action.type) {
    case 'hidratar':
      return action.state

    case 'atualizarHeader':
      return {
        ...state,
        data: {
          ...state.data,
          header: { ...state.data.header, [action.campo]: action.valor },
        },
      }

    case 'atualizarResumo':
      return {
        ...state,
        data: {
          ...state.data,
          resumo: { ...state.data.resumo, [action.campo]: action.valor },
        },
      }

    case 'adicionarExperiencia':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: [...state.data.experiencias, novaExperiencia()],
        },
      }

    case 'removerExperiencia':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: state.data.experiencias.filter(
            (experiencia) => experiencia.id !== action.id,
          ),
        },
      }

    case 'atualizarExperiencia':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: state.data.experiencias.map((experiencia) => {
            if (experiencia.id !== action.id) return experiencia

            const patch =
              action.patch.atual === true ? { ...action.patch, data_fim: null } : action.patch

            return { ...experiencia, ...patch }
          }),
        },
      }

    case 'adicionarBloco':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: state.data.experiencias.map((experiencia) =>
            experiencia.id === action.experienciaId
              ? { ...experiencia, blocos: [...experiencia.blocos, novoBloco()] }
              : experiencia,
          ),
        },
      }

    case 'removerBloco':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: state.data.experiencias.map((experiencia) =>
            experiencia.id === action.experienciaId
              ? {
                  ...experiencia,
                  blocos: experiencia.blocos.filter((_, index) => index !== action.blocoIndex),
                }
              : experiencia,
          ),
        },
      }

    case 'atualizarBloco':
      return {
        ...state,
        data: {
          ...state.data,
          experiencias: state.data.experiencias.map((experiencia) =>
            experiencia.id === action.experienciaId
              ? {
                  ...experiencia,
                  blocos: experiencia.blocos.map((bloco, index) =>
                    index === action.blocoIndex ? { ...bloco, ...action.patch } : bloco,
                  ),
                }
              : experiencia,
          ),
        },
      }

    case 'definirHardSkills':
      return { ...state, data: { ...state.data, hard_skills: action.skills } }

    case 'adicionarProjeto':
      return {
        ...state,
        data: { ...state.data, projetos: [...state.data.projetos, novoProjeto()] },
      }

    case 'removerProjeto':
      return {
        ...state,
        data: {
          ...state.data,
          projetos: state.data.projetos.filter((projeto) => projeto.id !== action.id),
        },
      }

    case 'atualizarProjeto':
      return {
        ...state,
        data: {
          ...state.data,
          projetos: state.data.projetos.map((projeto) =>
            projeto.id === action.id ? { ...projeto, ...action.patch } : projeto,
          ),
        },
      }

    case 'moverProjeto': {
      const indice = state.data.projetos.findIndex((projeto) => projeto.id === action.id)
      if (indice === -1) return state

      const indiceDestino = action.direcao === 'cima' ? indice - 1 : indice + 1
      if (indiceDestino < 0 || indiceDestino >= state.data.projetos.length) return state

      const projetos = [...state.data.projetos]
      const [projeto] = projetos.splice(indice, 1)
      projetos.splice(indiceDestino, 0, projeto)

      return { ...state, data: { ...state.data, projetos } }
    }

    case 'alternarSecaoOpcional': {
      const ativando = !state.opcionaisAtivos[action.secao]
      const opcionaisAtivos = { ...state.opcionaisAtivos, [action.secao]: ativando }
      const listaVazia = state.data.opcionais[action.secao].length === 0

      if (!ativando || !listaVazia) {
        return { ...state, opcionaisAtivos }
      }

      return {
        ...state,
        opcionaisAtivos,
        data: {
          ...state.data,
          opcionais: adicionarItemNaSecao(state.data.opcionais, action.secao),
        },
      }
    }

    case 'adicionarItemOpcional':
      return {
        ...state,
        data: {
          ...state.data,
          opcionais: adicionarItemNaSecao(state.data.opcionais, action.secao),
        },
      }

    case 'removerItemOpcional':
      return {
        ...state,
        data: {
          ...state.data,
          opcionais: removerItemDaSecao(state.data.opcionais, action.secao, action.id),
        },
      }

    case 'atualizarItemOpcional':
      return {
        ...state,
        data: {
          ...state.data,
          opcionais: atualizarItemDaSecao(
            state.data.opcionais,
            action.secao,
            action.id,
            action.patch,
          ),
        },
      }

    case 'restaurarModelo':
      return estadoDoModelo()

    default:
      return state
  }
}
