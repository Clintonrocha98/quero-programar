import { LIMITES } from '@/lib/curriculo-constants'
import type { AvisoValidacao, CurriculoData } from '@/types/curriculo'

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarCurriculo(data: CurriculoData): AvisoValidacao[] {
  const avisos: AvisoValidacao[] = []

  const email = data.header.email.trim()
  if (email !== '' && !REGEX_EMAIL.test(email)) {
    avisos.push({ campo: 'header.email', mensagem: 'E-mail parece inválido' })
  }

  const textoResumo = data.resumo.texto_resumo.trim()
  if (
    textoResumo !== '' &&
    (textoResumo.length < LIMITES.textoResumoMin || textoResumo.length > LIMITES.textoResumoMax)
  ) {
    avisos.push({
      campo: 'resumo.texto_resumo',
      mensagem: `O resumo deve ter entre ${LIMITES.textoResumoMin} e ${LIMITES.textoResumoMax} caracteres`,
    })
  }

  const experienciasAtuais = data.experiencias.filter((experiencia) => experiencia.atual)
  if (experienciasAtuais.length > 1) {
    avisos.push({
      campo: 'experiencias.atual',
      mensagem: 'Apenas uma experiência pode estar marcada como atual',
    })
  }

  data.experiencias.forEach((experiencia) => {
    if (
      experiencia.data_fim &&
      experiencia.data_inicio &&
      experiencia.data_fim < experiencia.data_inicio
    ) {
      avisos.push({
        campo: `experiencias.${experiencia.id}.data_fim`,
        mensagem: 'Data de término anterior à de início',
      })
    }

    if (!experiencia.atual && !experiencia.data_fim && experiencia.data_inicio) {
      avisos.push({
        campo: `experiencias.${experiencia.id}.data_fim`,
        mensagem: 'Experiência sem data de término',
      })
    }

    experiencia.blocos.forEach((bloco, index) => {
      if (bloco.contexto.length > LIMITES.contextoMax) {
        avisos.push({
          campo: `experiencias.${experiencia.id}.blocos.${index}.contexto`,
          mensagem: `O contexto deve ter no máximo ${LIMITES.contextoMax} caracteres`,
        })
      }

      const realizacoesPreenchidas = bloco.realizacoes.filter(
        (realizacao) => realizacao.trim() !== '',
      )

      if (
        realizacoesPreenchidas.length > 0 &&
        (realizacoesPreenchidas.length < LIMITES.realizacoesMin ||
          realizacoesPreenchidas.length > LIMITES.realizacoesMax)
      ) {
        avisos.push({
          campo: `experiencias.${experiencia.id}.blocos.${index}.realizacoes`,
          mensagem: `Cada bloco deve ter entre ${LIMITES.realizacoesMin} e ${LIMITES.realizacoesMax} realizações`,
        })
      }

      bloco.realizacoes.forEach((realizacao, realizacaoIndex) => {
        if (realizacao.length > LIMITES.realizacaoMax) {
          avisos.push({
            campo: `experiencias.${experiencia.id}.blocos.${index}.realizacoes.${realizacaoIndex}`,
            mensagem: `Cada realização deve ter no máximo ${LIMITES.realizacaoMax} caracteres`,
          })
        }
      })
    })
  })

  data.projetos.forEach((projeto) => {
    if (projeto.descricao.length > LIMITES.descricaoProjetoMax) {
      avisos.push({
        campo: `projetos.${projeto.id}.descricao`,
        mensagem: `A descrição deve ter no máximo ${LIMITES.descricaoProjetoMax} caracteres`,
      })
    }

    const destaquesPreenchidos = projeto.destaques.filter((destaque) => destaque.trim() !== '')

    if (
      destaquesPreenchidos.length > 0 &&
      (destaquesPreenchidos.length < LIMITES.destaquesMin ||
        destaquesPreenchidos.length > LIMITES.destaquesMax)
    ) {
      avisos.push({
        campo: `projetos.${projeto.id}.destaques`,
        mensagem: `Cada projeto deve ter entre ${LIMITES.destaquesMin} e ${LIMITES.destaquesMax} destaques`,
      })
    }
  })

  return avisos
}
