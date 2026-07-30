/**
 * CUPA Inspira API — registro vecinal vía Notion + sesión.
 * Secrets: NOTION_TOKEN, NOTION_VECINOS_DB, SESSION_SECRET
 * Opcionales: RESEND_API_KEY, FROM_EMAIL, PUBLIC_SITE (default https://elgorila.org/cupainspira/)
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function bad(msg, status = 400) {
  return json({ ok: false, error: msg }, status);
}

async function sha(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function token() {
  const a = new Uint8Array(24);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function notionHeaders(env) {
  return {
    Authorization: `Bearer ${env.NOTION_TOKEN}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  };
}

function propText(page, name) {
  const p = page.properties?.[name];
  if (!p) return "";
  if (p.type === "title") return (p.title || []).map((t) => t.plain_text).join("") || "";
  if (p.type === "rich_text") return (p.rich_text || []).map((t) => t.plain_text).join("") || "";
  if (p.type === "email") return p.email || "";
  if (p.type === "phone_number") return p.phone_number || "";
  if (p.type === "select") return p.select?.name || "";
  if (p.type === "multi_select") return (p.multi_select || []).map((s) => s.name);
  if (p.type === "number") return p.number;
  if (p.type === "url") return p.url || "";
  if (p.type === "checkbox") return !!p.checkbox;
  return "";
}

/** Query any database id */
async function notionQueryDb(env, databaseId, body = {}) {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: notionHeaders(env),
    body: JSON.stringify(Object.assign({ page_size: 100 }, body)),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Notion query failed");
  return data.results || [];
}

async function notionQuery(env, filter) {
  return notionQueryDb(env, env.NOTION_VECINOS_DB, { filter, page_size: 10 });
}

/**
 * Carpeta Notion "Pagina" → base Contendido (NOTION_PAGINA_DB).
 * Tipos: aviso | ahora | convocatoria | oficio | local | oferta | curiosidad | cine | historia | guia | gaceta
 */
function rowToContent(page) {
  const tipo = String(propText(page, "Tipo") || "").toLowerCase();
  const titulo = propText(page, "Titulo") || propText(page, "Nombre") || "";
  const orden = propText(page, "Orden");
  const tag = propText(page, "Tag");
  const cuerpo = propText(page, "Cuerpo") || propText(page, "Desc") || "";
  const cta = propText(page, "CTA") || propText(page, "CTA_label") || "";
  const link = propText(page, "Link") || propText(page, "CTA_href") || "";
  const tone = String(propText(page, "Tone") || propText(page, "Tono") || "").toLowerCase();
  const meta = propText(page, "Meta") || propText(page, "Year") || propText(page, "Edificio") || "";
  const status = propText(page, "Estatus") || propText(page, "Status") || "";
  const id = (propText(page, "Id") || page.id || "").replace(/-/g, "").slice(0, 12) || page.id;
  const pubProp = page.properties?.Publicado;
  const published = !pubProp || pubProp.type !== "checkbox" ? true : !!pubProp.checkbox;

  return {
    id,
    tipo,
    title: titulo,
    name: titulo,
    orden: typeof orden === "number" ? orden : parseInt(orden, 10) || 0,
    tag: Array.isArray(tag) ? (tag[0] || "") : tag,
    body: cuerpo,
    desc: cuerpo,
    cta_label: cta,
    cta_href: link,
    tone: tone || (tipo === "ahora" ? "green" : ""),
    meta,
    year: meta,
    note: cuerpo,
    status: status || "",
    eyebrow: propText(page, "Eyebrow") || (Array.isArray(tag) ? tag[0] : tag) || "",
    product: propText(page, "Producto") || titulo,
    vecino: propText(page, "Vecino") || "",
    edif: propText(page, "Edificio") || meta || "",
    type: propText(page, "Giro") || (Array.isArray(tag) ? tag[0] : tag) || "",
    loc: propText(page, "Ubicacion") || meta || "",
    published,
  };
}

