export type Papel = 'mentor' | 'mentorado'

export interface ExemploPassoAFrente {
  id: string
  tema: string
  atras: string
  aFrente: string
  frase: string
}

export const exemplosPassoAFrente: ExemploPassoAFrente[] = [
  {
    id: 'estagio',
    tema: 'Primeiro estágio',
    atras: 'Ainda está mandando currículo',
    aFrente: 'Conseguiu o primeiro estágio',
    frase: 'Quem conseguiu o primeiro estágio pode ajudar quem ainda está mandando currículo.',
  },
  {
    id: 'projeto',
    tema: 'Primeiro projeto',
    atras: 'Travou no meio do projeto',
    aFrente: 'Terminou o primeiro projeto',
    frase: 'Quem terminou o primeiro projeto pode ajudar quem travou no meio do seu.',
  },
  {
    id: 'carreira',
    tema: 'Começo de carreira',
    atras: 'Está começando agora',
    aFrente: 'Júnior com algum tempo de carreira',
    frase: 'Uma pessoa júnior com algum tempo de carreira pode ajudar muito quem está começando agora.',
  },
]

export const frequenciaAberta =
  'Não existe número certo de sessões. Vocês decidem juntos a frequência, a duração e até quando faz sentido continuar.'
