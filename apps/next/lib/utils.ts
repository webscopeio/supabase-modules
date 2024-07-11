import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// #region cn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// #endregion cn

// #region generateHSL
export function generateHSL({
  hue,
  theme = "dark",
}: {
  hue: string
  theme: string | undefined
}): [string, string] {
  const lightness = theme === "dark" ? "50%" : "65%"
  const saturation = "85%"

  let complementaryHue = parseInt(hue) + 112
  if (complementaryHue >= 360) {
    complementaryHue -= 360
  }

  const color1 = `hsl(${hue}, ${saturation}, ${lightness})`
  const color2 = `hsl(${complementaryHue}, ${saturation}, ${lightness})`

  return [color1, color2]
}
// #endregion generateHSL

// #region throwServerError
export function throwServerError<TReturn>(
  value: TReturn | { error: { message: string } }
): TReturn {
  if (value && typeof value === "object" && "error" in value) {
    throw new Error(value.error.message)
  }
  return value
}
// #endregion throwServerError

// #region parseString
type parseFn<TReturn> = (payload: Record<string, unknown>) => TReturn

export function parseString<ParsedString extends Record<string, unknown>>({
  schema,
  string,
}: {
  schema: {
    parse: parseFn<ParsedString>
  }
  string?: string
}): ParsedString | undefined {
  if (string) {
    try {
      return schema.parse(JSON.parse(string) as Record<string, unknown>)
    } catch (_error) {
      return schema.parse({})
    }
  }
}
// #endregion parseString
