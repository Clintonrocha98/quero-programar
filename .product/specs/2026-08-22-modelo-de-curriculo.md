---
title: Modelo de Currículo
status: shipped
date: 2026-08-22
personas: [iniciante, um-passo-a-frente]
rotas: [/guia, /guia/curriculo]
---

# Modelo de Currículo

## Problema

Montar o primeiro currículo de dev é difícil: a pessoa não sabe o que escrever no resumo, como descrever o que fez nem o que importa para quem lê.

## O que faz

- Um editor em que a pessoa preenche o currículo seguindo a estrutura do autor, montada a partir de artigos e vídeos de recrutadores.
- Cada seção traz as regras dessa estrutura. Exemplos: o resumo começa pelo cargo pretendido; cada realização começa com um verbo e mostra o resultado, não só a tarefa.
- Exporta o currículo em PDF no navegador, com o texto legível por ATS.
- Salva o rascunho no `localStorage` (chave `qp:curriculo-rascunho:v1`).

## O que não faz

- Não é uma fórmula garantida.
- Não envia o currículo para nenhum servidor e não exige conta.

## Onde está

`src/pages/guia/`, `src/components/curriculo/`, `src/data/curriculo-modelo.ts`, `src/data/curriculo-dicas.ts`, `src/lib/curriculo-storage.ts`, `src/lib/curriculo-pdf.ts`.
