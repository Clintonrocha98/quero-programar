import {cn} from "@/lib/utils"
import {useState} from "react"
import {Highlight, type Language, themes} from "prism-react-renderer"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  maxHeight?: string | number
}

function CopyIcon({className}: { className?: string }) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  )
}

function CheckIcon({className}: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

export function CodeBlock({
                            className,
                            code,
                            language = "plaintext",
                            filename,
                            showLineNumbers = true,
                            highlightLines = [],
                            maxHeight,
                            ...props
                          }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const style = maxHeight
    ? {maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight}
    : undefined

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-metal-700 bg-[#1e1e1e]",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-metal-700 bg-metal-850 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-accent/80"/>
            <span className="h-3 w-3 rounded-full bg-amber-accent/80"/>
            <span className="h-3 w-3 rounded-full bg-emerald-accent/80"/>
          </div>
          {filename && (
            <span className="ml-2 font-mono text-xs text-metal-400">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-metal-500">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md p-1.5 text-metal-400 transition-colors hover:bg-metal-800 hover:text-metal-200"
            aria-label={copied ? "Copiado" : "Copiar código"}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-emerald-accent"/>
            ) : (
              <CopyIcon className="h-4 w-4"/>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div
        className={cn(
          "overflow-auto p-4 font-mono text-sm",
          maxHeight && "overflow-y-auto"
        )}
        style={style}
      >
        <Highlight
          theme={themes.vsDark}
          code={code}
          language={language as Language}
        >
          {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre style={{...style, backgroundColor: "transparent"}} className={cn(className, 'm-0')}>
              {tokens.map((line, i) => {
                const lineNumber = i + 1
                const isHighlighted = highlightLines.includes(lineNumber)

                return (
                  <div
                    key={i}
                    {...getLineProps({line, key: i})}
                    className={cn(
                      "table-row",
                      isHighlighted && "bg-steel-blue/15 block -mx-4 px-4 w-[calc(100%+2rem)]"
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        className={cn(
                          "table-cell min-w-[3ch] select-none pr-4 text-right text-metal-500",
                          isHighlighted && "text-steel-blue-light"
                        )}
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({token, key})} />
                      ))}
                    </span>
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
