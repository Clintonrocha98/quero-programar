import {
  Home,
  Map,
  Code,
  BookOpen,
  FileText,
  Wrench,
  Rocket,
  Bug,
  LucideIcon
} from 'lucide-react'

/**
 * Mapeamento de nomes de ícones para componentes Lucide
 */
const iconMap: Record<string, LucideIcon> = {
  Home,
  Map,
  Code,
  BookOpen,
  FileText,
  Wrench,
  Rocket,
  Bug,
}

/**
 * Retorna o componente de ícone baseado no nome
 */
export function getIcon(name: string): LucideIcon | null {
  return iconMap[name] || null
}
