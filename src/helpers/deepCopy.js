export function deepCopy(proxy) {
  return JSON.parse(JSON.stringify(proxy));
}
