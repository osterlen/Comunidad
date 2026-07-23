# CUPA Inspira — pendientes operativos

Última actualización: 2026-07-22

## Bloqueante para padrón real (fase 1)

Código listo en Dropbox; falta cablear cuentas:

1. [ ] Notion: crear base **Vecinos** (campos en [NOTION.md](./NOTION.md))
2. [ ] Conectar integración Notion a esa base (misma cuenta El Gorila / Visiones)
3. [ ] Cloudflare Worker `workers/cupa-api`:
   - [ ] `wrangler secret put NOTION_TOKEN`
   - [ ] `wrangler secret put NOTION_VECINOS_DB`
   - [ ] `wrangler secret put SESSION_SECRET`
   - [ ] `npx wrangler deploy`
4. [ ] Dominio `cupa-api.elgorila.org` (o fijar `window.CUPA_API_BASE` a `*.workers.dev`)
5. [ ] `./deploy.sh` del sitio si el contenido nuevo aún no está en elgorila.org
6. [ ] Probar: registro → verify/login → Proyectos solo con `activo`

## Fase 2 (correo gaceta)

Ver [GACETA-MAIL.md](./GACETA-MAIL.md). Secrets: `RESEND_API_KEY`, `FROM_EMAIL`, `ADMIN_SEND_KEY`.

## Idea en estudio: agente de gaceta

Ver [AGENTE-GACETA.md](./AGENTE-GACETA.md). No implementado aún.
