import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import type { ReactNode } from "react"

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  showHome?: boolean
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function Breadcrumb({
  className,
  items,
  separator,
  maxItems,
  showHome = true,
  ...props
}: BreadcrumbProps) {
  const allItems = showHome
    ? [{ label: "Início", href: "/", icon: <HomeIcon /> }, ...items]
    : items

  let displayItems = allItems

  if (maxItems && allItems.length > maxItems) {
    const firstItem = allItems[0]
    const lastItems = allItems.slice(-maxItems + 1)
    displayItems = [firstItem, { label: "...", href: undefined }, ...lastItems]
  }

  const defaultSeparator = (
    <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0 text-metal-500" />
  )

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1
          const isEllipsis = item.label === "..."

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (separator || defaultSeparator)}

              {isEllipsis ? (
                <span className="px-1 text-metal-500">...</span>
              ) : isLast ? (
                <span
                  className="flex items-center gap-1.5 font-medium text-metal-200"
                  aria-current="page"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-metal-400 transition-colors hover:text-steel-blue-light"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-metal-400">
                  {item.icon}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
