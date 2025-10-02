// Extract token from request headers (for API routes or middleware)
export const getAccessTokenFromHeaders = (req: Request | null | undefined): string | null => {
  if (!req) return null;
  const authHeader = req.headers?.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
};

// Save token in localStorage (client-side only)
export const saveAccessToken = (token: string): void => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("accessToken", btoa(token));
};

// Get token from localStorage
export const getAccessToken = (): string | null => {
  if (typeof localStorage === "undefined") return null;
  const token = localStorage.getItem("accessToken");
  return token ? atob(token) : null;
};

// Delete token from localStorage
export const deleteAccessToken = (): void => {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem("accessToken");
};
