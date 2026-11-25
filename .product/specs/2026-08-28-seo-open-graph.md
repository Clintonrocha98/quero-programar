---
title: SEO e Open Graph por rota
status: shipped
date: 2026-08-28
personas: [um-passo-a-frente]
rotas: ["*"]
---

# SEO e Open Graph por rota

## Problema

O uso principal do site é colar um link numa conversa. Uma SPA sem meta tags por rota gera a mesma prévia para todas as páginas.

## O que faz

No build, gera para cada rota um HTML com título, descrição, canonical e meta tags Open Graph, além de uma imagem Open Graph própria.

## O que não faz

- Não faz SSR (renderização no servidor). As tags são geradas de forma estática no build.

## Onde está

`scripts/gerar-html.mjs`, `scripts/gerar-og.mjs`, `scripts/lib/rotas-seo.mjs`, `src/data/seo.json`.
