/* CUPA Inspira — contenido de todas las secciones */

const ECOLOGIA = [
  { id: "jaula", name: "Jaula de reciclaje", lead: "Comité de la Sección 3", status: "activo",
    desc: "Punto fijo donde acopiamos PET, cartón y vidrio. Pasa el camión cada jueves." },
  { id: "corazon", name: "Jardín del Corazón", lead: "Doña Esther · Edif. 12", status: "activo",
    desc: "El jardín de la entrada principal. Plantamos, regamos y cuidamos entre todas." },
  { id: "esperanza", name: "Jardín de la Esperanza", lead: "Familia Ortega", status: "apoyo",
    desc: "Área verde junto a la cancha. Nos faltan manos para la poda de temporada." },
  { id: "inspiracion", name: "Jardín de la Inspiración", lead: "Colectivo Raíces", status: "activo",
    desc: "Jardín de polinizadores con plantas nativas. Mariposas garantizadas." },
  { id: "huerto", name: "Huerto comunitario", lead: "Sr. Manuel · Edif. 5", status: "apoyo",
    desc: "Jitomate, hierbas y acelgas para quien participa. Buscamos quien adopte una cama." },
  { id: "composta", name: "Composta", lead: "Equipo Poposta", status: "activo",
    desc: "Convertimos lo orgánico en tierra viva para los jardines del conjunto." },
  { id: "limpieza", name: "Limpieza semestral", lead: "Mesa vecinal", status: "apoyo",
    desc: "Dos veces al año juntamos lo que estorba en pasillos y azoteas. La próxima en julio." },
];

const EMPRENDIMIENTO = [
  { id: "cochinita", vecino: "Doña Lupita", product: "Cochinita pibil los domingos", edif: "Edif. 9 · 102", emoji: "🫔" },
  { id: "aguas", vecino: "Carlos M.", product: "Aguas frescas de temporada", edif: "Edif. 3 · 204", emoji: "🥤" },
  { id: "helados", vecino: "Sofía y Diego", product: "Helados y paletas artesanales", edif: "Edif. 14 · 301", emoji: "🍦" },
  { id: "pan", vecino: "Familia Bautista", product: "Pan y conchas recién horneadas", edif: "Edif. 7 · 105", emoji: "🥖" },
  { id: "tamales", vecino: "Doña Remedios", product: "Tamales oaxaqueños (por encargo)", edif: "Edif. 1 · 008", emoji: "🌽" },
  { id: "costura", vecino: "Tere Jiménez", product: "Costura y arreglos de ropa", edif: "Edif. 11 · 207", emoji: "🧵" },
];

const COMERCIO = [
  { id: "tiendita", name: "Tiendita de la 4", type: "Abarrotes", loc: "Planta baja · Sección 4" },
  { id: "rest", name: "Cocina económica Male", type: "Comida corrida", loc: "Local 6 · Pasaje central" },
  { id: "rellena", name: "Rellenadora EcoLimpio", type: "Detergentes a granel", loc: "Local 2 · Sección 1" },
  { id: "mercado", name: "Mercado interior", type: "Frutas, verduras y carnes", loc: "Explanada poniente" },
  { id: "issste", name: "Clínica ISSSTE", type: "Servicios de salud", loc: "Acceso Av. Coyoacán" },
  { id: "papel", name: "Papelería El Lápiz", type: "Papelería y copias", loc: "Local 9 · Sección 2" },
];

const PROYECTOS = [
  { id: "poposta", title: "Hagamos Poposta", status: "En aprobación",
    desc: "Instalar una estación de composta comunitaria que procese los residuos orgánicos de todo el conjunto y nutra nuestros jardines.",
    favor: 142, contra: 18 },
  { id: "telurico", title: "Lectores de movimientos telúricos", status: "En aprobación",
    desc: "Red de sensores vecinales para alerta sísmica temprana, aprovechando la estructura del conjunto y conectada a un grupo de aviso.",
    favor: 98, contra: 9 },
];

const INICIATIVAS = [
  { id: "pluvial", title: "Captación de agua pluvial para riego", up: 64, down: 3,
    desc: "Aprovechar las azoteas para captar lluvia y regar los jardines sin gastar agua potable.",
    comments: [
      { who: "Ana, Edif. 8", txt: "En mi azotea cabe perfecto un tinaco. Cuenten conmigo." },
      { who: "Beto, Edif. 2", txt: "¿Quién sabe de plomería para calcular las bajadas?" },
    ] },
  { id: "prestamos", title: "Préstamos vecinales", up: 41, down: 6,
    desc: "Una red para prestarnos herramientas, escaleras y cosas que usamos poco. Menos gasto, más confianza.",
    comments: [{ who: "Male, Edif. 5", txt: "Yo tengo taladro y pulidora para prestar." }] },
  { id: "seguridad", title: "Seguridad", up: 87, down: 12,
    desc: "Organizarnos por edificio para cuidarnos entre vecinos y mejorar la iluminación de los pasillos.",
    comments: [{ who: "Don Rafa", txt: "Las lámparas de la Sección 3 llevan meses fundidas." }] },
  { id: "mural", title: "Recuperación del mural", up: 73, down: 2,
    desc: "Restaurar el mural histórico de la entrada, parte de la memoria del CUPA desde su fundación.",
    comments: [{ who: "Colectivo Raíces", txt: "Tenemos contacto con una restauradora que vive aquí." }] },
];

const GACETA_DEFAULT = {
  issue: "Núm. 18",
  date: "1 — 15 de junio, 2026",
  headline: "Vuelve la jornada de jardines y arranca la composta",
  lede: "Reciclaje, jardines y la vida cotidiana del conjunto, contada por quienes la hacemos.",
  subscribe_note: "La suscripción tiene una cuota mínima de recuperación de $20 al mes que cubre la impresión. Quien no pueda aportar, igual la recibe: nadie se queda sin Gaceta.",
  articles: [
    { tag: "Ecología", title: "La composta ya tiene lugar", excerpt: "Tras 184 firmas, la estación comunitaria se instalará junto al Jardín del Corazón." },
    { tag: "Vecinos", title: "Doña Lupita y su cochinita dominical", excerpt: "Una tradición del Edif. 9 que ya es punto de encuentro de varias secciones." },
    { tag: "Agua", title: "Cisternas: calendario de mantenimiento", excerpt: "Las fechas por sección para la limpieza del segundo semestre." },
  ],
};

/** Mezcla content/gaceta.json (si cargó) con defaults. */
function resolveGaceta() {
  const file = window.CUPA_GACETA_FILE;
  if (!file || typeof file !== "object") return GACETA_DEFAULT;
  return Object.assign({}, GACETA_DEFAULT, file, {
    articles: Array.isArray(file.articles) && file.articles.length ? file.articles : GACETA_DEFAULT.articles,
  });
}

const GACETA = resolveGaceta();
const AVISOS = (window.CUPA_AVISOS_FILE && window.CUPA_AVISOS_FILE.items) || [];

const BUILDINGS = Array.from({ length: 15 }, (_, i) => `Edificio ${i + 1}`);

Object.assign(window, { ECOLOGIA, EMPRENDIMIENTO, COMERCIO, PROYECTOS, INICIATIVAS, GACETA, AVISOS, BUILDINGS, GACETA_DEFAULT, resolveGaceta });
