---
paths:
  - 'src/data/content/**'
  - 'src/data/seo.json'
  - 'src/data/navigation.ts'
  - 'scripts/**'
---

# Conteúdo MDX e SEO

O conteúdo do site é MDX em `src/data/content/<secao>/`. Cada arquivo exporta um `frontmatter` e é registrado em `src/data/content/index.ts`.

```text
src/data/content/
├── index.ts          registro: importa cada MDX e o expõe por seção
├── technologies/     /tecnologias/<id>
├── 4noobs/           /4noobs/<id>
├── mentoria/
└── pages/            páginas soltas (recursos, artigos, plano de estudos)
```

## Arquivo novo

- O nome do arquivo é kebab-case e igual ao `id` do frontmatter. O `id` vira o segmento da URL.
- O frontmatter é um `export const frontmatter = { ... }` no topo, com os campos do tipo `*Meta` da seção em `index.ts` (`TechnologyMeta` tem `id`, `title`, `description`, `icon`, `color`). Não invente campo que o tipo não declara.
- Importe os componentes por `@/components/...` logo abaixo do frontmatter. Use os componentes de conteúdo (`ContentSection`, `ResourceCard`, `ResourceGroup`, `Callout`, `CodeBlock`, `QuoteBlock`); não escreva HTML cru nem estilo inline no MDX.
- Registre o arquivo em `src/data/content/index.ts` na mesma mudança. Um MDX que não está no índice não aparece no site.

## Texto

- Conteúdo em pt-BR, para quem está começando: frase curta, termo técnico explicado na primeira vez que aparece.
- Um link externo é um `ResourceCard` com o `type` certo (`curso`, `leitura`, `documentacao`...), não um link solto no meio do parágrafo.

## SEO

O build gera um HTML por rota com as meta tags (`scripts/gerar-html.mjs`) e uma imagem Open Graph por rota (`scripts/gerar-og.mjs`). As duas fontes de metadados são:

- Rota de tecnologia ou de 4Noobs: o `frontmatter` do MDX. Nenhuma ação extra.
- Rota fixa: uma entrada em `src/data/seo.json` com `titulo`, `descricao` e `secao`. Uma rota fixa nova sem entrada aqui sai sem meta tags.

- `descricao` tem uma frase ou duas e diz o que a pessoa encontra na página.
- Uma mudança de rota (nova, renomeada, removida) muda, na mesma edição, `App.tsx`, `src/data/navigation.ts` e a fonte de SEO dela.
- Depois de mexer em SEO, rode `pnpm build` e confira o HTML gerado em `dist/<rota>.html`.
