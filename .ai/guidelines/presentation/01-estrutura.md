# Estrutura do frontend

O site é uma SPA React 18 + Vite + TypeScript, com conteúdo em MDX e estilo em Tailwind. Não há backend: todo o estado vive no navegador.

```
src/
├── App.tsx          rotas (React Router), páginas pesadas com lazy()
├── pages/           um componente por rota; agrupa por seção (guia/, mentoria/, 4noobs/)
├── components/
│   ├── ui/          kit base reutilizável (Card, Tag, Skeleton, Breadcrumb, QuoteBlock)
│   ├── layout/      AppLayout e larguras de página
│   ├── sidebar/     navegação lateral
│   └── <secao>/     componentes de uma seção (curriculo/, mentoria/)
├── data/
│   ├── content/     arquivos MDX e o registro em index.ts
│   ├── navigation.ts, seo.json, icons.ts
│   └── <secao>-*.ts dados estáticos de uma seção
├── contexts/        createContext em <nome>-context.ts, Provider em <nome>-provider.tsx
├── hooks/           use-<nome>.ts
├── lib/             funções puras e utilitários (cn, formatação, reducer, storage)
└── types/           tipos compartilhados
```

- Nome de arquivo e pasta é kebab-case. Componente exportado é PascalCase.
- Uma página compõe componentes e lê dados; regra de negócio vai para `lib/` (função pura) ou para um hook.
- Um componente de seção (`components/curriculo/`) não importa de outra seção. O que duas seções usam vai para `components/` ou `components/ui/`.
- Uma rota nova exige três registros: a rota em `App.tsx`, o item em `data/navigation.ts` e a entrada de SEO (veja `.ai/rules/conteudo-mdx.md`).

Os detalhes ficam em `.ai/rules/frontend.md` (React e visual) e `.ai/rules/conteudo-mdx.md` (conteúdo e SEO).
