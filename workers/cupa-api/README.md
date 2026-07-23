# CUPA API (Cloudflare Worker)

## Deploy

```bash
cd workers/cupa-api
npm i
npx wrangler login
npx wrangler secret put NOTION_TOKEN
npx wrangler secret put NOTION_VECINOS_DB
npx wrangler secret put SESSION_SECRET
# Fase 2 correo:
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put FROM_EMAIL
npx wrangler secret put ADMIN_SEND_KEY
npx wrangler deploy
```

DNS: crea CNAME `cupa-api` → workers.dev / o usa el custom domain del `wrangler.toml`.

Si el custom domain falla, usa la URL `*.workers.dev` y pon en la web:

```html
<script>window.CUPA_API_BASE = "https://cupa-api.<tu-subdominio>.workers.dev";</script>
```

## Endpoints

| Método | Ruta | Qué hace |
|--------|------|----------|
| POST | `/api/register` | Alta vecino → Notion `pendiente` |
| POST | `/api/verify` | `{ token }` → `activo` + session |
| POST | `/api/login` | Reingreso por correo |
| GET | `/api/me` | Header `Authorization: Bearer <session>` |
| POST | `/api/gaceta/send` | Admin: manda link gaceta a activos con correo |

Ver [../cupainspira/docs/NOTION.md](../../cupainspira/docs/NOTION.md) y [GACETA-MAIL.md](../../cupainspira/docs/GACETA-MAIL.md).

## Dominio custom

Tras el primer deploy a `*.workers.dev`, en Cloudflare Dashboard → Workers → cupa-api → **Custom Domains** → `cupa-api.elgorila.org`.

