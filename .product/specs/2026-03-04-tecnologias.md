---
title: Tecnologias
status: shipped
date: 2026-03-04
personas: [iniciante, um-passo-a-frente]
rotas: [/tecnologias, /tecnologias/:nome]
---

# Tecnologias

## Problema

Toda semana alguém pergunta na comunidade onde aprender uma linguagem ou tecnologia. A resposta boa é uma referência com uma breve explicação do porquê, e ela se perde no chat.

## O que faz

- Lista as tecnologias (HTML, CSS, JavaScript, TypeScript, Python, Java, Go, PHP e fundamentos da web).
- Cada tecnologia tem uma página com recursos gratuitos agrupados por nível, e cada recurso traz tipo de material e o porquê da indicação.
- Serve de referência compartilhada: quem está à frente cola o link da tecnologia como resposta.

## O que não faz

- Não impõe ordem de estudo.
- Não indica conteúdo pago (ver "Princípios de curadoria" em `STRATEGY.md`).

## Onde está

`src/data/content/technologies/*.mdx`, `src/pages/technologies-list.tsx`, `src/pages/technology-details.tsx`.
