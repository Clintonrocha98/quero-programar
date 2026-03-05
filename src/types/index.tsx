export interface ResourceProps {
  title: string
  url: string
  type: string
  description: string
}

export interface ResourceSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  resources: ResourceProps[]
}


export interface TecnologiesInformationsInterface {
  id?: string
  name: string
  description: string
  icon: string
  color: string
  url: string
}

export interface Category {
  name: string
  description: string
  icon: React.ReactNode
  url: string
}

export interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}