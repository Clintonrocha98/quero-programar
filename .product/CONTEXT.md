---
# Architecture Context
# Restrições, decisões e glossário para assistentes de IA.
# As convenções de código ficam em .ai/guidelines e .ai/rules; este arquivo não as repete.
---

## Tech Stack

- **SPA** React 18 + TypeScript, build com Vite 5 (`package.json`).
- **Roteamento:** React Router v7. As rotas ficam em `src/App.tsx`.
- **Estilo:** Tailwind CSS 3 com o tema "Dark Metallic" (`tailwind.config.js`).
- **Conteúdo:** MDX em `src/data/content/<secao>/`, registrado em `src/data/content/index.ts`.
- **PDF do currículo:** `@react-pdf/renderer`, gerado no navegador (`src/lib/curriculo-pdf.ts`).
- **Hospedagem:** Cloudflare Pages, em `https://quero-programar.pages.dev` (`scripts/lib/rotas-seo.mjs`).
- **Gerenciador de pacotes:** pnpm.

## Key Constraints

- **Site estático, sem backend.** Não há servidor, banco de dados nem login. Uma feature que precisa de servidor viola a `STRATEGY.md`.
- **Dados do usuário ficam no navegador.** O rascunho do currículo fica no `localStorage`, na chave `qp:curriculo-rascunho:v1` (`src/lib/curriculo-storage.ts`). Para mudar o formato, troque a versão da chave. Não quebre rascunhos salvos.
- **SEO no build.** `pnpm build` roda `build:seo`, que gera as meta tags e a imagem Open Graph de cada rota (`scripts/gerar-html.mjs`, `scripts/gerar-og.mjs`). Toda rota nova precisa entrar na lista de rotas do SEO.
- **Analytics só por pageview.** O Cloudflare Web Analytics não registra eventos customizados. Uma métrica de clique ou de exportação exige instrumentação nova.
- **Conteúdo em pt-BR**, escrito para quem está começando.

## Important Decisions

- O conteúdo é MDX versionado no repo, não um CMS. Qualquer pessoa contribui por PR.
- Não há roadmap fixo. Features nascem de ideias do autor ao longo do tempo.
- Tecnologias não têm ordem obrigatória de estudo. O "Plano de Estudos" é sugestão, não pré-requisito.
- A mentoria é material de apoio e não conecta pessoas.

## External Dependencies

- **Cloudflare Pages** (hospedagem) e **Cloudflare Web Analytics** (`index.html`).
- **Links externos** para os recursos indicados (YouTube, documentações, repositórios). O site não faz chamada de API em runtime.
- **Repositórios 4Noobs** da comunidade He4rt Developers, exibidos como links na seção `/he4rt/4noobs`.

## Glossário

- **Recurso:** um conteúdo externo indicado no site (componente `ResourceCard`). Tem título, URL, tipo de material e uma frase com o porquê da indicação.
- **Tipo de material:** `curso`, `leitura`, `documentacao`, `repositorio`, `artigo`, `quiz`, `ferramenta`, `desafio`, `tutorial` (`src/components/resource-card.tsx`).
- **Nível:** agrupa os recursos de uma seção. Os valores são `beginner`, `intermediate`, `advanced` e `tools` (`src/components/content-section.tsx`).
- **Tecnologia:** uma página com recursos sobre uma linguagem ou um assunto (`/tecnologias/:nome`), com frontmatter `TechnologyMeta`.
- **4Noobs:** os repositórios educativos da comunidade He4rt, organizados por categoria.
- **Modelo de Currículo:** o editor em `/guia/curriculo`, que segue a estrutura do autor e traz as regras de cada seção.
- **Rascunho:** o estado do currículo salvo no `localStorage`.
- **Mentoria:** os guias, o roteiro e os modelos de mensagem para quem mentora e para quem é mentorado.
- **Pessoa mentora / pessoa mentorada:** os dois lados da mentoria. A pessoa mentora não precisa ser sênior; basta já ter passado pela etapa.
