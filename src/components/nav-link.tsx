import { NavLinkProps } from "@/types";

export function NavLink({ href, icon, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center text-sm font-medium text-metal-300 hover:text-steel-blue-light hover:bg-metal-800/50 px-3 py-2 rounded-md transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}
