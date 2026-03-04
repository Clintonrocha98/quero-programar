import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card"
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  lines = 1,
  ...props
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-metal-800"

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
    card: "rounded-lg",
  }

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(baseClasses, variantClasses.text)}
            style={{
              ...style,
              width: index === lines - 1 ? "75%" : style.width || "100%",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-lg border border-metal-700 bg-metal-900 p-4",
          className
        )}
        style={style}
        {...props}
      >
        <div className="mb-4 flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
        <Skeleton variant="text" lines={3} />
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, ...props }: Omit<SkeletonProps, "variant">) {
  return <Skeleton variant="text" lines={lines} {...props} />
}

export function SkeletonAvatar({
  size = 40,
  ...props
}: Omit<SkeletonProps, "variant" | "width" | "height"> & { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} {...props} />
}

export function SkeletonCard(props: Omit<SkeletonProps, "variant">) {
  return <Skeleton variant="card" {...props} />
}
