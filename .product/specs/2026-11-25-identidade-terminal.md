---
title: Identidade visual "Terminal" na home e na sidebar
status: shipped
date: 2026-11-25
personas: [iniciante]
rotas: ["/", "*"]
---

# Identidade visual "Terminal"

## Problema

A home parecia um template genérico: blocos iguais, sem nada que só o QueroProgramar teria.

## O que faz

- A home responde, num prompt de terminal, à pergunta que deu origem ao projeto: `$ por onde eu começo?`. A resposta aponta o Plano de Estudos, depois as tecnologias e as outras perguntas de toda semana.
- A sidebar vira uma árvore com linhas-guia e o item ativo marcado em âmbar, em todas as páginas. Os rótulos continuam legíveis (sem slug de arquivo), porque a iniciante vence.
- O tema do site inteiro passa a "Grafite": fundo grafite, texto creme, âmbar na ação principal, azul nos links. Fontes Instrument Sans e JetBrains Mono.
- No desktop, a home cabe em 1440×900. Em telas mais baixas ela rola.

## O que não faz

- Não renomeia os tokens `metal-*`: só os valores mudaram.
- Não muda as imagens Open Graph (`scripts/gerar-og.mjs` tem as cores próprias).
- Não muda a folha do currículo, que imita o papel.

## Como decidimos

Um protótipo comparou três layouts (Terminal, Dia → Noite inspirado no ardia.dev, A conversa) e depois sete paletas × seis pares de fontes. Venceu Terminal + Grafite âmbar + Instrument Sans / JetBrains Mono.

## Onde está

`src/pages/home.tsx`, `src/components/sidebar/`, `src/index.css`, `tailwind.config.js`, `src/main.tsx`.
