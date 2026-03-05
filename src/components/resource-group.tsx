import { cn } from "@/lib/utils"

interface ResourceGroupProps {
  children: React.ReactNode
  className?: string
}

export function ResourceGroup({ children, className }: ResourceGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2 ", className)}>
      {children}
    </div>
  )
}
