# CUPA Inspira — pendientes operativos

Última actualización: 2026-07-22

## Bloqueante para padrón real (fase 1)

Código listo en Dropbox; falta cablear cuentas:

1. [x] Notion bajo **CUPA INSPIRA** (2026-07-23):
   - **Vecinos** `3a6d41762a978171a406e29b3af58b16` (+ campos `Tipo`: vecino/comercio/ambos, `Local`)
   - **Locales** `3a6d41762a9781b49148fa1a7d065192` (ocupado/vacío/en trámite)
   - **Propuestas** `3a6d41762a9781428bf4c6fb3bdc9369`
2. [x] Integración **CUPA INSPIRA WEB** conectada a la página
3. [ ] Cloudflare Worker `workers/cupa-api`:
   - [ ] `wrangler secret put NOTION_TOKEN`
   - [ ] `wrangler secret put NOTION_VECINOS_DB` → `3a6d41762a978171a406e29b3af58b16`
   - [ ] `wrangler secret put SESSION_SECRET`
   - [ ] `npx wrangler deploy`
4. [ ] Dominio `cupa-api.elgorila.org` (o fijar `window.CUPA_API_BASE` a `*.workers.dev`)
5. [ ] `./deploy.sh` del sitio si el contenido nuevo aún no está en elgorila.org
6. [ ] Probar: registro → verify/login → Proyectos solo con `activo`
7. [ ] Regenerar token Notion (quedó expuesto en chat) y actualizar secret CF
8. [ ] Web: pregunta Tipo (vecino/comercio/ambos) en el modal de registro

## Fase 2 (correo gaceta)

Ver [GACETA-MAIL.md](./GACETA-MAIL.md). Secrets: `RESEND_API_KEY`, `FROM_EMAIL`, `ADMIN_SEND_KEY`.

## Idea en estudio: agente de gaceta

Ver [AGENTE-GACETA.md](./AGENTE-GACETA.md). No implementado aún.
