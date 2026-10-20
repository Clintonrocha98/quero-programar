export type DuracaoSessao = 30 | 60

export interface BlocoRoteiro {
  id: string
  titulo: string
  minutos: Record<DuracaoSessao, number>
  descricao: string
  perguntas: string[]
}

export interface RoteiroSessao {
  id: 'primeira-sessao' | 'acompanhamento'
  titulo: string
  descricao: string
  blocos: BlocoRoteiro[]
}

export interface TemaCardapio {
  id: string
  titulo: string
  perguntas: string[]
}

export const duracoesSessao: DuracaoSessao[] = [30, 60]

export const ajudaRoteiro = {
  marcar: 'Marque os blocos durante a conversa. Fica fácil ver onde vocês estão e quanto falta.',
  perguntas: 'As perguntas de cada bloco servem para currículo, estudo, projeto ou carreira.',
  copiar: 'Copie e mande junto com o convite. Assim a outra pessoa chega preparada.',
} as const

export const roteiros: RoteiroSessao[] = [
  {
    id: 'primeira-sessao',
    titulo: 'Primeira sessão',
    descricao:
      'Para o primeiro encontro, quando vocês ainda estão se conhecendo. Se for uma conversa única, use este roteiro: o último bloco vira o fechamento da conversa.',
    blocos: [
      {
        id: 'abertura',
        titulo: 'Abertura e quebra-gelo',
        minutos: { 60: 5, 30: 3 },
        descricao:
          'Cumprimente, agradeça o tempo e combine quanto a conversa vai durar. Diga que não existe pergunta boba.',
        perguntas: [
          'Como está o seu dia até agora?',
          'O que fez você querer esta conversa?',
        ],
      },
      {
        id: 'trajetorias',
        titulo: 'Trajetórias',
        minutos: { 60: 15, 30: 7 },
        descricao:
          'Os dois contam como chegaram até aqui. Quem mentora fala também do que deu errado, não só do que deu certo.',
        perguntas: [
          'Como você chegou até a programação?',
          'O que foi mais difícil no caminho até agora?',
          'Que parte da sua história você quer que eu conheça?',
        ],
      },
      {
        id: 'momento-atual',
        titulo: 'Momento atual e objetivo',
        minutos: { 60: 15, 30: 7 },
        descricao:
          'Entenda onde a pessoa está hoje e aonde ela quer chegar. Ajude a deixar o objetivo pequeno e concreto.',
        perguntas: [
          'O que você está estudando ou fazendo agora?',
          'Onde você quer estar daqui a três meses?',
          'Como saberíamos, daqui a duas semanas, que deu certo?',
        ],
      },
      {
        id: 'primeira-ajuda',
        titulo: 'Primeira ajuda concreta',
        minutos: { 60: 15, 30: 8 },
        descricao:
          'Escolham uma dúvida ou um bloqueio real e trabalhem nele juntos. Se você não souber a resposta, busquem juntos.',
        perguntas: [
          'O que você já tentou?',
          'Onde exatamente travou?',
          'O que você faria se não tivesse medo de errar?',
        ],
      },
      {
        id: 'proximo-passo',
        titulo: 'Próximo passo (uma ação pequena)',
        minutos: { 60: 5, 30: 3 },
        descricao:
          'Peça para a pessoa dizer, com as palavras dela, uma única ação pequena que ela vai fazer até a próxima conversa.',
        perguntas: [
          'Qual é a menor ação que você consegue fazer esta semana?',
          'Quando, exatamente, você vai fazer isso?',
          'O que pode atrapalhar, e o que você faz se isso acontecer?',
        ],
      },
      {
        id: 'combinado',
        titulo: 'Combinado: vamos continuar? Como?',
        minutos: { 60: 5, 30: 2 },
        descricao:
          'Decidam juntos se vão continuar e, se sim, com que frequência e por qual canal. Numa conversa única, use este tempo para fechar e agradecer.',
        perguntas: [
          'Faz sentido a gente conversar de novo?',
          'Qual frequência e qual canal funcionam para você?',
          'O que você leva desta conversa?',
        ],
      },
    ],
  },
  {
    id: 'acompanhamento',
    titulo: 'Acompanhamento',
    descricao:
      'Para as conversas seguintes, quando vocês já se conhecem. Quem é mentorado traz o tema do dia.',
    blocos: [
      {
        id: 'check-in',
        titulo: 'Check-in: como você está',
        minutos: { 60: 5, 30: 3 },
        descricao:
          'Antes do conteúdo, pergunte como a pessoa está. Cansaço e ansiedade mudam o que dá para fazer hoje.',
        perguntas: [
          'Como você está de verdade esta semana?',
          'Aconteceu alguma coisa importante desde a última conversa?',
        ],
      },
      {
        id: 'revisao',
        titulo: 'Revisão do próximo passo anterior',
        minutos: { 60: 10, 30: 5 },
        descricao:
          'Revisem a ação combinada na última conversa. Se ela não aconteceu, entendam o motivo sem julgamento.',
        perguntas: [
          'Como foi com o passo que você combinou?',
          'O que ajudou e o que atrapalhou?',
          'O que você aprendeu com isso?',
        ],
      },
      {
        id: 'tema-do-dia',
        titulo: 'Tema do dia (o mentorado traz)',
        minutos: { 60: 30, 30: 15 },
        descricao:
          'Quem é mentorado escolhe o tema. Faça mais perguntas do que dá respostas e conte o que funcionou para você quando fizer sentido.',
        perguntas: [
          'O que você quer resolver hoje?',
          'O que você já tentou?',
          'Onde exatamente travou?',
          'Que opções você enxerga agora?',
        ],
      },
      {
        id: 'proximo-passo',
        titulo: 'Próximo passo (uma ação pequena)',
        minutos: { 60: 10, 30: 5 },
        descricao:
          'Fechem uma única ação pequena, com data. É melhor uma ação feita do que três planejadas.',
        perguntas: [
          'Qual é a menor ação que você consegue fazer até a próxima conversa?',
          'Como saberíamos, daqui a duas semanas, que deu certo?',
          'Do que você precisa para isso acontecer?',
        ],
      },
      {
        id: 'feedback',
        titulo: 'Feedback da própria sessão',
        minutos: { 60: 5, 30: 2 },
        descricao:
          'Perguntem um ao outro como foi a conversa. Ajustem o formato antes que ele deixe de funcionar.',
        perguntas: [
          'O que funcionou hoje?',
          'O que você quer mudar na próxima conversa?',
        ],
      },
    ],
  },
]

