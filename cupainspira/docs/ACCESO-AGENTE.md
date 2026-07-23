# Acceso agente a Notion CUPA

El token **no** va a GitHub. Vive solo en:

`workers/cupa-api/.dev.vars` (gitignored)

Para que el agente cree/edite bases o páginas bajo **CUPA INSPIRA**, basta con ese archivo local (o regenerar el token y actualizarlo ahí + en Cloudflare secrets al desplegar).

Si regeneras el token en Notion → actualiza `.dev.vars` y `wrangler secret put NOTION_TOKEN`.
