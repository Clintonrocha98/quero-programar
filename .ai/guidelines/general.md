# Guidelines gerais

Este repo é o QueroProgramar, um site estático (SPA React + Vite), projeto pessoal, para quem começa a programar. A verdade do produto fica em `.product/`. As regras aqui são de engenharia.

- Cada camada tem um arquivo de rule em `.ai/rules/`. Antes de escrever código, abra `.ai/rules/index.md` e leia as rules cujos globs batem com os arquivos que você vai tocar.
- Todo texto que o agente escreve é em pt-BR: conteúdo, comentários, mensagens de commit e títulos de PR. Identificadores e termos técnicos ficam no original (`useSyncExternalStore`, `frontmatter`).

## Atribuição de commits

- Nunca adicione uma ferramenta de IA como coautora: nada de trailer `Co-authored-by` com Claude, OpenCode, Copilot ou outro assistente.
- Nunca ponha o nome delas em nenhum lugar da atribuição: nem como autor ou committer, nem em trailer ou rodapé como "Generated with Claude Code". Commits e PRs pertencem às pessoas que contribuem.

## Código mínimo

- Escreva o mínimo de código que resolve: sem helper, cache ou checagem defensiva que a feature não precisa. Se dá para inlinar uma função ou remover um branch sem perder comportamento, faça.
- Não adicione dependência para algo que a plataforma ou uma dependência atual já faz. Exemplo: `cn()` de `@/lib/utils` junta classes; `lucide-react` fornece ícones.
- Importe pelo alias `@/` (`@/components/ui/card`), não por caminho relativo que sobe pastas (`../../components`).

## Verificação obrigatória

- Antes de dizer que uma mudança está pronta, rode:
    - `pnpm lint` — ESLint com `--max-warnings 0`.
    - `pnpm build` — roda `tsc`, o `vite build` e a geração de SEO (`build:seo`).
- Corrija as falhas que a mudança causa. Nunca adicione `eslint-disable`, `@ts-ignore`, `@ts-expect-error` ou `any` só para passar um check.
- Reporte uma falha que já existia antes da mudança, ou um check que não rodou, exatamente assim. Um check que falhou ou não rodou não é um check que passou.
