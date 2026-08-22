import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 56,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.35,
    color: '#000000',
  },
  nome: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
  },
  linhaContato: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  linhaLinks: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  resumo: {
    marginTop: 10,
    textAlign: 'justify',
  },
  tituloSecao: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    marginTop: 12,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  tituloItem: {
    fontFamily: 'Times-Bold',
    marginTop: 6,
  },
  linhaTecnologias: {
    marginTop: 1,
  },
  paragrafo: {
    marginTop: 3,
    textAlign: 'justify',
  },
  bulletLinha: {
    flexDirection: 'row',
    marginTop: 1.5,
    paddingLeft: 12,
  },
  bulletMarcador: {
    width: 12,
  },
  bulletTexto: {
    flex: 1,
  },
  link: {
    color: '#000000',
    textDecoration: 'underline',
  },
  linhaItem: {
    marginTop: 6,
  },
  textoNormal: {
    fontFamily: 'Times-Roman',
  },
})
