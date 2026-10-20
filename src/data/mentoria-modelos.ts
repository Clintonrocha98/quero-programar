import type { Papel } from './mentoria-guias'

export type GrupoModelo = 'entrada' | 'combinado' | 'sessao' | 'saida'

export type QuemEnvia = Papel | 'ambos'

export interface ModeloMensagem {
  id: string
  grupo: GrupoModelo
  titulo: string
  quemEnvia: QuemEnvia
  quando: string
  texto: string
}

export const gruposModelo: { id: GrupoModelo; titulo: string; descricao: string }[] = [
  {
    id: 'entrada',
    titulo: 'Entrada',
    descricao: 'Para começar: oferecer mentoria ou pedir uma conversa.',
  },
  {
    id: 'combinado',
    titulo: 'Combinado',
    descricao: 'Para deixar claro, por escrito, como vocês vão conversar.',
  },
  {
    id: 'sessao',
    titulo: 'Sessão',
    descricao: 'Para antes e depois de cada conversa.',
  },
  {
    id: 'saida',
    titulo: 'Saída',
    descricao: 'Para dizer não, pausar ou encerrar com gentileza.',
  },
]

export const modelos: ModeloMensagem[] = [
  {
    id: 'oferta-publica',
    grupo: 'entrada',
    titulo: 'Oferta pública de mentoria',
    quemEnvia: 'mentor',
    quando: 'Quando você quer avisar, num post ou numa comunidade, que está disponível para mentorar.',
    texto: `Estou abrindo espaço para mentorar quem está começando em [tema].

Tenho [tempo] de experiência nisso e lembro bem das dúvidas do começo. Não sei tudo, mas posso contar o que funcionou e o que deu errado comigo.

Como funciona:
- Conversas de [duração], [frequência]
- Pelo [canal]
- Para quem está começando, sem pré-requisito

Se fizer sentido para você, me manda uma mensagem contando em que momento você está e o que quer conversar.`,
  },
  {
    id: 'pedido-direto',
    grupo: 'entrada',
    titulo: 'Pedido direto de conversa',
    quemEnvia: 'mentorado',
    quando: 'Quando você quer pedir uma conversa para uma pessoa específica, por mensagem privada.',
    texto: `Oi, [nome]! Tudo bem?

Meu nome é [seu nome] e estou [momento atual, ex.: estudando programação há 4 meses].

Vi que você [como conheceu a pessoa] e queria conversar com você sobre [tema].

Você toparia uma conversa de [duração] nas próximas semanas? Posso me adaptar ao seu horário.

Se agora não der, tudo bem, de verdade. Obrigado por ler até aqui!`,
  },
  {
    id: 'combinado',
    grupo: 'combinado',
    titulo: 'Combinado da mentoria',
    quemEnvia: 'ambos',
    quando: 'Depois da primeira conversa, quando vocês decidem continuar.',
    texto: `Combinado da nossa mentoria:

- Frequência: [frequência]
- Duração: [duração]
- Canal: [canal]
- Entre as conversas: [como e quando dá para mandar mensagem]
- Pauta: [nome do mentorado] manda antes de cada conversa
- Resumo: [nome do mentorado] manda depois de cada conversa
- Para remarcar ou pausar: avisar com [antecedência] pelo [canal]

Podemos rever este combinado quando quisermos.`,
  },
  {
    id: 'pauta-pre-sessao',
    grupo: 'sessao',
    titulo: 'Pauta antes da sessão',
    quemEnvia: 'mentorado',
    quando: 'Um ou dois dias antes de cada conversa.',
    texto: `Oi, [nome]! Pauta da nossa conversa de [data]:

O que fiz desde a última conversa:
- [o que você fez]

Onde travei:
- [onde travou]

O que quero conversar hoje:
- [tema]

Uma pergunta específica:
- [pergunta]`,
  },
  {
    id: 'resumo-pos-sessao',
    grupo: 'sessao',
    titulo: 'Resumo depois da sessão',
    quemEnvia: 'mentorado',
    quando: 'No mesmo dia da conversa, enquanto você ainda lembra dos detalhes.',
    texto: `Resumo da conversa de [data]

O que conversamos:
- [assuntos]

O que aprendi:
- [ponto 1]
- [ponto 2]

Próximo passo: [ação pequena] até [data]

Próxima conversa: [data]

Obrigado pelo seu tempo!`,
  },
  {
    id: 'recusar-pedido',
    grupo: 'saida',
    titulo: 'Recusar um pedido',
    quemEnvia: 'mentor',
    quando: 'Quando alguém pede mentoria e você não tem tempo ou não é a pessoa certa para o tema.',
    texto: `Oi, [nome]! Obrigado por pensar em mim, fico feliz com o convite.

Agora eu não consigo [motivo curto, ex.: assumir mais uma conversa].

Uma ideia: [indicação de pessoa, comunidade ou material]. Ou, se ainda fizer sentido, me procura de novo em [quando].

Boa sorte com [tema]!`,
  },
  {
    id: 'pausar-encerrar',
    grupo: 'saida',
    titulo: 'Pausar ou encerrar',
    quemEnvia: 'ambos',
    quando: 'Quando um dos dois precisa dar um tempo ou sente que a mentoria cumpriu o papel.',
    texto: `Oi, [nome]! Obrigado por todas as nossas conversas.

Preciso [pausar / encerrar] a mentoria por [motivo curto].

Olhando para trás, você evoluiu muito em [o que evoluiu]. Foi bom acompanhar isso de perto.

A porta fica aberta: se quiser conversar de novo em [quando], é só me chamar.`,
  },
]
