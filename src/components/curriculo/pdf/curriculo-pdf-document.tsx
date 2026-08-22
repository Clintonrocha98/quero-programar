import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer'
import { normalizarUrl } from '@/lib/curriculo-format'
import {
  blocosVisiveis,
  experienciaTemConteudo,
  formatarPeriodoFormacao,
  linhaContato,
  linhaHardSkills,
  linhaStack,
  linhaTecnologias,
  linksHeader,
  nomeRenderizado,
  ordenarExperiencias,
  secoesVisiveisPdf,
  tituloExperiencia,
  tituloProjeto,
} from '@/lib/curriculo-render'
import type { CurriculoData, SecaoOpcional } from '@/types/curriculo'
import { styles } from './curriculo-pdf-styles'

Font.registerHyphenationCallback((palavra) => [palavra])

interface CurriculoPdfDocumentProps {
  data: CurriculoData
  opcionaisAtivos: Record<SecaoOpcional, boolean>
}

function juntarPartes(partes: string[]): string {
  return partes.filter((parte) => parte.trim() !== '').join(' - ')
}

export function CurriculoPdfDocument({ data, opcionaisAtivos }: CurriculoPdfDocumentProps) {
  const secoes = secoesVisiveisPdf(data, opcionaisAtivos)
  const links = linksHeader(data.header)
  const contato = linhaContato(data.header)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.nome}>{nomeRenderizado(data.header)}</Text>

        {contato !== '' && <Text style={styles.linhaContato}>{contato}</Text>}

        {links.length > 0 && (
          <Text style={styles.linhaLinks}>
            {links.map((link, index) => (
              <Text key={link.label}>
                {index > 0 ? ' | ' : ''}
                {link.label}:{' '}
                <Link src={link.url} style={styles.link}>
                  {link.url}
                </Link>
              </Text>
            ))}
          </Text>
        )}

        {secoes.resumo && data.resumo.texto_resumo.trim() !== '' && (
          <Text style={styles.resumo}>{data.resumo.texto_resumo}</Text>
        )}

        {secoes.experiencias && (
          <View>
            <Text style={styles.tituloSecao}>EXPERIÊNCIAS PROFISSIONAIS</Text>

            {ordenarExperiencias(data.experiencias)
              .filter(experienciaTemConteudo)
              .map((exp) => {
                const tecnologias = linhaTecnologias(exp)

                return (
                  <View key={exp.id} minPresenceAhead={40}>
                    <Text style={styles.tituloItem}>{tituloExperiencia(exp)}</Text>

                    {tecnologias !== '' && (
                      <Text style={styles.linhaTecnologias}>{tecnologias}</Text>
                    )}

                    {blocosVisiveis(exp).map((bloco, blocoIndex) => [
                      bloco.contexto.trim() !== '' ? (
                        <Text key={`${exp.id}-contexto-${blocoIndex}`} style={styles.paragrafo}>
                          {bloco.contexto}
                        </Text>
                      ) : null,
                      ...bloco.realizacoes.map((realizacao, realizacaoIndex) => (
                        <View
                          key={`${exp.id}-realizacao-${blocoIndex}-${realizacaoIndex}`}
                          style={styles.bulletLinha}
                        >
                          <Text style={styles.bulletMarcador}>•</Text>
                          <Text style={styles.bulletTexto}>{realizacao}</Text>
                        </View>
                      )),
                    ])}
                  </View>
                )
              })}
          </View>
        )}

        {secoes.hard_skills && (
          <View>
            <Text style={styles.tituloSecao}>HARD SKILLS</Text>

            <View style={styles.bulletLinha}>
              <Text style={styles.bulletMarcador}>•</Text>
              <Text style={styles.bulletTexto}>{linhaHardSkills(data.hard_skills)}</Text>
            </View>
          </View>
        )}

        {secoes.projetos && (
          <View>
            <Text style={styles.tituloSecao}>PROJETOS</Text>

            {data.projetos
              .filter((projeto) => projeto.nome.trim() !== '')
              .map((projeto) => {
                const titulo = tituloProjeto(projeto)
                const stack = linhaStack(projeto)
                const descricao = projeto.descricao.trim()

                return (
                  <View key={projeto.id} minPresenceAhead={40}>
                    <Text style={styles.tituloItem}>
                      {titulo.texto}
                      {titulo.link !== null && (
                        <>
                          {' - '}
                          <Link src={titulo.link} style={styles.link}>
                            Link
                          </Link>
                        </>
                      )}
                    </Text>

                    {stack !== '' && <Text style={styles.linhaTecnologias}>{stack}</Text>}

                    {descricao !== '' && <Text style={styles.paragrafo}>{descricao}</Text>}

                    {projeto.destaques
                      .filter((destaque) => destaque.trim() !== '')
                      .map((destaque, destaqueIndex) => (
                        <View
                          key={`${projeto.id}-destaque-${destaqueIndex}`}
                          style={styles.bulletLinha}
                        >
                          <Text style={styles.bulletMarcador}>•</Text>
                          <Text style={styles.bulletTexto}>{destaque}</Text>
                        </View>
                      ))}
                  </View>
                )
              })}
          </View>
        )}

        {secoes.formacao && (
          <View>
            <Text style={styles.tituloSecao}>FORMAÇÃO</Text>

            {data.opcionais.formacao
              .filter((item) => item.instituicao.trim() !== '')
              .map((item) => {
                const periodo = formatarPeriodoFormacao(item)

                return (
                  <View key={item.id} wrap={false}>
                    <Text style={styles.tituloItem}>
                      {juntarPartes([item.instituicao, item.curso, item.nivel])}
                      {periodo !== '' && (
                        <Text style={styles.textoNormal}>{` - ${periodo}`}</Text>
                      )}
                    </Text>
                  </View>
                )
              })}
          </View>
        )}

        {secoes.certificacoes && (
          <View>
            <Text style={styles.tituloSecao}>CERTIFICAÇÕES</Text>

            {data.opcionais.certificacoes
              .filter((item) => item.nome.trim() !== '')
              .map((item) => {
                const credencial = normalizarUrl(item.url_credencial)

                return (
                  <View key={item.id} wrap={false}>
                    <Text style={styles.linhaItem}>
                      {juntarPartes([item.nome, item.emissor, item.ano])}
                      {credencial !== '' && (
                        <>
                          {' - '}
                          <Link src={credencial} style={styles.link}>
                            Credencial
                          </Link>
                        </>
                      )}
                    </Text>
                  </View>
                )
              })}
          </View>
        )}

        {secoes.idiomas && (
          <View>
            <Text style={styles.tituloSecao}>IDIOMAS</Text>

            {data.opcionais.idiomas
              .filter((item) => item.idioma.trim() !== '')
              .map((item) => (
                <Text key={item.id} style={styles.linhaItem}>
                  {juntarPartes([item.idioma, item.nivel])}
                </Text>
              ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
