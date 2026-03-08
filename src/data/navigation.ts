import { NavigationConfig } from '../types/navigation'

/**
 * Configuração da estrutura de navegação da sidebar
 * Baseado nas rotas existentes no App.tsx
 */
export const navigationConfig: NavigationConfig = {
  items: [
    {
      id: 'inicio',
      label: 'O Começo',
      icon: 'Home',
      href: '/'
    },
    {
      id: 'plano-estudos',
      label: 'Plano de Estudos',
      icon: 'Map',
      href: '/plano-de-estudos'
    },
    {
      id: 'tecnologias',
      label: 'Tecnologias',
      icon: 'Code',
      children: [
        { id: 'tecnologias-todas', label: 'Ver Todas', href: '/tecnologias' },
        { id: 'html', label: 'HTML', href: '/tecnologias/html' },
        { id: 'css', label: 'CSS', href: '/tecnologias/css' },
        { id: 'javascript', label: 'JavaScript', href: '/tecnologias/javascript' },
        { id: 'typescript', label: 'TypeScript', href: '/tecnologias/typescript' },
        { id: 'python', label: 'Python', href: '/tecnologias/python' },
        { id: 'java', label: 'Java', href: '/tecnologias/java' },
        { id: 'go', label: 'Go', href: '/tecnologias/go' },
        { id: 'php', label: 'PHP', href: '/tecnologias/php' },
      ]
    },
    {
      id: 'comunidade-4noobs',
      label: 'He4rt',
      icon: 'Rocket',
      children: [
        { id: '4noobs-todas', label: 'Ver Todas', href: '/he4rt/4noobs' },
        { id: '4noobs-linguagens', label: 'Linguagens', href: '/he4rt/4noobs/linguagens' },
        { id: '4noobs-frameworks', label: 'Frameworks', href: '/he4rt/4noobs/frameworks' },
        { id: '4noobs-ferramentas', label: 'Ferramentas', href: '/he4rt/4noobs/ferramentas' },
        { id: '4noobs-banco-de-dados', label: 'Bancos de Dados', href: '/he4rt/4noobs/banco-de-dados' },
        { id: '4noobs-sistemas-operacionais', label: 'Sistemas Operacionais', href: '/he4rt/4noobs/sistemas-operacionais' },
        { id: '4noobs-design', label: 'Design', href: '/he4rt/4noobs/design' },
        { id: '4noobs-paradigmas', label: 'Paradigmas', href: '/he4rt/4noobs/paradigmas' },
        { id: '4noobs-diversos', label: 'Diversos', href: '/he4rt/4noobs/diversos' },
        { id: '4noobs-certificacoes', label: 'Certificações', href: '/he4rt/4noobs/certificacoes' },
      ]
    },
    {
      id: 'recursos',
      label: 'Recursos',
      icon: 'BookOpen',
      href: '/recursos'
    },
    {
      id: 'artigos',
      label: 'Artigos',
      icon: 'FileText',
      href: '/artigos'
    },
    {
      id: 'como-debugar',
      label: 'Como Debugar',
      icon: 'Bug',
      href: '/como-debugar'
    },
    {
      id: 'ferramentas',
      label: 'Ferramentas',
      icon: 'Wrench',
      badge: 'Em breve',
      children: []
    },
    {
      id: 'projetos',
      label: 'Projetos',
      icon: 'Rocket',
      badge: 'Em breve',
      children: []
    }
  ],
  defaultExpanded: []
}
