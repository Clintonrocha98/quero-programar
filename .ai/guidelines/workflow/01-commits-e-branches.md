# Commits e branches

## Branches

Todo trabalho nasce numa branch e entra na `main` por pull request. Nunca faça commit direto na `main`.

| Prefixo                  | Uso                                              | Tipo do commit |
| ------------------------ | ------------------------------------------------ | -------------- |
| `feature/<slug>`         | Feature nova ou conteúdo novo                    | `feat`         |
| `bugfix/<slug>`          | Correção                                         | `fix`          |
| `chore/<slug>`           | Manutenção, dependências, tooling, config        | `chore`        |
| `story/<issue>-<slug>`   | Trabalho que nasce de uma issue aberta           | o que couber   |

- `<slug>` é kebab-case minúsculo: `feature/mentoria-roteiro`.
- `story/` traz o número da issue: `story/42-exportar-curriculo-docx`.

## Commits

Os commits seguem Conventional Commits, com a área do site como escopo e a descrição em pt-BR, no imperativo e em minúsculas:

```
<tipo>(<escopo>): <descrição curta>
```

- Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`.
- Escopo é a área tocada, no nome que o repo já usa: `curriculo`, `mentoria`, `guia`, `4noobs`, `tecnologias`, `navegacao`, `sidebar`, `layout`, `seo`, `ui`, `deps`.
- Sem escopo só quando a mudança atravessa o repo inteiro.
- Nunca faça commit com mensagem `wip`. Agrupe o trabalho em commits que se explicam sozinhos.

Exemplos:

- `feat(mentoria): adicionar roteiro de sessão`
- `fix(curriculo-pdf): melhorar extração de texto por ats`
- `refactor(layout): trocar prop wide por largura com três tamanhos`
- `chore(deps): atualizar vite para 5.4`

O título do PR segue o mesmo formato.
