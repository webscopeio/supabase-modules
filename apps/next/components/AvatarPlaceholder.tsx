import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export const AvatarPlaceholder: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { resolvedTheme: theme } = useTheme()
  // Temporarily using a fixed hue
  // const baseHue = Math.floor(Math.random() * 360).toString()
  const baseHue = "220"
  const [color1, color2] = generateHSL({ baseHue, theme })

  return (
    <div
      style={{
        background: `linear-gradient(to top right, ${color1} 25%, ${color2})`,
      }}
      className={cn(
        "size-9 shrink-0 rounded-full dark:border-border",
        className
      )}
    />
  )
}

function generateHSL({
  baseHue,
  theme = "dark",
}: {
  baseHue: string
  theme: string | undefined
}): [string, string] {
  const lightness = theme === "dark" ? "50%" : "65%"
  const saturation = "85%"

  let contrastingHue = parseInt(baseHue) + 112
  if (contrastingHue >= 360) {
    contrastingHue -= 360
  }

  const color1 = `hsl(${baseHue}, ${saturation}, ${lightness})`
  const color2 = `hsl(${contrastingHue}, ${saturation}, ${lightness})`

  return [color1, color2]
}
