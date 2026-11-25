import { Code, Map, BookOpen, FileText, Bug, Wrench, Monitor, Briefcase, Users, LayoutTemplate, Share2, Youtube, Twitch, Twitter, Linkedin, MessageCircle, Terminal, Coffee, Layers, Database, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// navigation.ts e o frontmatter MDX guardam o ícone como string. Este mapa liga a string ao componente do Lucide.
export const IconMap: Record<string, LucideIcon> = {
  Code,
  Map,
  BookOpen,
  FileText,
  Bug,
  Wrench,
  Monitor,
  Briefcase,
  Users,
  LayoutTemplate,
  Share2,
  Youtube,
  Twitch,
  Twitter,
  Linkedin,
  MessageCircle,
  Terminal,
  Coffee,
  Layers,
  Database,
  Handshake,
}

export type IconName = keyof typeof IconMap
