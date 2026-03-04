import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

const tagVariants = cva(
  "inline-flex items-center font-medium transition-all duration-200 border",
  {
    variants: {
      variant: {
        default: "bg-metal-800/50 text-metal-200 border-metal-700",
        primary: "bg-steel-blue/20 text-steel-blue-light border-steel-blue/30",
        secondary: "bg-amber-accent/20 text-amber-accent border-amber-accent/30",
        success: "bg-emerald-accent/20 text-emerald-accent border-emerald-accent/30",
        warning: "bg-amber-accent/20 text-amber-accent border-amber-accent/30",
        error: "bg-rose-accent/20 text-rose-accent border-rose-accent/30",
        info: "bg-cyan-accent/20 text-cyan-accent border-cyan-accent/30",
        outline: "bg-transparent text-metal-300 border-metal-600 hover:border-metal-500",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        md: "px-2.5 py-1 text-sm rounded-md",
        lg: "px-3 py-1.5 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: ReactNode
  icon?: ReactNode
}

export function Tag({
  className,
  variant,
  size,
  children,
  icon,
  ...props
}: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
