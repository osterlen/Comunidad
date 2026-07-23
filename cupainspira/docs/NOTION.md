# Notion — panel admin CUPA Inspira

Notion es el **back-office** (tú lo usas). Los vecinos no entran a Notion: se inscriben en la web.

Criterio de datos mínimos y privacidad: [PRIVACIDAD-PADRON.md](./PRIVACIDAD-PADRON.md).

## 1. Crear integración

1. https://www.notion.so/my-integrations → **New integration** → nombre `CUPA Inspira API`
2. Copia el **Internal Integration Secret** → lo pondrás en el Worker como `NOTION_TOKEN`
3. En cada base de datos, menú `···` → **Connections** → conecta `CUPA Inspira API`

## 2. Base **Vecinos**

Crea una database (tabla) con estas propiedades (nombres exactos):

| Propiedad | Tipo | Notas |
|-----------|------|--------|
| `Nombre` | Title | Obligatorio |
| `Edificio` | Select | Letras A–V sin I ni Ñ: `A` `B` `C` `D` `E` `F` `G` `H` `J` `K` `L` `M` `N` `O` `P` `Q` `R` `S` `T` `U` `V` |
| `Departamento` | Rich text | Ej. 102 |
| `Correo` | Email | Opcional si hay teléfono |
| `Telefono` | Phone | Opcional si hay correo |
| `Estatus` | Select | `pendiente` · `activo` · `revocado` |
| `Ofrece` | Checkbox | Opt-in directorio |
| `Oficio` | Rich text | Qué ofrece (si Ofrece) |
| `VerifyToken` | Rich text | Lo llena el Worker (no editar a mano) |
| `SessionToken` | Rich text | Lo llena el Worker |
| `Creado` | Created time | Automático |

**Flujo aprobar / revocar**

- Registro web con correo → Worker crea fila `pendiente` + manda link → al confirmar pasa a `activo`
- Solo teléfono → queda `pendiente` → tú pones `activo` en Notion cuando confirmes que es vecino
- Algo raro → `revocado` → la web deja de dar acceso

Copia el **Database ID** (URL `notion.so/xxxxxxxx...?v=` → los 32 hex sin guiones) → secret `NOTION_VECINOS_DB`

## 3. Base **Convocatorias** (opcional / espejo)

Para llevar conteos en Notion (la web pública lee `content/convocatorias.json`):

| Propiedad | Tipo |
|-----------|------|
| `Titulo` | Title |
| `Tag` | Select |
| `Estatus` | Select: `abierta` / `cerrada` |
| `Desc` | Rich text |
| `CTA` | URL |

Secret opcional: `NOTION_CONVOCATORIAS_DB`

## 4. Secrets del Worker

```bash
cd workers/cupa-api
npx wrangler secret put NOTION_TOKEN
npx wrangler secret put NOTION_VECINOS_DB
npx wrangler secret put SESSION_SECRET   # frase larga aleatoria
npx wrangler secret put RESEND_API_KEY   # fase 2 gaceta mail (opcional)
npx wrangler secret put FROM_EMAIL       # ej. gaceta@tudominio.com
npx wrangler secret put ADMIN_SEND_KEY   # clave para POST /api/gaceta/send
```

Gaceta por correo: ver [GACETA-MAIL.md](./GACETA-MAIL.md).

## 5. Checklist diario

1. Abre Vecinos filtrado por `Estatus = pendiente`
2. Aprueba teléfonos conocidos → `activo`
3. Revoca spam → `revocado`
4. Contenido público (Poposta, gaceta): edita JSON en Dropbox → `./deploy.sh`
