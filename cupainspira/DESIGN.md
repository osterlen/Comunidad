# Design system — CUPA Inspira

**Nombre de línea:** Punto de encuentro  
**Página visual:** [`design-system.html`](./design-system.html) (abrir en navegador)  
**Implementación viva:** tokens en `index.html` `:root` + `src/sections.jsx` (`C`)  
**Producto:** [elgorila.org/cupainspira](https://elgorila.org/cupainspira/) · **Ops:** `../../_ops/09-DESIGN-SYSTEM.md`

Cualquier cambio de UI **parte de aquí**. Si no está en este sistema, se discute antes de inventar.

---

## 1. Dirección

| Eje | Significa |
|-----|-----------|
| Encuentro | Conectar vecinos, locales y oficios dentro del CUPA |
| Claridad | Pensado para gente mayor: una idea por pantalla, tipografía grande, botones gordos |
| Acción | Enterarse · Avisar · Encontrar ayuda · Seguir una iniciativa |
| Confianza | Lenguaje de vecino, no de ONG ni de app |

**Promesa (una frase):**  
*Aquí te enteras de lo que pasa, avisas a tus vecinos y encuentras quién puede ayudarte.*

**Protagonista:** el conjunto y su gente (fachada, pasajes, jardines, rostros reales). No el discurso institucional de “75 años” como héroe del primer viewport.

### Tres puertas (mapa mental fijo)

| Puerta | Pregunta del vecino | Contiene |
|--------|---------------------|----------|
| **Avisos** | ¿Qué está pasando? | Poposta, juntas, agua, seguridad, gaceta |
| **Vecinos y oficios** | ¿Quién hace qué? | Chambas, comida, costura, locales, servicios |
| **Propuestas** | ¿Qué queremos hacer? | Ideas, seguimiento, sumarse |

Nav de producto = **esas 3** + Entrar. Nada de 6 links de vanidad.

**Capa secundaria — El CUPA:** historia, cine, curiosidades y guía práctica (cultura, deporte, renta, croquis, organigrama). Vive en `#/el-cupa`, CTA suave en home + footer — **no** cuarta puerta de nav.

Contenido editable: `content/memoria.json`.

---

## 2. Colorimetría

Paleta viva del sitio (rojo CUPA + verde jardín + crema papel).

| Token | Hex | Uso |
|-------|-----|-----|
| `--cream` | `#fbf3dc` | Fondo página / texto sobre rojo-verde |
| `--cream-soft` | `#f4e8cd` | Superficies suaves / slots |
| `--red` | `#7a1410` | Marca, títulos, CTA primario |
| `--red-deep` | `#5e0f0c` | Hover CTA / gradiente hero |
| `--green` | `#0d3e23` | Acción secundaria, confianza, footer |
| `--green-deep` | `#082a17` | Hover verde |
| `--brown` | `#5b4a36` | Texto cuerpo |
| `--brown-soft` | `#8a775f` | Meta / captions |
| `--line` | `rgba(91,74,54,0.18)` | Divisores |
| `--line-strong` | `rgba(91,74,54,0.32)` | Bordes de input / focus suave |

### Prohibido
- Morado / glow tech / neón
- Cream + terracotta cliché AI (otra familia)
- Oscurecer toda la UI a “dark mode”
- Más de **2** colores de acento en un mismo viewport (rojo + verde ya son el par)

---

## 3. Tipografía

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| Display | **Newsreader** | 400–600 + italic | Marca, H1/H2 |
| Body / UI | **Hanken Grotesk** | 400–700 | Párrafos, nav, botones, formularios |

### Escala mínima (accesible / mayores)

| Rol | Tamaño guía | Notas |
|-----|-------------|-------|
| H1 home | `clamp(40px, 5vw, 64px)` | Una línea de promesa, no párrafo |
| H2 sección | `clamp(28px, 3vw, 40px)` | |
| Cuerpo | **≥ 18px** | Nunca < 16px en contenido |
| Botón grande | **≥ 17px**, padding ≥ `16px 28px` | Área táctil ~44px alto |
| Eyebrow | 12–13px uppercase tracking | Solo como etiqueta, no como info crítica |
| Nav | ≥ 16px | |

- Evitar Inter / Roboto / Arial como voz de marca
- Contraste: texto `--brown` sobre `--cream`; texto `--cream` sobre `--red` / `--green`

---

## 4. Componentes fijos

### Puertas (home)
Tres botones/bloques grandes en el primer scroll útil — no grid de cards de “explorar”.

### CTAs (jobs)

| CTA | Job | Variante |
|-----|-----|----------|
| Ver avisos / Lo de hoy | Enterarse | `creamSolid` sobre hero · `primary` en claro |
| Buscar oficio / Contactar | Conectar | `green` |
| Registrarme | Publicar / contactar con cuenta | `primary` o outline |
| Unirme al grupo | Seguimiento WhatsApp | `green` |

Botones: **pill** (`border-radius: 999`) ya establecido en el producto — mantener consistencia.  
Máx. **2** CTAs por viewport. Labels en español claro (“Avisos”, no “Feed”).

### Nav
Marca izq. · **Avisos · Oficios · Propuestas** · Entrar / Registrarme der.  
Sin “Fotos” en nav principal (Instagram vive en footer).

### Aviso (lista)
Fila tipográfica: fecha corta + título + 1 línea + CTA. Sin cards anidadas innecesarias.

### Oficio / local (directorio)
Nombre del servicio · quién · edificio/local · botón Contactar. Unificar emprendimiento + comercio en **una** lista filtrable.

### Propuesta
Título · estado en una palabra · 2 líneas · CTA “Seguir” / “Sumarme”.

### Formularios
Labels visibles (≥ 14px bold). Inputs padding ≥ 12px. Error en texto, no solo color.

---

## 5. Arte / fotografía

| Usar | No usar |
|------|---------|
| Fachada, jardines, pasajes, vecinos reales (con permiso) | Stock genérico “community” |
| Slot vacío tipográfico si no hay foto buena | Collage / flyer escaneado |
| 1 ancla visual por hero | Galería ruidosa en primer viewport |

Alts descriptivos (“Jardín del Corazón, Sección 3”).

---

## 6. Motion

1. Entrada suave del hero (`floatUp` ~0.6–0.7s)  
2. Hover de botón (−1px)  
3. Opcional: reveal corto al scroll en listas  

Nada de confeti, contadores animados, parallax agresivo ni glow.

---

## 7. Copy / tono

| Sí | No |
|----|----|
| “¿Necesitas un plomero?” | “Ecosistema de emprendimiento” |
| “Avisos del CUPA” | “Canal omnicanal vecinal” |
| “Súmate a la composta” | Jerga de gestión (“stakeholders”) |
| Frases cortas | Párrafos de manifiesto en el hero |

---

## 8. Cómo cambiar algo

1. Actualizar este `DESIGN.md` + `design-system.html`
2. Reflejar tokens en `index.html` `:root` y en `C` (`src/sections.jsx`)
3. Anotar en `SITE.md` (cuando exista) / historial del repo Visiones
4. Contenido editable → `content/*.json` (no hardcodear en JSX si ya hay JSON)
