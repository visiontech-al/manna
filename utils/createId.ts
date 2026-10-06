/** Short unique-enough id for locally created records. Not for security use. */
export function createId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
