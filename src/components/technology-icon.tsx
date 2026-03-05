import { Code, Globe } from "lucide-react"

export function getTechnologyIcon(name: string, className?: string) {
  const normalizedName = name.toLowerCase()
  const sizeClass = "w-12 h-12"
  const combinedClass = className ? `${sizeClass} ${className}` : sizeClass

  switch (normalizedName) {
    case "javascript":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
          alt="JavaScript"
          className={combinedClass}
        />
      )
    case "typescript":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          alt="TypeScript"
          className={combinedClass}
        />
      )
    case "html":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
          alt="HTML"
          className={combinedClass}
        />
      )
    case "css":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
          alt="CSS"
          className={combinedClass}
        />
      )
    case "python":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python"
          className={combinedClass}
        />
      )
    case "go":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
          alt="Go"
          className={combinedClass}
        />
      )
    case "java":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
          alt="Java"
          className={combinedClass}
        />
      )
    case "php":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
          alt="PHP"
          className={combinedClass}
        />
      )
    case "web":
      return <Globe className={combinedClass} />
    default:
      return <Code className={combinedClass} />
  }
}
