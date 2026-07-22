# Contenido editable — CUPA Inspira

Edita estos JSON y haz push (`./deploy.sh`) para actualizar la página en línea **sin tocar** el código de la UI.

| Archivo | Qué controla |
|---------|----------------|
| `gaceta.json` | Portada, artículos y nota de suscripción de La Gaceta |
| `avisos.json` | Avisos generales de la comunidad |

Tras guardar, en la raíz del repo Visiones:

```bash
./deploy.sh "Actualiza gaceta núm. X"
```

La página en vivo: https://elgorila.org/cupainspira/#/gaceta
