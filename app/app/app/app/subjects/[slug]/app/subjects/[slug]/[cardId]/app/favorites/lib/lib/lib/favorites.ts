const FAVORITES_KEY = "mind-class-favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(cardId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(cardId)) {
    favorites.push(cardId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(cardId: string): void {
  const favorites = getFavorites().filter((id) => id !== cardId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(cardId: string): boolean {
  return getFavorites().includes(cardId);
}