function packContent(rows) {
  const published = rows
    .map(rowToContent)
    .filter((r) => r.tipo && r.published)
    .sort((a, b) => a.orden - b.orden);

  const by = (t) => published.filter((r) => r.tipo === t);

  const avisos = {
    updated: new Date().toISOString().slice(0, 10),
    items: by("aviso").map((r) => ({ id: r.id, title: r.title, body: r.body, tag: r.tag || "Aviso" })),
  };

  const ahora = by("ahora").map((r) => ({
    id: r.id,
    eyebrow: r.eyebrow || "Ahora",
    title: r.title,
    body: r.body,
    cta_label: r.cta_label || "Ver",
    cta_href: r.cta_href || "#/avisos",
    tone: r.tone === "red" || r.tone === "cream" ? r.tone : "green",
  }));

  const convocatorias = by("convocatoria").map((r) => ({
    id: r.id,
    title: r.title,
    tag: r.tag || "Comunidad",
    status: r.status || "abierta",
    desc: r.body,
    cta_label: r.cta_label || "Ver",
    cta_href: r.cta_href || "#/",
  }));

  const emprendimiento = by("oficio").map((r) => ({
    id: r.id,
    vecino: r.vecino || r.meta || "Vecino",
    product: r.product || r.title,
    edif: r.edif || "",
    emoji: "•",
  }));

  const comercio = by("local").map((r) => ({
    id: r.id,
    name: r.title,
    type: r.type || "Local",
    loc: r.loc || "",
  }));

  const ofertas = by("oferta").map((r) => ({
    id: r.id,
    title: r.title,
    body: r.body,
    tag: r.tag || "Oferta",
    cta_label: r.cta_label,
    cta_href: r.cta_href,
  }));

  const historiaParas = by("historia").map((r) => r.body).filter(Boolean);
  const memoria = {
    updated: new Date().toISOString().slice(0, 10),
    title: "El CUPA",
    lede: by("memoria_lede")[0]?.body || "Historia, cine, curiosidades y guía práctica del Centro Urbano Presidente Alemán.",
    historia: {
      eyebrow: by("historia")[0]?.eyebrow || "1947 — 1949",
      headline: by("historia")[0]?.title || "Un pequeño mundo en concreto y jardín",
      paras: historiaParas.length ? historiaParas : undefined,
    },
    curiosidades: by("curiosidad").map((r) => ({ title: r.title, body: r.body })),
    cine: {
      intro: by("cine_intro")[0]?.body || "Películas y locaciones verificables:",
      items: by("cine").map((r) => ({ year: r.year || r.meta, title: r.title, note: r.note || r.body })),
      sources_note: by("cine_fuente")[0]?.body || "",
    },
    guia: {
      intro: by("guia_intro")[0]?.body || "",
      bloques: by("guia").map((r) => ({
        id: r.id,
        title: r.title,
        body: r.body,
        cta_label: r.cta_label || null,
        cta_href: r.cta_href || null,
        status: r.status === "pronto" ? "pronto" : undefined,
      })),
    },
  };
  if (!memoria.historia.paras) delete memoria.historia.paras;

  const gacetaArts = by("gaceta");
  const gaceta = gacetaArts.length
    ? {
        issue: by("gaceta_meta")[0]?.title || undefined,
        date: by("gaceta_meta")[0]?.meta || undefined,
        headline: by("gaceta_meta")[0]?.body || undefined,
        articles: gacetaArts.map((r) => ({ tag: r.tag || "Gaceta", title: r.title, excerpt: r.body })),
      }
    : null;

  return { avisos, ahora, convocatorias, emprendimiento, comercio, ofertas, memoria, gaceta, raw: published };
}

let contentCache = { at: 0, data: null };

async function handleContent(env, tipo) {
  if (!env.NOTION_PAGINA_DB) {
    return bad("Contenido Notion no configurado (NOTION_PAGINA_DB)", 503);
  }
  const now = Date.now();
  if (!contentCache.data || now - contentCache.at > 60_000) {
    const rows = await notionQueryDb(env, env.NOTION_PAGINA_DB, {});
    contentCache = { at: now, data: packContent(rows) };
  }
  const pack = contentCache.data;
  if (!tipo || tipo === "all") return json({ ok: true, ...pack, source: "notion" });
  if (tipo === "oficios") {
    return json({ ok: true, emprendimiento: pack.emprendimiento, comercio: pack.comercio, ofertas: pack.ofertas, source: "notion" });
  }
  if (pack[tipo] !== undefined) return json({ ok: true, [tipo]: pack[tipo], source: "notion" });
  return bad("Tipo desconocido: " + tipo, 404);
}

function pageToUser(page) {
  return {
    id: page.id,
    name: propText(page, "Nombre"),
    tipo: propText(page, "Tipo") || "vecino",
    building: propText(page, "Edificio"),
    apt: propText(page, "Departamento"),
    local: propText(page, "Local"),
    email: propText(page, "Correo"),
    phone: propText(page, "Telefono"),
    status: propText(page, "Estatus") || "pendiente",
    ofrece: !!propText(page, "Ofrece"),
    oficio: propText(page, "Oficio"),
  };
}

async function notionCreate(env, properties) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: notionHeaders(env),
    body: JSON.stringify({ parent: { database_id: env.NOTION_VECINOS_DB }, properties }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Notion create failed");
  return data;
}

async function notionUpdate(env, pageId, properties) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: notionHeaders(env),
    body: JSON.stringify({ properties }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Notion update failed");
  return data;
}