export const cardapioTemas: TemaCardapio[] = [
  {
    id: 'rotina-de-estudos',
    titulo: 'Rotina de estudos',
    perguntas: [
      'Como é uma semana normal de estudos para você hoje?',
      'Em que horário você rende mais?',
      'O que costuma tirar você da rotina?',
    ],
  },
  {
    id: 'definir-objetivo',
    titulo: 'Definir um objetivo',
    perguntas: [
      'O que você quer conseguir nos próximos três meses?',
      'Por que isso é importante para você?',
      'Qual seria o primeiro sinal de que você está no caminho certo?',
    ],
  },
  {
    id: 'pedir-ajuda',
    titulo: 'Como pedir ajuda',
    perguntas: [
      'Quanto tempo você costuma ficar travado antes de pedir ajuda?',
      'O que você sente quando precisa perguntar algo?',
      'Como você descreveria o seu último bloqueio para alguém?',
    ],
  },
  {
    id: 'portfolio-e-projetos',
    titulo: 'Portfólio e projetos',
    perguntas: [
      'Que projeto você gostaria de mostrar para alguém?',
      'O que impede você de começar ou terminar um projeto?',
      'Que problema do seu dia a dia daria um bom projeto?',
    ],
  },
  {
    id: 'sindrome-do-impostor',
    titulo: 'Síndrome do impostor',
    perguntas: [
      'Em que situações você sente que não sabe o suficiente?',
      'O que você sabe hoje que não sabia há seis meses?',
      'Com quem você está se comparando?',
    ],
  },
  {
    id: 'rede-de-contatos',
    titulo: 'Rede de contatos',
    perguntas: [
      'Com quem da área você conversa hoje?',
      'Que comunidade ou evento você gostaria de conhecer?',
      'Como você poderia ajudar alguém que está um passo atrás de você?',
    ],
  },
  {
    id: 'ritmo-e-descanso',
    titulo: 'Ritmo e descanso',
    perguntas: [
      'Como está o seu sono e o seu cansaço?',
      'Quando foi a última vez que você parou sem culpa?',
      'Que ritmo de estudo você consegue manter por meses, não só por uma semana?',
    ],
  },
]
