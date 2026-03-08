import { Code, Map, BookOpen, FileText, Bug, Wrench, Rocket, Monitor, Briefcase, Users, LayoutTemplate, Share2, Youtube, Twitch, Twitter, Github, Linkedin, MessageCircle, Terminal, Coffee, Layers, Database } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Mapa centralizado de ícones usados em configurações (como navigation.ts e frontmatter de MDX)
// Usamos string nos arquivos de configuração e aqui mapeamos para o componente real do Lucide
export const IconMap: Record<string, LucideIcon> = {
  Code,
  Map,
  BookOpen,
  FileText,
  Bug,
  Wrench,
  Rocket,
  Monitor,
  Briefcase,
  Users,
  LayoutTemplate,
  Share2,
  Youtube,
  Twitch,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  Terminal,
  Coffee,
  Layers,
  Database,
}

export type IconName = keyof typeof IconMap
