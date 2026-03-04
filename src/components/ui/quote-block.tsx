import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type QuoteVariant = "default" | "primary" | "accent" | "warning" | "success"

export interface QuoteBlockProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: ReactNode
  author?: string
  source?: string
  variant?: QuoteVariant
}

const variantStyles: Record<QuoteVariant, string> = {
  default: "border-metal-600 bg-metal-900/50",
  primary: "border-steel-blue bg-steel-blue/10",
  accent: "border-cyan-accent bg-cyan-accent/10",
  warning: "border-amber-accent bg-amber-accent/10",
  success: "border-emerald-accent bg-emerald-accent/10",
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v4z" />
    </svg>
  )
}

export function QuoteBlock({
  className,
  children,
  author,
  source,
  variant = "default",
  ...props
}: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "relative rounded-r-lg border-l-4 py-4 pl-6 pr-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="absolute -left-3 -top-2 text-metal-600 opacity-30">
        <QuoteIcon className="h-8 w-8" />
      </div>
      <div className="relative">
        <p className="text-base italic leading-relaxed text-metal-200">
          {children}
        </p>
        {(author || source) && (
          <footer className="mt-3 text-sm not-italic text-metal-400">
            {author && <span className="font-medium">— {author}</span>}
            {source && (
              <cite className="ml-1">
                {author ? ", " : "— "}
                {source}
              </cite>
            )}
          </footer>
        )}
      </div>
    </blockquote>
  )
}
