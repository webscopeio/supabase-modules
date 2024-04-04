export function getDigest(error: Error | null): string | undefined {
  return error && "digest" in error && typeof error.digest === "string"
    ? error.digest
    : undefined
}
