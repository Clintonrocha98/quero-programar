---
paths:
  - '.ai/rules/**'
---

# Rules

## Um arquivo de rule por conceito — liste vários globs, nunca duplique o corpo

Quando uma convenção vale em mais de um lugar, mantenha UM arquivo `.md`. Liste todos os globs em `paths:` no frontmatter dele; não crie um segundo arquivo com o mesmo corpo.

## O índice acompanha os arquivos

Toda rule nova, renomeada ou com `paths:` alterado muda `.ai/rules/index.md` na mesma edição. Uma linha do índice por conjunto de globs; várias linhas podem apontar para o mesmo arquivo.

## Uma rule descreve o código real

Uma rule só entra quando o código já a cumpre, ou quando a mesma mudança ajusta o código para cumpri-la. Confira o fato com `rg` antes de escrever a rule.