async function findByEmail(env, email) {
  if (!email) return null;
  const rows = await notionQuery(env, {
    property: "Correo",
    email: { equals: email },
  });
  return rows[0] || null;
}

function digits(phone) {
  return String(phone || "").replace(/\D/g, "");
}

async function findByPhone(env, phone) {
  const raw = String(phone || "").trim();
  if (digits(raw).length < 8) return null;
  const rows = await notionQuery(env, {
    property: "Telefono",
    phone_number: { equals: raw },
  });
  return rows[0] || null;
}

async function findBySession(env, sessionToken) {
  if (!sessionToken) return null;
  const rows = await notionQuery(env, {
    property: "SessionToken",
    rich_text: { equals: sessionToken },
  });
  return rows[0] || null;
}

async function findByVerify(env, verifyToken) {
  const rows = await notionQuery(env, {
    property: "VerifyToken",
    rich_text: { equals: verifyToken },
  });
  return rows[0] || null;
}

async function sendVerifyEmail(env, to, link) {
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return { sent: false };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [to],
      subject: "Confirma tu registro — CUPA Inspira",
      html: `<p>Hola,</p><p>Confirma que eres vecina/o del CUPA:</p><p><a href="${link}">${link}</a></p><p>CUPA Inspira · Visiones AC</p>`,
    }),
  });
  return { sent: res.ok };
}

async function sendGacetaBatch(env, emails, issueUrl, subject) {
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return { ok: false, error: "RESEND no configurado" };
  let sent = 0;
  for (const to of emails) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [to],
        subject: subject || "Nueva Gaceta CUPA Inspira",
        html: `<p>Ya está la nueva Gaceta:</p><p><a href="${issueUrl}">${issueUrl}</a></p>`,
      }),
    });
    if (res.ok) sent++;
  }
  return { ok: true, sent };
}

function siteBase(env) {
  return (env.PUBLIC_SITE || "https://elgorila.org/cupainspira/").replace(/\/?$/, "/");
}

async function handleRegister(req, env) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const tipo = String(body.tipo || "vecino").trim();
  const building = String(body.building || "").trim();
  const apt = String(body.apt || "").trim();
  const local = String(body.local || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const ofrece = !!body.ofrece;
  const oficio = String(body.oficio || "").trim();

  if (!name) return bad("Nombre es obligatorio");
  if (!["vecino", "comercio", "ambos"].includes(tipo)) return bad("Tipo inválido");
  if ((tipo === "vecino" || tipo === "ambos") && (!building || !apt)) {
    return bad("Edificio y departamento son obligatorios para vecinos");
  }
  if ((tipo === "comercio" || tipo === "ambos") && !local) {
    return bad("Número de local es obligatorio para comercios");
  }
  if (!email && !phone) return bad("Necesitamos correo o teléfono");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Correo inválido");

  if (email) {
    const existing = await findByEmail(env, email);
    if (existing) {
      const u = pageToUser(existing);
      if (u.status === "revocado") return bad("Este acceso fue revocado. Escribe a la mesa vecinal.", 403);
      return json({ ok: true, existing: true, user: u, needVerify: u.status === "pendiente" });
    }
  }

  const verifyToken = token();
  const status = "pendiente";

  const properties = {
    Nombre: { title: [{ text: { content: name } }] },
    Tipo: { select: { name: tipo } },
    Estatus: { select: { name: status } },
    Ofrece: { checkbox: ofrece },
    VerifyToken: { rich_text: [{ text: { content: verifyToken } }] },
  };
  if (building) properties.Edificio = { select: { name: building } };
  if (apt) properties.Departamento = { rich_text: [{ text: { content: apt } }] };
  if (local) properties.Local = { rich_text: [{ text: { content: local } }] };
  if (email) properties.Correo = { email };
  if (phone) properties.Telefono = { phone_number: phone };
  if (oficio) properties.Oficio = { rich_text: [{ text: { content: oficio } }] };

  const page = await notionCreate(env, properties);
  const verifyUrl = `${siteBase(env)}#/verificar?token=${verifyToken}`;

  let emailSent = false;
  if (email) {
    const r = await sendVerifyEmail(env, email, verifyUrl);
    emailSent = !!r.sent;
  }

  return json({
    ok: true,
    user: pageToUser(page),
    needVerify: !!email,
    needAdmin: !email && !!phone,
    emailSent,
    verifyUrl: emailSent ? undefined : (email ? verifyUrl : undefined),
    message: email
      ? (emailSent ? "Te enviamos un correo para confirmar." : "Registro creado. Confirma con el enlace (correo pendiente de configurar).")
      : "Registro recibido. La mesa vecinal activará tu acceso al confirmar el teléfono.",
  });
}

