// -- JWT Authorization Helpers --

export function getToken(key: string): string | null {
  return localStorage.getItem(key);
}
