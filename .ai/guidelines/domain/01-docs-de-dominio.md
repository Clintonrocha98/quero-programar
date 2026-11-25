# Docs de domínio

Como ler e onde escrever a documentação de domínio deste repo. A casa única é `.product/` (product.md). Não crie `PRODUCT.md`, `CONTEXT-MAP.md` nem `docs/adr/`.

## Antes de explorar, leia

- **`.product/STRATEGY.md`** — para quem é o produto e o que não pode mudar.
- **`.product/CONTEXT.md`** — stack, restrições, decisões e o glossário do domínio.
- **`.product/decisions/`** — as decisões que tocam a área em que você vai trabalhar.
- **`.product/specs/`** — a spec da feature. Confira o `status` do frontmatter antes de implementar.

Se um desses arquivos não existe ou ainda é só template, **siga em silêncio**. Não aponte a falta e não sugira criá-lo antes da hora. Ele nasce quando um termo ou uma decisão é de fato resolvido.

## Onde salvar cada documento

```
.product/
├── STRATEGY.md      (visão, público, posicionamento)
├── CONTEXT.md       (arquitetura, restrições, glossário)
├── ROADMAP.md       (marcos do trimestre)
├── decisions/       (uma decisão por arquivo: 0001-titulo.md)
├── specs/           (YYYY-MM-DD-titulo.md)
├── personas/
└── releases/
```

- Decisões numeram em sequência a partir de `0001`. Uma decisão é imutável: para mudar, escreva outra que a substitui e aponte para a antiga.
- Specs e planos gerados por `brainstorm`, `grill-me` ou similares vão para `.product/specs/`, não para uma pasta solta.
- O `README.md` é a porta de entrada prática (como rodar, como contribuir com conteúdo). Ele não repete o glossário nem o raciocínio de uma decisão; ele aponta para `.product/`.

## Use o vocabulário do glossário

Quando o texto nomeia um conceito do domínio (num título de issue, numa proposta, num nome de componente), use o termo de `.product/CONTEXT.md`. Não troque por sinônimo.

Se o conceito ainda não está no glossário, é um sinal: ou você está inventando linguagem que o projeto não usa (reveja), ou há uma lacuna real (anote para o glossário).

## Aponte conflito com uma decisão

Se o que você propõe contradiz uma decisão em `.product/decisions/`, diga isso de forma explícita, em vez de passar por cima em silêncio:

> _Contradiz a decisão 0007 — mas vale reabrir porque..._