async function handleVerify(req, env) {
  const body = await req.json().catch(() => ({}));
  const url = new URL(req.url);
  const verifyToken = body.token || url.searchParams.get("token");
  if (!verifyToken) return bad("Falta token");

  const page = await findByVerify(env, verifyToken);
  if (!page) return bad("Token inválido o ya usado", 404);

  const sessionToken = token();
  const updated = await notionUpdate(env, page.id, {
    Estatus: { select: { name: "activo" } },
    SessionToken: { rich_text: [{ text: { content: sessionToken } }] },
    VerifyToken: { rich_text: [] },
  });

  return json({ ok: true, sessionToken, user: pageToUser(updated) });
}

async function handleLogin(req, env) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  if (!email && !phone) return bad("Correo o teléfono para reingresar");

  const page = email ? await findByEmail(env, email) : await findByPhone(env, phone);
  if (!page) return bad("No encontramos ese contacto. Regístrate primero.", 404);
  const u = pageToUser(page);
  if (u.status === "revocado") return bad("Acceso revocado", 403);
  if (u.status !== "activo") {
    return json({ ok: false, needVerify: true, error: "Tu registro aún no está activo. Revisa tu correo o espera aprobación." }, 403);
  }

  const sessionToken = token();
  await notionUpdate(env, page.id, {
    SessionToken: { rich_text: [{ text: { content: sessionToken } }] },
  });
  return json({ ok: true, sessionToken, user: u });
}

async function handleMe(req, env) {
  const auth = req.headers.get("Authorization") || "";
  const sessionToken = auth.replace(/^Bearer\s+/i, "").trim();
  if (!sessionToken) return bad("Sin sesión", 401);
  const page = await findBySession(env, sessionToken);
  if (!page) return bad("Sesión inválida", 401);
  const u = pageToUser(page);
  if (u.status === "revocado") return bad("Acceso revocado", 403);
  return json({ ok: true, user: u });
}

async function handleGacetaSend(req, env) {
  const auth = req.headers.get("Authorization") || "";
  const admin = auth.replace(/^Bearer\s+/i, "").trim();
  if (!env.ADMIN_SEND_KEY || admin !== env.ADMIN_SEND_KEY) return bad("No autorizado", 401);

  const body = await req.json();
  const issueUrl = body.url || `${siteBase(env)}#/gaceta`;
  const subject = body.subject || "Nueva Gaceta CUPA Inspira";

  const res = await fetch(`https://api.notion.com/v1/databases/${env.NOTION_VECINOS_DB}/query`, {
    method: "POST",
    headers: notionHeaders(env),
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Estatus", select: { equals: "activo" } },
          { property: "Correo", email: { is_not_empty: true } },
        ],
      },
      page_size: 100,
    }),
  });
  const data = await res.json();
  if (!res.ok) return bad(data.message || "Notion error", 500);
  const emails = (data.results || []).map((p) => propText(p, "Correo")).filter(Boolean);
  const result = await sendGacetaBatch(env, emails, issueUrl, subject);
  return json({ ok: result.ok, total: emails.length, sent: result.sent || 0, error: result.error });
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    if (!env.NOTION_TOKEN) {
      return bad("API no configurada (NOTION_TOKEN)", 503);
    }

    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    try {
      // Contenido público desde carpeta Notion "Pagina"
      if (req.method === "GET" && (path === "/api/content" || path.endsWith("/api/content"))) {
        return await handleContent(env, "all");
      }
      const contentMatch = path.match(/\/api\/content\/([a-z_]+)$/);
      if (req.method === "GET" && contentMatch) {
        return await handleContent(env, contentMatch[1]);
      }

      if (!env.NOTION_VECINOS_DB) {
        return bad("API padrón no configurada (NOTION_VECINOS_DB)", 503);
      }

      if (req.method === "POST" && (path === "/api/register" || path.endsWith("/api/register"))) {
        return await handleRegister(req, env);
      }
      if ((req.method === "POST" || req.method === "GET") && path.endsWith("/api/verify")) {
        return await handleVerify(req, env);
      }
      if (req.method === "POST" && path.endsWith("/api/login")) {
        return await handleLogin(req, env);
      }
      if (req.method === "GET" && path.endsWith("/api/me")) {
        return await handleMe(req, env);
      }
      if (req.method === "POST" && path.endsWith("/api/gaceta/send")) {
        return await handleGacetaSend(req, env);
      }
      if (path === "/" || path === "/api") {
        return json({
          ok: true,
          service: "cupa-api",
          endpoints: ["/api/content", "/api/content/:tipo", "/api/register", "/api/verify", "/api/login", "/api/me", "/api/gaceta/send"],
        });
      }
      return bad("Not found", 404);
    } catch (err) {
      return bad(err.message || "Error interno", 500);
    }
  },
};
