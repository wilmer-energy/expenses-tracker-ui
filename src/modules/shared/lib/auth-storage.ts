const TOKEN_KEY = "expensex_access_token";
const STORAGE_TYPE_KEY = "expensex_token_storage";

type StorageType = "local" | "session";

function getStorage(type: StorageType): Storage {
  return type === "local" ? localStorage : sessionStorage;
}

export function setAccessToken(token: string, rememberMe: boolean): void {
  const storageType: StorageType = rememberMe ? "local" : "session";
  localStorage.setItem(STORAGE_TYPE_KEY, storageType);

  getStorage("local").removeItem(TOKEN_KEY);
  getStorage("session").removeItem(TOKEN_KEY);
  getStorage(storageType).setItem(TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
  );
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STORAGE_TYPE_KEY);
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}
