import { LucideIcon } from 'lucide-react'
import { IconMap } from '../../data/icons'

/**
 * Retorna o componente de ícone baseado no nome centralizado em data/icons
 */
export function getIcon(name: string): LucideIcon | null {
  return IconMap[name] || null
}
