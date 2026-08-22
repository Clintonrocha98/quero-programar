import type { CurriculoBuilderState, CurriculoData, CurriculoOpcionais } from '@/types/curriculo'

function criarCurriculoModelo(): CurriculoData {
  return {
    header: {
      nome_completo: 'Seu Nome Completo',
      email: 'seu-email@gmail.com',
      telefone: '(00) 00000-0000',
      linkedin_url: 'https://linkedin.com/in/seu-usuario',
      github_url: 'https://github.com/seu-usuario',
    },
    resumo: {
      texto_resumo:
        'Tenho objetivo em atuar como Desenvolvedor PHP, com experiência no planejamento técnico de novas funcionalidades, na refatoração de código legado e na definição de escopo e arquitetura de aplicações Laravel. Ao longo da minha trajetória, participei ativamente de decisões que impactam diretamente a manutenibilidade e a escalabilidade dos sistemas, sempre buscando entregar software sustentável e de fácil manutenção em equipe. Utilizo ferramentas de inteligência artificial integradas ao meu fluxo de desenvolvimento para acelerar entregas sem abrir mão da qualidade, o que me permite equilibrar velocidade e robustez técnica em cada projeto que participo.',
    },
    experiencias: [
      {
        id: crypto.randomUUID(),
        empresa: 'Empresa de Tecnologia',
        cargo: 'Desenvolvedor Fullstack',
        vinculo: 'CLT',
        data_inicio: '2025-07',
        data_fim: null,
        atual: true,
        tecnologias: ['PHP', 'Laravel', 'Filament', 'Livewire', 'Tailwind', 'Docker'],
        blocos: [
          {
            contexto:
              'Atuação no desenvolvimento e evolução de uma plataforma SaaS de gestão voltada para aceleradoras de negócios, responsável por centralizar processos de mentoria, acompanhamento de startups e indicadores de performance para múltiplos clientes.',
            realizacoes: [
              'Participação ativa no planejamento técnico e na definição de escopo de novas funcionalidades',
              'Manutenção e evolução de módulos críticos do painel administrativo em Filament',
              'Implementação de Docker para padronização do ambiente e simplificação do deploy',
              'Refatoração contínua de código legado com cobertura de testes em Pest',
            ],
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        empresa: 'Autônomo',
        cargo: 'Desenvolvedor Fullstack',
        vinculo: 'Autônomo',
        data_inicio: '2025-01',
        data_fim: '2025-06',
        atual: false,
        tecnologias: ['PHP', 'Laravel', 'Livewire', 'MySQL', 'Tailwind'],
        blocos: [
          {
            contexto:
              'Desenvolvimento de um sistema de agendamento online para uma clínica de fisioterapia, permitindo que pacientes marcassem consultas, recebessem confirmações automáticas e que a equipe administrativa gerenciasse a agenda dos profissionais em tempo real.',
            realizacoes: [
              'Implementei o módulo de agendamento com verificação automática de conflitos de horário',
              'Otimizei consultas ao banco de dados que reduziram o tempo de carregamento da agenda',
              'Integrei um serviço de envio de SMS para confirmação e lembrete de consultas',
            ],
          },
          {
            contexto:
              'Construção de uma loja virtual de pequeno porte para um cliente do setor de artesanato, com catálogo de produtos, carrinho de compras e integração com gateway de pagamento.',
            realizacoes: [
              'Implementei o fluxo completo de checkout, do carrinho ao pagamento',
              'Otimizei o carregamento das páginas de produto com lazy loading de imagens',
              'Integrei o gateway de pagamento para processar cartão de crédito e Pix',
            ],
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        empresa: 'Agência de Desenvolvimento',
        cargo: 'Desenvolvedor Backend',
        vinculo: 'Estágio',
        data_inicio: '2024-03',
        data_fim: '2024-12',
        atual: false,
        tecnologias: ['PHP', 'Laravel', 'MySQL', 'Git'],
        blocos: [
          {
            contexto:
              'Manutenção e suporte de sites institucionais e APIs internas para clientes de diversos segmentos atendidos pela agência, com foco em correção de bugs e pequenas evoluções sob demanda.',
            realizacoes: [
              'Corrigi bugs reportados por clientes em sistemas Laravel já em produção',
              'Desenvolvi endpoints de API REST para integração com sites institucionais',
              'Documentei rotinas internas de deploy e configuração de ambiente',
            ],
          },
        ],
      },
    ],
    hard_skills: [
      'PHP',
      'Laravel',
      'Livewire',
      'Filament',
      'Pest',
      'PHPUnit',
      'MySQL',
      'PostgreSQL',
      'Docker',
      'Git',
      'Tailwind',
      'JavaScript',
      'TypeScript',
      'React',
    ],
    projetos: [
      {
        id: crypto.randomUUID(),
        nome: 'Sistema de Pagamentos',
        escopo: 'Back-end',
        link: '',
        stack: ['Express', 'Typescript', 'PostgreSQL', 'Docker', 'Vitest'],
        descricao:
          'API que simula transferências entre usuários e lojistas, com validação de autorização externa e envio de notificações após cada transação.',
        destaques: [
          'Transações financeiras atômicas para garantir consistência mesmo em caso de falha',
          'Arquitetura em camadas separando regras de negócio, persistência e HTTP',
          'Testes de integração cobrindo os principais fluxos de transferência',
        ],
      },
      {
        id: crypto.randomUUID(),
        nome: 'Encurtador de URL',
        escopo: 'Fullstack',
        link: '',
        stack: ['Laravel', 'Livewire', 'MySQL', 'Docker'],
        descricao: 'Aplicação para encurtar URLs e acompanhar o número de cliques em cada link gerado.',
        destaques: [
          'Geração de slugs únicos com verificação de colisão',
          'Painel para acompanhar estatísticas de acesso por link',
        ],
      },
    ],
    opcionais: {
      formacao: [],
      certificacoes: [],
      idiomas: [],
    },
  }
}

export const curriculoModelo: CurriculoData = criarCurriculoModelo()

function regenerarIds(data: CurriculoData): CurriculoData {
  data.experiencias.forEach((experiencia) => {
    experiencia.id = crypto.randomUUID()
  })

  data.projetos.forEach((projeto) => {
    projeto.id = crypto.randomUUID()
  })

  const opcionais: CurriculoOpcionais = data.opcionais

  opcionais.formacao.forEach((item) => {
    item.id = crypto.randomUUID()
  })

  opcionais.certificacoes.forEach((item) => {
    item.id = crypto.randomUUID()
  })

  opcionais.idiomas.forEach((item) => {
    item.id = crypto.randomUUID()
  })

  return data
}

export function estadoDoModelo(): CurriculoBuilderState {
  return {
    data: regenerarIds(structuredClone(curriculoModelo)),
    opcionaisAtivos: { formacao: false, certificacoes: false, idiomas: false },
  }
}
