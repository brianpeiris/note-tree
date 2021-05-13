export function firstIndexOf(str, pattern, start) {
  const matches = Array.from(str.matchAll(pattern)).filter(m => m.index > start);
  if (matches && matches.length) return matches[0].index;
  return null;
}
export function lastIndexOf(str, pattern, start) {
  const matches = Array.from(str.matchAll(pattern)).reverse().filter(m => m.index < start);
  if (matches && matches.length) return matches[0].index;
  return null;
}
