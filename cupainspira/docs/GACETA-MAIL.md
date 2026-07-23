# Envío de Gaceta por correo (fase 2)

Una vez que el padrón en Notion tenga vecinos `activo` con correo:

## Requisitos

1. Secrets del Worker (además de Notion):
   - `RESEND_API_KEY`
   - `FROM_EMAIL` (dominio verificado en Resend)
   - `ADMIN_SEND_KEY` (clave larga que solo tú conoces)

2. Deploy del Worker `workers/cupa-api`.

## Disparar un envío

```bash
curl -X POST "https://cupa-api.elgorila.org/api/gaceta/send" \
  -H "Authorization: Bearer TU_ADMIN_SEND_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://elgorila.org/cupainspira/#/gaceta","subject":"Gaceta CUPA — nueva edición"}'
```

El Worker consulta Notion (`Estatus = activo` + correo no vacío) y manda el link con Resend.

## Notas

- Cuota free de Resend alcanza para quincenal × cientos de vecinos.
- La web ya anota el interés en “Suscribirme”; el padrón es la fuente de verdad.
- WhatsApp: usa el grupo oficial + botón “Unirme”; no hay blast masivo por API.
