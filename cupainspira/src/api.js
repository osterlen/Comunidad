/* Cliente API CUPA → Cloudflare Worker + Notion */
(function () {
  const base = () => (window.CUPA_API_BASE || window.API_BASE || "https://cupa-api.dupeyronosterlen.workers.dev").replace(/\/$/, "");

  async function call(path, opts = {}) {
    const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
    const session = localStorage.getItem("cupa_session");
    if (session && !headers.Authorization) headers.Authorization = "Bearer " + session;
    let res;
    try {
      res = await fetch(base() + path, Object.assign({}, opts, { headers }));
    } catch (e) {
      return { ok: false, error: "Sin conexión con el servidor de registro. Intenta más tarde." };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return Object.assign({ ok: false, error: data.error || res.statusText }, data);
    return data;
  }

  window.CupaAPI = {
    register: (body) => call("/api/register", { method: "POST", body: JSON.stringify(body) }),
    verify: (token) => call("/api/verify", { method: "POST", body: JSON.stringify({ token }) }),
    login: (payload) => call("/api/login", { method: "POST", body: JSON.stringify(typeof payload === "string" ? { email: payload } : payload) }),
    me: () => call("/api/me", { method: "GET" }),
    setSession: (token) => {
      if (token) localStorage.setItem("cupa_session", token);
      else localStorage.removeItem("cupa_session");
    },
    getSession: () => localStorage.getItem("cupa_session"),
  };
})();
