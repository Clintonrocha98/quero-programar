import { LucideIcon } from 'lucide-react'
import { IconMap } from '@/data/icons'

export function getIcon(name: string): LucideIcon | null {
  return IconMap[name] || null
}
