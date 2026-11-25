---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
  - 'scripts/**/*.mjs'
---

# Comentários no código

## O comentário ganha a linha ou é apagado

Um comentário não é de graça: ele disputa a atenção de quem lê e o contexto do agente, e nada o verifica. Um comentário velho é pior que nenhum: a pessoa desconfia dele, o agente obedece. Antes de escrever ou manter um, pergunte: quando o código ao lado mudar, este comentário vira mentira? Se eu apagar, o que quebra?

Ganha lugar:

- **Invariante** — a regra que o código obedece, escrita para que uma edição que a quebre pareça errada.
- **Armadilha** — por que o caminho óbvio não foi seguido aqui.
- **Âncora** — um ponteiro de uma linha para uma decisão em `.product/decisions/` ou um termo do glossário.
- **Contrato remoto** — um acoplamento que não se vê a partir deste arquivo (ex.: um script de build que lê este dado).

Nunca ganha lugar: changelog (o git guarda), narração que repete a linha de baixo, cabeçalho que repete o nome do arquivo ou da função. O padrão é zero comentário inline. Se o comentário só tem uma linha, um nome melhor de função ou variável costuma resolver.

```ts
// Evite: narra a linha de baixo
// Verifica match exato
if (item.href === pathname) return item

// Bom: explica a armadilha
// O "/" final evita que /tecnologias case com /tecnologias-avancadas.
if (pathname.startsWith(`${item.href}/`)) return item
```

## Nunca cite número de issue ou PR no código

Proibido em comentário e JSDoc: `issue #N`, `PR #N`, `(#N)`, `TODO (#N)`. A issue vive fora do repo, fecha e o número morre. Se a decisão importa, ela vira um arquivo em `.product/decisions/` e o comentário só aponta para ela. Trabalho pendente é assunto do tracker.

## Replanejar reescreve o comentário, não empilha

Quando o comportamento muda, apague o comentário antigo e escreva o estado novo como se sempre tivesse sido assim. Nunca acrescente um parágrafo explicando por que o de cima ficou velho.

## Idioma e estilo

- Comentários em pt-BR. Identificadores, nomes de teste e termos do glossário ficam como estão.
- Siga ASD-STE100 (Simplified Technical English) e os quatro princípios de Zinsser: simplicidade, brevidade, clareza, humanidade.
- Frase curta, uma ideia por frase, voz ativa, um nome por conceito.

## Tipos não são comentários

Esta rule vale para prosa. Tipos do TypeScript e anotações JSDoc que o editor lê (`@param` com forma de objeto, `@deprecated`) não são comentários e ficam completos.
