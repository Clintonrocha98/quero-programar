import { createContext } from 'react'
import { SidebarContextValue } from '../types/navigation'

export const SidebarContext = createContext<SidebarContextValue | null>(null)
