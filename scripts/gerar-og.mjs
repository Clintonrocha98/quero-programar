import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import satori from 'satori'
import { SITE, SITE_URL, listarRotas } from './lib/rotas-seo.mjs'

const RAIZ = new URL('../', import.meta.url).pathname
const DESTINO = join(RAIZ, 'dist/og')
const LARGURA = 1200
const ALTURA = 630

const COR = {
  fundo: '#0a0a0f',
  cartao: '#111118',
  borda: '#2a2a38',
  titulo: '#e8e8f0',
  texto: '#9d9db0',
  discreto: '#5a5a6e',
  destaque: '#6b8fc5',
  ciano: '#22d3ee',
}

const fontes = [
  {
    name: 'Inter',
    data: readFileSync(join(RAIZ, 'scripts/og/fontes/inter-400.ttf')),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: readFileSync(join(RAIZ, 'scripts/og/fontes/inter-700.ttf')),
    weight: 700,
    style: 'normal',
  },
]

const caixa = (style, children) => ({ type: 'div', props: { style, children } })

function truncar(texto, limite) {
  return texto.length <= limite ? texto : `${texto.slice(0, limite - 1).trimEnd()}…`
}

function tamanhoDoTitulo(titulo) {
  if (titulo.length <= 22) return 82
  if (titulo.length <= 42) return 66
  return 54
}

function montarCartao(rota) {
  return caixa(
    {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: COR.fundo,
      backgroundImage: `radial-gradient(circle at 12% 0%, rgba(74,111,165,0.28), rgba(10,10,15,0) 58%)`,
      padding: 56,
      fontFamily: 'Inter',
    },
    [
      caixa(
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          backgroundColor: COR.cartao,
          border: `1px solid ${COR.borda}`,
          borderRadius: 24,
          padding: 64,
        },
        [
          caixa({ display: 'flex', flexDirection: 'column' }, [
            caixa(
              {
                display: 'flex',
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: COR.destaque,
              },
              rota.secao,
            ),
            caixa(
              {
                display: 'flex',
                marginTop: 28,
                fontSize: tamanhoDoTitulo(rota.titulo),
                fontWeight: 700,
                lineHeight: 1.15,
                color: COR.titulo,
              },
              truncar(rota.titulo, 72),
            ),
            caixa(
              {
                display: 'flex',
                marginTop: 26,
                fontSize: 28,
                lineHeight: 1.45,
                color: COR.texto,
              },
              truncar(rota.descricao, 155),
            ),
          ]),
          caixa(
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `1px solid ${COR.borda}`,
              marginTop: 32,
              paddingTop: 30,
            },
            [
              caixa({ display: 'flex', alignItems: 'center' }, [
                caixa(
                  {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundImage: `linear-gradient(135deg, ${COR.destaque}, ${COR.ciano})`,
                    color: COR.fundo,
                    fontSize: 24,
                    fontWeight: 700,
                  },
                  '</>',
                ),
                caixa(
                  {
                    display: 'flex',
                    marginLeft: 20,
                    fontSize: 30,
                    fontWeight: 700,
                    color: COR.titulo,
                  },
                  SITE.nome,
                ),
              ]),
              caixa({ display: 'flex', fontSize: 24, color: COR.discreto }, SITE_URL.replace(/^https?:\/\//, '')),
            ],
          ),
        ],
      ),
    ],
  )
}

async function gerarImagem(rota) {
  const svg = await satori(montarCartao(rota), { width: LARGURA, height: ALTURA, fonts: fontes })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: LARGURA } }).render().asPng()
  writeFileSync(join(DESTINO, `${rota.slug}.png`), png)
}

const rotas = listarRotas()
mkdirSync(DESTINO, { recursive: true })
await Promise.all(rotas.map(gerarImagem))
console.log(`og: ${rotas.length} imagens geradas em dist/og`)
