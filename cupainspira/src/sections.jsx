/* CUPA Inspira — componentes de UI reutilizables */

const C = { red: "#7a1410", green: "#0d3e23", cream: "#fbf3dc", brown: "#5b4a36" };

/* ---------- iconos ---------- */
function IconArrow({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconInstagram({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill={color} />
    </svg>
  );
}
function IconLeaf({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4c0 9-5.5 14-13 14 0-9 5-14 13-14Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 18c1.5-4 4-7 9-9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconDrop({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 14a2.6 2.6 0 0 0 2.4 2.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconNews({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h12v14H6a2 2 0 0 1-2-2V5Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 8h2.5a1.5 1.5 0 0 1 1.5 1.5V17a2 2 0 0 1-2 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 9h6M7 12.5h6M7 16h4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconWhats({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.4A8 8 0 1 1 8 19.2l-4.5 1.3Z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.2 8.4c-.2-.5-.4-.5-.6-.5-.6 0-1 .3-1.2.9-.3.9.2 2 .9 3 .9 1.3 2.2 2.4 3.7 2.9.9.3 1.7.2 2.2-.3.3-.3.5-.8.4-1.2 0-.2-.2-.3-.4-.4l-1.3-.6c-.2-.1-.4 0-.5.1l-.4.5c-.1.1-.2.1-.4.1-.7-.3-1.3-.8-1.7-1.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.1-.3 0-.5l-.5-1.1Z" fill={color} />
    </svg>
  );
}
function IconLock({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" stroke={color} strokeWidth="1.7" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IconThumb({ size = 18, color = "currentColor", down }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: down ? "rotate(180deg)" : "none" }}>
      <path d="M7 10v9H4.5A1.5 1.5 0 0 1 3 17.5v-6A1.5 1.5 0 0 1 4.5 10H7Zm0 0l3.5-6.5c.3-.6 1-.9 1.6-.6.7.3 1 1 .9 1.7L12.5 9H18a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 17 19H7" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheck({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4 10-11" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPin({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}
function IconBuilding({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="1.4" stroke={color} strokeWidth="1.6" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- badge de estado ---------- */
function StatusBadge({ status }) {
  const active = status === "activo";
  const color = active ? C.green : "#b5701a";
  const label = active ? "Activo" : "Necesita apoyo";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, color }}>
      <span style={{ fontSize: 12 }}>{active ? "●" : "◐"}</span>{label}
    </span>
  );
}

/* ---------- botón ---------- */
function Btn({ children, variant = "primary", href, onClick, icon = true, size = "md" }) {
  const [hover, setHover] = React.useState(false);
  const pads = size === "lg" ? "16px 28px" : size === "sm" ? "9px 16px" : "13px 22px";
  const fz = size === "lg" ? 17 : size === "sm" ? 14 : 15.5;
  const base = {
    display: "inline-flex", alignItems: "center", gap: 9, padding: pads,
    fontFamily: "var(--sans)", fontWeight: 600, fontSize: fz, letterSpacing: "0.01em",
    borderRadius: 999, cursor: "pointer", border: "1.5px solid transparent",
    transition: "all .22s cubic-bezier(.2,.7,.3,1)", whiteSpace: "nowrap",
    transform: hover ? "translateY(-1px)" : "none",
  };
  const styles = {
    primary: { ...base, background: hover ? "#5e0f0c" : C.red, color: C.cream, boxShadow: hover ? "0 10px 22px rgba(122,20,16,.28)" : "0 2px 0 rgba(94,15,12,.5)" },
    green: { ...base, background: hover ? "#082a17" : C.green, color: C.cream, boxShadow: hover ? "0 10px 22px rgba(13,62,35,.26)" : "0 2px 0 rgba(8,42,23,.5)" },
    outline: { ...base, background: hover ? "rgba(91,74,54,.06)" : "transparent", color: C.brown, borderColor: "rgba(91,74,54,.4)" },
    ghostCream: { ...base, background: hover ? "rgba(251,243,220,.14)" : "transparent", color: C.cream, borderColor: "rgba(251,243,220,.45)" },
    creamSolid: { ...base, background: hover ? "#fffaf0" : C.cream, color: C.red, boxShadow: hover ? "0 10px 22px rgba(0,0,0,.18)" : "none" },
  };
  const El = href ? "a" : "button";
  return (
    <El href={href} onClick={onClick} style={styles[variant]}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      {...(href && href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
      {icon && <IconArrow size={size === "lg" ? 18 : 16} />}
    </El>
  );
}

/* ---------- eyebrow / etiqueta ---------- */
function Eyebrow({ children, color = C.red, align = "left" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
      <span style={{ width: 22, height: 1.5, background: color, display: "inline-block" }} />
      <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color }}>{children}</span>
    </div>
  );
}

function Tag({ children, color = C.green }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", borderRadius: 999, background: "rgba(13,62,35,.08)", color, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {children}
    </span>
  );
}

/* ---------- encabezado de sección de página ---------- */
function PageHead({ eyebrow, title, intro, color = C.red }) {
  return (
    <div style={{ maxWidth: 720, animation: "floatUp .6s ease both" }}>
      <Eyebrow color={color}>{eyebrow}</Eyebrow>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(34px, 4.4vw, 54px)", lineHeight: 1.04, letterSpacing: "-0.015em", color: C.red, margin: "18px 0 0" }}>{title}</h1>
      {intro && <p style={{ fontFamily: "var(--sans)", fontSize: 18.5, lineHeight: 1.6, color: C.brown, margin: "20px 0 0", textWrap: "pretty" }}>{intro}</p>}
    </div>
  );
}

Object.assign(window, { C, IconArrow, IconInstagram, IconLeaf, IconDrop, IconNews, IconWhats, IconLock, IconThumb, IconCheck, IconPin, IconBuilding, StatusBadge, PageHead, Btn, Eyebrow, Tag });
