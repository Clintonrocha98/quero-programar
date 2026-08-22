export type TipoDica = 'resumo' | 'atuacao' | 'destaques'

export interface Dica {
  tipo: TipoDica
  titulo: string
  regras: string[]
  prompt: string
}

export const DICAS: Record<TipoDica, Dica> = {
  resumo: {
    tipo: 'resumo',
    titulo: 'Resumo profissional',
    regras: [
      'Comece pelo cargo que você pretende ocupar.',
      'Cite de 3 a 4 competências técnicas concretas (não genéricas).',
      'Diga que tipo de valor você quer entregar.',
      'Termine com um diferencial seu.',
      'Um parágrafo só, sem bullets, 400–900 caracteres.',
    ],
    prompt:
      'Aja como um consultor de carreira especialista em currículos para desenvolvedores(as). Quero escrever o resumo profissional do meu currículo: um único parágrafo, sem bullets, com cerca de 400 a 900 caracteres. Ele deve seguir esta estrutura, na ordem: (1) o cargo que eu pretendo ocupar; (2) de 3 a 4 competências técnicas concretas que eu já domino; (3) o tipo de valor que eu quero entregar para a empresa; (4) um diferencial meu. Faça perguntas para entender melhor minha experiência antes de escrever, e só depois me devolva o parágrafo pronto. Para começar, aqui está o que sei sobre mim: [cargo pretendido, principais competências, diferencial]',
  },
  atuacao: {
    tipo: 'atuacao',
    titulo: 'Atuação e realizações',
    regras: [
      'Contexto: 2 a 4 linhas sobre o cenário ou produto, não as tarefas.',
      'Realizações: comece cada bullet com um verbo.',
      'Passado para experiências finalizadas; gerúndio/substantivo para o cargo atual.',
      "Prefira 'resultado + meio' a tarefa solta.",
      'De 3 a 7 bullets por bloco.',
    ],
    prompt:
      "Aja como um consultor de carreira especialista em currículos para desenvolvedores(as). Quero descrever uma experiência profissional em duas partes: (1) um parágrafo de contexto, de 2 a 4 linhas, explicando o cenário, o produto ou o problema em que atuei — sem listar tarefas; (2) de 3 a 7 bullets de realizações, cada um começando com um verbo (no passado, se a experiência já terminou; no gerúndio ou substantivo, se ainda é o meu cargo atual), priorizando 'resultado + meio' em vez de tarefa solta (ex.: 'Implementei X para reduzir Y' em vez de só 'Usei X'). Faça perguntas para entender o que eu fiz, e só depois me devolva o parágrafo de contexto e os bullets prontos. Para começar, aqui está o que sei: [empresa, cargo, produto/projeto e o que eu fazia no dia a dia]",
  },
  destaques: {
    tipo: 'destaques',
    titulo: 'Destaques de projeto',
    regras: [
      'De 2 a 6 bullets curtos.',
      'Foque em decisões técnicas, não só funcionalidades.',
      'Mostre como foi construído, não apenas o que o projeto faz.',
    ],
    prompt:
      'Aja como um consultor de carreira especialista em currículos para desenvolvedores(as). Quero escrever os destaques de um projeto do meu currículo: de 2 a 6 bullets curtos, focados em decisões técnicas (arquitetura, padrões, testes, performance) e funcionalidades que mostrem domínio técnico — não apenas o que o projeto faz, mas como foi construído. Faça perguntas para entender o projeto, e só depois me devolva os bullets prontos. Para começar, aqui está o que sei: [nome do projeto, stack usada, o que ele faz e alguma decisão técnica que tomei]',
  },
}
