const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5001" : "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  register: (payload) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  firebaseLogin: (payload) =>
    request("/api/auth/firebase", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  me: (token) =>
    request("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};
