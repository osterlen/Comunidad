# Notion — carpeta **Pagina** (contenido unificado)

Todo lo editable de la web vive aquí (además del padrón **Vecinos**).  
La web pide `GET /api/content` al Worker; si Notion falla, usa `content/*.json` de respaldo.

## 1. Crear la base dentro de la carpeta Pagina

En Notion → carpeta **Pagina** (CUPA Inspira) → **New database** → nombre **Contenido**.

### Propiedades (nombres exactos)

| Propiedad | Tipo | Uso |
|-----------|------|-----|
| `Titulo` | Title | Título visible |
| `Tipo` | Select | ver lista abajo |
| `Publicado` | Checkbox | Solo sale en web si está marcado |
| `Orden` | Number | Menor = primero |
| `Tag` | Select o Text | Ecología, Cultura, Deporte… |
| `Cuerpo` | Text | Párrafo / descripción |
| `CTA` | Text | Texto del botón |
| `Link` | URL | Destino del botón (`#/avisos` o https://…) |
| `Tone` | Select | `green` · `red` · `cream` (tarjetas “Ahora”) |
| `Meta` | Text | Año (cine), edificio, fecha gaceta… |
| `Eyebrow` | Text | Opcional (“Ahora en el CUPA”) |
| `Vecino` | Text | Oficios |
| `Producto` | Text | Oficios (si distinto del título) |
| `Edificio` | Text | Oficios / locales |
| `Giro` | Text | Tipo de local |
| `Ubicacion` | Text | Locales |
| `Estatus` | Select | `abierta` / `cerrada` / `pronto` |

Conecta la integración **CUPA Inspira WEB** a esta base.

**Database ID (Contenido):** `3add41762a9781fca237c7cb8372f548`  
(dentro de *VECINOS - PAGINA WEB* bajo CUPA INSPIRA)

Copia el **Database ID** → secret del Worker:

```bash
cd workers/cupa-api
npx wrangler secret put NOTION_PAGINA_DB
npx wrangler deploy
```

## 2. Valores de `Tipo`

| Tipo | Dónde se ve |
|------|-------------|
| `aviso` | Avisos |
| `ahora` | Home “Lo de hoy” |
| `convocatoria` | Cómo sumarte |
| `oficio` | Oficios (vecinos) |
| `local` | Oficios (locales) |
| `oferta` | Descuentos (cuando se muestre) |
| `historia` | El CUPA — párrafos (Orden 1, 2, 3…) |
| `curiosidad` | El CUPA |
| `cine` | El CUPA (Meta = año) |
| `cine_intro` / `cine_fuente` | Textos auxiliares |
| `guia` | Guía práctica (cultura, renta…) |
| `guia_intro` | Intro de la guía |
| `memoria_lede` | Lead de El CUPA |
| `gaceta` | Artículos |
| `gaceta_meta` | Issue / fecha / headline |

## 3. Flujo diario

1. Abres **Pagina → Contenido** en el celular  
2. Nueva fila → `Tipo` + `Publicado` ✓  
3. En ≤ 1 min (caché Worker) se refleja en [elgorila.org/cupainspira](https://elgorila.org/cupainspira/)  
4. Sin `git push`

Los JSON en el repo quedan de **backup** / plantilla inicial.

## 4. Relación con otras bases

| Base | Rol |
|------|-----|
| **Vecinos** | Padrón / login (ya existe) |
| **Locales** | Inventario físico / renta (ops) — puede alimentar `Tipo=local` después |
| **Propuestas** | Ops internas — la web gated puede seguir en JSON o migrar luego |
| **Contenido** (Pagina) | Todo lo público editable |

## 5. Checklist para encender

- [ ] Base **Contenido** creada en carpeta Pagina  
- [ ] Propiedades según tabla  
- [ ] Integración conectada  
- [ ] `wrangler secret put NOTION_PAGINA_DB`  
- [ ] `wrangler deploy`  
- [ ] Probar `https://cupa-api….workers.dev/api/content` → `"source":"notion"`  
- [ ] Migrar 3 avisos + 1 ahora desde los JSON actuales
