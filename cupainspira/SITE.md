# SITE.md — CUPA Inspira

## Identidad

- **Nombre:** CUPA Inspira
- **Giro:** Canal / punto de encuentro vecinal (CUPA, Del Valle, CDMX)
- **Promesa:** Enterarte, avisar y encontrar quién puede ayudarte
- **Tone of voice:** Vecino a vecino; claro; para gente mayor
- **No decir:** Jerga de ONG/app (“ecosistema”, “omnicanal”); no inventar datos de firmas

## Fase

- **Fase actual:** en línea (elgorila.org/cupainspira) · peinado UX + design system · modelo comercial interno definido
- **Hosting:** Visiones / elgorila.org · repo live `osterlen/Comunidad`
- **API:** `cupa-api.dupeyronosterlen.workers.dev`

## Producto web

- **Entry:** `index.html` (SPA React CDN)
- **Design system:** `DESIGN.md` + `design-system.html`
- **Contenido:** `content/*.json` · memoria en `content/memoria.json`
- **Mapa mental:** Avisos · Oficios (con Ofertas) · Propuestas · **El CUPA** (footer/CTA, no nav principal)
- **Alcance v1:** solo CUPA (exclusividad). Del Valle aledaño = fase 2.
- **Fotos:** brief en memoria.json; hero = image-slot hasta P0

## Modelo económico (interno)

**Promesa:** *Primero que el vecino lo use. Luego membresías bajas: vecinos (micro) + locales (volumen).*  
Negocio redondo = **volumen × costo fijo bajo** + flujos automatizados (Stripe + Notion + web). Meta larga: cubrir ops y **1–2 empleos** de comunidad (no “hacerse ricos”).

### Prioridad #1 — prueba con vecinos (ahora)

La página peinada ya está live para mandar a probar:

**https://elgorila.org/cupainspira/**

| Ahora | Después (si sí sirve) |
|-------|------------------------|
| Registro **gratis** | Microcuota vecinal |
| Ver avisos / oficios / propuestas | Desbloquear descuentos + contactos “socio vecino” |
| Feedback: ¿entraron? ¿entendieron? ¿volverían? | Stripe membership |

No cobrar a vecinos hasta que haya **al menos** avisos vivos + oficios con WhatsApp real + 1–2 descuentos de prueba.

### Microcuota vecinal (fase 2 — idea)

Tipo “cooperativa chica”: **~$5 o $10 / mes**.

| Precio | Equivalente | Si 200 vecinos | Si 400 | Si 600 |
|--------|-------------|----------------|--------|--------|
| $5/mes | ~$60/año | ~$1,000 | ~$2,000 | ~$3,000 |
| $10/mes | ~$120/año | ~$2,000 | ~$4,000 | ~$6,000 |

**Recomendación de cobro:** preferir **anual** ($60 o $120) o mensual $10 — no $5 sueltos por Stripe (la comisión fija se come el ticket).  
**Qué desbloquea:** ofertas/descuentos + contactar oficios. Avisos públicos pueden seguir gratis (gancho).

Junto con membresía de locales ($99–199 × 50–80) sí alcanza para ops + camino a 1–2 medias jornadas (moderación, gaceta, rutas a locales), si los flujos están automatizados.

### Prioridad producto usable

| Regla | Qué significa |
|-------|----------------|
| Celular primero | Tipografía grande, botones gordos, 3 puertas |
| No saturar | Una idea por pantalla |
| Valor semanal | 1 aviso útil + oficios reales + 1 descuento vivo |
| Exclusividad v1 | Solo CUPA |

### Escalera locales (early bird → fijo)

| Oleada | Quién | Precio guía |
|--------|-------|-------------|
| Fundadores | Primeros ~10 | Más bajo (ej. $99) |
| Tempranos | ~11–30 | Intermedio (ej. $129–149) |
| Estándar | Al estabilizar (~12 meses) | Fijo (ej. $149–199) |

Plan: **Membresía Socio CUPA** (ficha · contacto · 1 oferta/mes · mención gaceta).

### Cómo entra el dinero (automatizable)

1. Vecino o local → Stripe subscription (mensual o anual).
2. Webhook → Notion → estatus `activo` / `socio`.
3. Web muestra ficha / desbloquea descuentos.
4. Impago → pausa automática.

### Cartera de campo (después de prueba vecinal)

Inventario 50–100 locales → orden por probabilidad → rutas físicas + link Stripe.

### Qué NO hacer

- Cobrar vecinos antes de validar uso.
- Ticket $5 mensual en Stripe (mejor anual o $10).
- Saturar la home.
- Publicar precios internos en la web.

## Historial

- 2026-07-30 — Contenido unificado: carpeta Notion Pagina → Worker `/api/content` (fallback JSON)
- 2026-07-30 — El CUPA: memoria + cine + guía práctica (`#/el-cupa`); avisos cultura/deporte; CTA home/footer
- 2026-07-30 — Microcuota vecinal $5–10 (fase 2, preferir anual); prueba gratis ahora; meta 1–2 empleos con flujos auto
- 2026-07-30 — Plan: early-bird locales; cartera de campo; prioridad móvil
- 2026-07-30 — Membership Stripe low-ticket locales 50–100
- 2026-07-30 — Peine live + design system
