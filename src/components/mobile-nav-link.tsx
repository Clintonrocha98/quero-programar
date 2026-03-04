import { NavLinkProps } from "@/types";

export function MobileNavLink({ href, icon, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center text-base font-medium text-metal-300 hover:text-steel-blue-light hover:bg-metal-800 px-3 py-3 rounded-md transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}
