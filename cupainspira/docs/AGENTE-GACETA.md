# ¿Agente que monitorea CUPA y hace la Gaceta?

## Opinión corta

**Sí tiene sentido**, pero no como “bot que inventa la gaceta solo”. Mejor como **redactor asistido + recordatorio + envío**, con un humano que aprueba el borrador.

Motivo: la gaceta es reputación vecinal. Un agente que publique sin revisión puede inventar acuerdos o malinterpretar Poposta. Un agente que **junta hechos, propone texto y dispara el mail cuando tú dices OK** sí escala.

## Qué monitorearía

| Fuente | Qué saca |
|--------|----------|
| `content/ahora.json`, `proyectos.json`, `convocatorias.json` | Estatus oficial (Poposta, CTAs) |
| Notion **Vecinos** | Conteo activos / pendientes (fuerza de comunidad) |
| Notion **Convocatorias** (si la usas) | Abiertas / cerradas |
| Inbox / notas cortas tuyas (WhatsApp → Notion o un form) | Anuncios humanos |

No hace falta scrapear el HTML de elgorila.org: el **repo JSON + Notion** ya es la verdad.

## Arquitectura mínima (encaja con Platea)

```
Cron (quincenal) → Agente CUPA
  1. Lee content/*.json + Notion
  2. Arma borrador Markdown / JSON de gaceta
  3. Te manda preview (correo o fila Notion "Borradores")
  4. Tú apruebas → escribe content/gaceta.json → deploy
  5. POST /api/gaceta/send (activos con correo)
```

Stack probable (mismo usuario CF / Notion):

- **Cloudflare Worker + Cron Trigger** (o un script en Platea como los otros agentes)
- Notion página **Borrador Gaceta** + estatus `borrador` / `aprobado` / `publicado`
- Resend ya previsto en el Worker CUPA

## Roles del agente (no uno solo “dios”)

1. **Monitor** — alerta si Poposta lleva X días sin update, o si hay >N pendientes en Notion.
2. **Redactor** — propone secciones fijas: Ahora / Convocatorias / Directorio / Avisos.
3. **Editor humano** — tú (o mesa) cambia `aprobado`.
4. **Publicador** — commit/deploy del JSON + envío mail.

Empezar solo con 1+2+aviso a ti; el envío automático viene después.

## Qué no haría al inicio

- Autopublicar sin “aprobado”
- Scraping de Instagram como fuente única
- WhatsApp blast masivo (caro / frágil); el grupo oficial basta

## Siguiente paso si lo activamos

1. Cerrar pendientes de [PENDIENTES.md](./PENDIENTES.md) (padrón).
2. Plantilla Notion “Borrador Gaceta”.
3. Cron quincenal que escribe el borrador y te avisa.
4. Cuando el padrón tenga correos: conectar `gaceta/send`.
