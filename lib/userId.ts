const STORAGE_KEY = "hotel_guest_userid";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `user_${crypto.randomUUID()}`;
  }
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return randomId();
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = randomId();
    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return randomId();
  }
}

export function resetUserId(): string {
  const id = randomId();
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  return id;
}
