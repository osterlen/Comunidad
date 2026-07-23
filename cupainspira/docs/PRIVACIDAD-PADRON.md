# Padrón Vecinos — mínimo necesario y privacidad

Principio: **solo lo que hace falta para ser vecino del CUPA y contactarte**. Nada de INE, CURP, fotos de identificación, ni domicilio completo fuera del conjunto.

## Qué pedimos (y por qué)

| Campo | ¿Obligatorio? | ¿Quién lo ve? | Para qué |
|-------|---------------|---------------|----------|
| **Nombre** | Sí | Solo admin (Notion / mesa) | Trato humano; no se publica en la web |
| **Edificio** (letra A–V) | Sí | Solo admin | Confirmar que vive en el CUPA |
| **Departamento** | Sí | Solo admin | Mismo filtro anti-bots / anti-ajenos |
| **Correo** *o* **Teléfono** | Al menos uno | Solo admin | Verificar, reingresar, avisos 1:1 / gaceta |
| **Estatus** | Automático / mesa | Solo admin | `pendiente` → `activo` → `revocado` |
| **Ofrece** (sí/no) | No (opt-in) | Admin; en directorio solo si activo *y* opt-in | Directorio vivo |
| **Oficio** (texto corto) | Solo si Ofrece = sí | Igual que arriba | “Plomería”, “clases…”, no CV |

### Campos técnicos (no los rellena el vecino)

| Campo | Uso |
|-------|-----|
| `VerifyToken` | Link mágico de correo (temporal) |
| `SessionToken` | Sesión web (no es contraseña legible) |
| `Creado` | Fecha de alta |

## Qué **no** pedimos (a propósito)

- INE / pasaporte / CURP / RFC  
- Fecha de nacimiento, género, estado civil  
- Dirección fuera del CUPA, código postal completo innecesario  
- Foto, redes sociales obligatorias  
- Contraseña (usamos correo/tel + verificación)  
- Geolocalización, lista de contactos del teléfono  

Edificio + depto bastan para el filtro vecinal; el contacto sirve para avisos. No armar un expediente policial.

## Cómo se resguarda (gratis, sin servidor propio)

1. **Notion = solo back-office.** Vecinos no entran. Compartir la base solo con 1–2 personas de confianza (Visiones / mesa).  
2. **Token de Notion solo en Cloudflare Secrets** del Worker — nunca en el HTML ni en GitHub.  
3. **La web pública no lista** nombres, deptos ni teléfonos. El directorio, si existe, muestra solo lo que el vecino marcó como “ofrezco” (y solo con estatus `activo`).  
4. **Revocar = apagar acceso:** `Estatus = revocado` (y si piden borrado total, borras la fila en Notion).  
5. **Gaceta por correo (fase 2):** solo a `activo` con correo; opt-in implícito al registrarse con correo o mensaje claro al suscribirse.

## Texto corto que puedes poner en el registro (transparencia)

> Pedimos nombre, edificio, departamento y un contacto (correo o WhatsApp) para confirmar que vives en el CUPA y avisarte. No compartimos tu depto ni teléfono en la página pública. Puedes pedir que te demos de baja escribiendo a la mesa.

## Cómo crear la base en Notion (nombres exactos)

Tipo **Table** / database:

1. `Nombre` — Title  
2. `Edificio` — Select → opciones: A B C D E F G H J K L M N O P Q R S T U V  
3. `Departamento` — Text  
4. `Correo` — Email  
5. `Telefono` — Phone  
6. `Estatus` — Select → `pendiente`, `activo`, `revocado`  
7. `Ofrece` — Checkbox  
8. `Oficio` — Text  
9. `VerifyToken` — Text (ocultar en la vista diaria)  
10. `SessionToken` — Text (ocultar en la vista diaria)  
11. `Creado` — Created time  

Vista recomendada para el día a día: columnas Nombre | Edificio | Depto | Correo | Teléfono | Estatus | Ofrece — **sin** tokens.

Detalle técnico y secrets: [NOTION.md](./NOTION.md).
