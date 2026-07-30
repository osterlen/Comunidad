/* CUPA Inspira — router, navegación, sesión y modales */
const { useState, useEffect, useRef } = React;

/* ---------- hooks de persistencia ---------- */
function useLocal(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch (e) { return init; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal];
}

/* ====================================================== */
/*  NAV                                                   */
/* ====================================================== */
function Nav({ route, go, user, onRegister, onLogin, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const onHome = route === "#/" || route === "" || route === "#";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1060);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => { setOpenMenu(false); }, [route]);

  // sobre el hero (home, sin scroll, menú cerrado) el nav es claro
  const overHero = onHome && !scrolled && !openMenu;
  const fg = overHero ? "#fbf3dc" : C.brown;
  const isActive = (h) => route.startsWith(h);

  const navItem = (label, href, opts = {}) => {
    const active = isActive(href);
    return (
      <button key={label} onClick={opts.onClick || (() => go(href))} disabled={opts.disabled}
        style={{ position: "relative", background: "none", border: "none", cursor: opts.disabled ? "default" : "pointer", padding: "10px 2px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: opts.disabled ? (overHero ? "rgba(251,243,220,.5)" : "var(--brown-soft)") : fg, opacity: 1, display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
        {label}
        {opts.badge && <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 9.5, color: "#b5701a", background: overHero ? "rgba(251,243,220,.92)" : "rgba(181,112,26,.14)", padding: "2px 6px", borderRadius: 999, letterSpacing: "0.05em" }}>PRONTO</span>}
        {opts.external && <IconArrow size={13} color={fg} />}
        {active && !opts.disabled && <span style={{ position: "absolute", left: 0, right: opts.external ? 18 : 0, bottom: -2, height: 2, background: overHero ? C.cream : C.red, borderRadius: 99 }} />}
      </button>
    );
  };

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, background: overHero ? "transparent" : "rgba(251,243,220,.94)", backdropFilter: overHero ? "none" : "saturate(150%) blur(12px)", borderBottom: overHero ? "1px solid transparent" : "1px solid var(--line)", transition: "background .3s ease, border-color .3s ease" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76, gap: 18 }}>
        <button onClick={() => go("#/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexShrink: 0 }}>
          <Logo variant="horizontal" size={20} mono={overHero ? "#fbf3dc" : undefined} />
        </button>

        {!narrow && (
        <nav style={{ display: "flex", alignItems: "center", gap: 28, overflowX: "auto", flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
          {navItem("Avisos", "#/avisos")}
          {navItem("Oficios", "#/oficios")}
          {navItem("Propuestas", "#/propuestas")}
        </nav>
        )}

        {/* sesión + menú — pinned, fuera del scroll */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 14, marginLeft: narrow ? "auto" : 0 }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: fg }}>
                <span style={{ width: 30, height: 30, borderRadius: 99, background: user.status === "activo" ? C.green : C.red, color: C.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{(user.name || "?")[0]}</span>
                <span style={{ whiteSpace: "nowrap" }}>{(user.name || "").split(" ")[0]}{user.status === "pendiente" ? " · pendiente" : ""}</span>
              </span>
              <button onClick={onLogout} title="Cerrar sesión" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: 13, color: overHero ? "rgba(251,243,220,.7)" : "var(--brown-soft)", textDecoration: "underline", whiteSpace: "nowrap" }}>Salir</button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button type="button" onClick={onLogin} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: fg, textDecoration: "underline", whiteSpace: "nowrap" }}>Entrar</button>
              <Btn variant={overHero ? "creamSolid" : "primary"} size="sm" icon={false} onClick={onRegister}>Registrarme</Btn>
            </div>
          )}
          {narrow && (
            <button onClick={() => setOpenMenu((o) => !o)} aria-label="Menú" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 4 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 22, height: 2, borderRadius: 2, background: fg, transition: "all .2s" }} />)}
            </button>
          )}
        </div>
      </div>

      {/* drawer móvil */}
      {narrow && openMenu && (
        <div style={{ background: C.cream, borderTop: "1px solid var(--line)", boxShadow: "0 20px 40px -24px rgba(91,74,54,.5)", animation: "floatUp .22s ease both" }}>
          <div className="wrap" style={{ padding: "16px 32px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {[["Avisos", "#/avisos"], ["Oficios", "#/oficios"], ["Propuestas", "#/propuestas"],
              ["La Gaceta", "#/gaceta"]].map(([t, h]) => (
              <button key={h} onClick={() => go(h)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 12px", borderRadius: 9, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 18, color: route.startsWith(h) || route === h ? C.red : C.brown }}>{t}</button>
            ))}
            <a href="https://instagram.com/cupainspira" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 12px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 17, color: C.brown }}><IconInstagram size={18} /> Instagram</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ====================================================== */
/*  FOOTER                                                */
/* ====================================================== */
function Footer({ go }) {
  return (
    <footer style={{ background: C.green, color: C.cream, paddingTop: 58 }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 36, paddingBottom: 44 }}>
        <div>
          <Logo variant="horizontal" size={21} mono="#fbf3dc" />
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: "rgba(251,243,220,.72)", marginTop: 18, maxWidth: 300, lineHeight: 1.55 }}>
            Punto de encuentro del Centro Urbano Presidente Alemán (CUPA), Del Valle, CDMX. Avisos, oficios y propuestas entre vecinos.
          </p>
        </div>
        {[["Encuentro", [["Avisos", "#/avisos"], ["Oficios", "#/oficios"], ["Propuestas", "#/propuestas"]]],
          ["Más", [["La Gaceta", "#/gaceta"], ["Jardines y ecología", "#/comunidad/ecologia"]]]].map(([title, links]) => (
          <div key={title}>
            <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,243,220,.5)" }}>{title}</div>
            <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(([t, h]) => (
                <li key={t}><button onClick={() => go(h)} className="footlink" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: 14.5, color: "rgba(251,243,220,.85)", padding: 0, textAlign: "left" }}>{t}</button></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,243,220,.5)" }}>Legal</div>
          <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <li><button onClick={() => go("#/privacidad")} className="footlink" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: 14.5, color: "rgba(251,243,220,.85)", padding: 0, textAlign: "left" }}>Privacidad</button></li>
            <li><button onClick={() => go("#/terminos")} className="footlink" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: 14.5, color: "rgba(251,243,220,.85)", padding: 0, textAlign: "left" }}>Términos</button></li>
            <li><a href="https://instagram.com/cupainspira" target="_blank" rel="noreferrer" className="footlink" style={{ fontFamily: "var(--sans)", fontSize: 14.5, color: "rgba(251,243,220,.85)", display: "inline-flex", alignItems: "center", gap: 8 }}><IconInstagram size={16} color="#fbf3dc" /> @cupainspira</a></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(251,243,220,.18)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "20px 32px" }}>
          <span style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "rgba(251,243,220,.6)" }}>Una iniciativa de <strong style={{ color: C.cream, fontWeight: 600 }}>Visiones AC</strong></span>
          <span style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "rgba(251,243,220,.6)" }}>© 2026 CUPA Inspira · Del Valle, CDMX</span>
        </div>
      </div>
    </footer>
  );
}

/* ====================================================== */
/*  MODALES                                               */
/* ====================================================== */
function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(45,30,18,.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto", animation: "floatUp .25s ease both" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, borderRadius: 22, width: "100%", maxWidth: 460, padding: "34px 34px 30px", boxShadow: "0 40px 90px -30px rgba(0,0,0,.6)", border: "1px solid var(--line)", margin: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, color: C.brown, display: "block", marginBottom: 6 }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: "100%", fontFamily: "var(--sans)", fontSize: 15.5, color: C.brown, padding: "12px 14px", borderRadius: 11, border: `1.5px solid ${focus ? C.green : "var(--line-strong)"}`, background: "#fffdf7", outline: "none", transition: "border-color .2s" }} />
    </label>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, color: C.brown, display: "block", marginBottom: 6 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", fontFamily: "var(--sans)", fontSize: 15.5, color: value ? C.brown : "var(--brown-soft)", padding: "12px 14px", borderRadius: 11, border: "1.5px solid var(--line-strong)", background: "#fffdf7", outline: "none", appearance: "none" }}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

/* registro vecinal — correo o teléfono + opt-in directorio */
function RegisterModal({ open, onClose, onDone, intro, mode, go }) {
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("vecino");
  const [building, setBuilding] = useState("");
  const [apt, setApt] = useState("");
  const [local, setLocal] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ofrece, setOfrece] = useState(false);
  const [oficio, setOficio] = useState("");
  const [accept, setAccept] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const isLogin = mode === "login";
  const needsHome = tipo === "vecino" || tipo === "ambos";
  const needsLocal = tipo === "comercio" || tipo === "ambos";

  useEffect(() => {
    if (open) {
      setName(""); setTipo("vecino"); setBuilding(""); setApt(""); setLocal("");
      setEmail(""); setPhone(""); setOfrece(false); setOficio(""); setAccept(false); setErr(""); setBusy(false);
    }
  }, [open, mode]);
  if (!open) return null;

  const validReg = name.trim()
    && (!needsHome || (building && apt.trim()))
    && (!needsLocal || local.trim())
    && (email.trim() || phone.trim().length >= 8)
    && accept;
  const validLogin = email.trim() || phone.trim().length >= 8;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (isLogin) {
      if (!validLogin) return;
      setBusy(true);
      const res = await window.CupaAPI.login({ email: email.trim() || undefined, phone: phone.trim() || undefined });
      setBusy(false);
      if (!res.ok) { setErr(res.error || "No se pudo entrar"); return; }
      window.CupaAPI.setSession(res.sessionToken);
      onDone(res.user, { loggedIn: true });
      return;
    }
    if (!validReg) return;
    setBusy(true);
    const res = await window.CupaAPI.register({
      name: name.trim(), tipo,
      building: needsHome ? building : undefined,
      apt: needsHome ? apt.trim() : undefined,
      local: needsLocal ? local.trim() : undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      ofrece, oficio: oficio.trim() || undefined,
    });
    setBusy(false);
    if (!res.ok) { setErr(res.error || "No se pudo registrar"); return; }
    if (res.sessionToken) window.CupaAPI.setSession(res.sessionToken);
    onDone(res.user || { name, building, apt, email, phone, tipo, status: "pendiente" }, res);
  };

  return (
    <Overlay onClose={onClose}>
      <Logo variant="mark" size={44} />
      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 27, color: C.red, margin: "16px 0 6px" }}>
        {isLogin ? "Reingresar" : "Registro CUPA"}
      </h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.brown, lineHeight: 1.5 }}>
        {intro || (isLogin
          ? "Entra con el correo o teléfono con el que te registraste (debe estar activo)."
          : "Vecino, comercio del conjunto, o ambos. Correo o teléfono (uno basta).")}
      </p>
      <form onSubmit={submit} style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        {!isLogin && (
          <>
            <Field label="Nombre completo" value={name} onChange={setName} placeholder="Ej. Mariana Reyes" />
            <SelectField label="Soy" value={tipo} onChange={setTipo}
              options={["vecino", "comercio", "ambos"]}
              placeholder="Selecciona" />
            {needsHome && (
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
                <SelectField label="Edificio" value={building} onChange={setBuilding} options={BUILDINGS} placeholder="Selecciona" />
                <Field label="Departamento" value={apt} onChange={setApt} placeholder="Ej. 304" />
              </div>
            )}
            {needsLocal && <Field label="Número de local" value={local} onChange={setLocal} placeholder="Ej. L-12" />}
          </>
        )}
        <Field label="Correo" value={email} onChange={setEmail} placeholder="tu@correo.com" type="email" />
        <Field label={isLogin ? "Teléfono (si no usas correo)" : "Teléfono (WhatsApp)"} value={phone} onChange={setPhone} placeholder="Ej. 55 1234 5678" type="tel" />
        {!isLogin && (
          <>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
              <input type="checkbox" checked={ofrece} onChange={(e) => setOfrece(e.target.checked)} style={{ marginTop: 4 }} />
              <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: C.brown, lineHeight: 1.45 }}>Ofrezco un producto o servicio a la comunidad (directorio)</span>
            </label>
            {ofrece && <Field label="¿Qué ofreces?" value={oficio} onChange={setOficio} placeholder="Ej. plomería, clases de inglés…" />}
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
              <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} style={{ marginTop: 4 }} />
              <span style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: C.brown, lineHeight: 1.45 }}>
                Acepto la{" "}
                <button type="button" onClick={() => { onClose(); go && go("#/privacidad"); }} style={{ background: "none", border: "none", padding: 0, color: C.green, fontWeight: 600, cursor: "pointer", textDecoration: "underline", font: "inherit" }}>privacidad</button>
                {" "}y los{" "}
                <button type="button" onClick={() => { onClose(); go && go("#/terminos"); }} style={{ background: "none", border: "none", padding: 0, color: C.green, fontWeight: 600, cursor: "pointer", textDecoration: "underline", font: "inherit" }}>términos</button>.
              </span>
            </label>
          </>
        )}
        {err && <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: C.red, margin: 0 }}>{err}</p>}
        <div style={{ display: "flex", gap: 12, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
          <Btn variant="green" icon={false}>{busy ? "…" : (isLogin ? "Entrar" : "Registrarme")}</Btn>
          <button type="button" onClick={onClose} style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, color: "var(--brown-soft)", background: "none", border: "none", cursor: "pointer", padding: "13px 8px" }}>Ahora no</button>
        </div>
      </form>
    </Overlay>
  );
}

/* pedir teléfono a quien ya está registrado pero quiere participar */
function PhoneModal({ open, onClose, onDone, actionLabel }) {
  const [phone, setPhone] = useState("");
  useEffect(() => { if (open) setPhone(""); }, [open]);
  if (!open) return null;
  const valid = phone.trim().length >= 8;
  const submit = (e) => { e.preventDefault(); if (!valid) return; onDone(phone); };
  return (
    <Overlay onClose={onClose}>
      <span style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(13,62,35,.08)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><IconWhats size={24} color={C.green} /></span>
      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, color: C.red, margin: "16px 0 6px" }}>Un paso más para participar</h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.brown, lineHeight: 1.5 }}>Para {actionLabel || "participar activamente"} necesitamos un teléfono de contacto. Lo usamos solo para coordinar por WhatsApp.</p>
      <form onSubmit={submit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Teléfono" value={phone} onChange={setPhone} placeholder="Ej. 55 1234 5678" type="tel" />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Btn variant="green" icon={false}>Confirmar</Btn>
          <button type="button" onClick={onClose} style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, color: "var(--brown-soft)", background: "none", border: "none", cursor: "pointer", padding: "13px 8px" }}>Cancelar</button>
        </div>
      </form>
    </Overlay>
  );
}

function MessageModal({ data, onClose }) {
  if (!data) return null;
  return (
    <Overlay onClose={onClose}>
      <div style={{ textAlign: "center", padding: "6px 0" }}>
        <div style={{ width: 64, height: 64, borderRadius: 99, background: "rgba(13,62,35,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <IconCheck size={30} color={C.green} />
        </div>
        <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, color: C.green, margin: "0 0 8px" }}>{data.title}</h3>
        <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, color: C.brown, lineHeight: 1.5, maxWidth: 340, margin: "0 auto 22px" }}>{data.body}</p>
        <Btn variant="green" icon={false} onClick={onClose}>Listo</Btn>
      </div>
    </Overlay>
  );
}

function parseHashRoute(hash) {
  const raw = (hash || "#/").replace(/^#/, "") || "/";
  const q = raw.indexOf("?");
  const path = q >= 0 ? raw.slice(0, q) : raw;
  const params = {};
  if (q >= 0) new URLSearchParams(raw.slice(q + 1)).forEach((v, k) => { params[k] = v; });
  return { path: path.startsWith("/") ? path : "/" + path, params, hash: hash || "#/" };
}

function isActiveUser(u) {
  return !!(u && (u.status === "activo" || u.status === "Activo"));
}

/* ====================================================== */
/*  APP                                                   */
/* ====================================================== */
function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [user, setUser] = useLocal("cupa_user", null);
  const [projVotes, setProjVotes] = useLocal("cupa_projvotes", {});
  const [initVotes, setInitVotes] = useLocal("cupa_initvotes", {});
  const [comments, setComments] = useLocal("cupa_comments", {});
  const [verifying, setVerifying] = useState(false);

  const [reg, setReg] = useState(null); // { mode, intro }
  const [phoneAsk, setPhoneAsk] = useState(null);
  const [msg, setMsg] = useState(null);
  const pending = useRef(null);

  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash || "#/"); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // refrescar estatus desde Notion si hay sesión
  useEffect(() => {
    const session = window.CupaAPI && window.CupaAPI.getSession();
    if (!session) return;
    window.CupaAPI.me().then((res) => {
      if (res.ok && res.user) setUser(res.user);
      else if (res.error) {
        window.CupaAPI.setSession(null);
        if (user && user.status === "revocado") setUser(null);
      }
    });
  }, []);

  // ruta #/verificar?token=
  useEffect(() => {
    const { path, params } = parseHashRoute(route);
    if (path !== "/verificar" || !params.token || verifying) return;
    setVerifying(true);
    window.CupaAPI.verify(params.token).then((res) => {
      setVerifying(false);
      if (res.ok) {
        window.CupaAPI.setSession(res.sessionToken);
        setUser(res.user);
        setMsg({ title: "Registro confirmado", body: "Ya eres vecina/o activa/o en CUPA Inspira. Bienvenida." });
        window.location.hash = "#/";
      } else {
        setMsg({ title: "No se pudo verificar", body: res.error || "El enlace no es válido o ya se usó." });
        window.location.hash = "#/";
      }
    });
  }, [route]);

  const go = (h) => { if (window.location.hash === h) { window.scrollTo({ top: 0, behavior: "smooth" }); } else { window.location.hash = h; } };

  const openRegister = (opts = {}) => setReg({ mode: "register", ...opts });
  const openLogin = () => setReg({ mode: "login", intro: "Entra con el correo con el que te registraste." });

  const ensureAccess = (fn) => {
    if (isActiveUser(user)) { fn && fn(); return; }
    if (user && user.status === "pendiente") {
      setMsg({ title: "Registro en revisión", body: "Tu ficha está pendiente. Si diste correo, confirma el enlace; si solo teléfono, la mesa te activará pronto." });
      return;
    }
    if (user && user.status === "revocado") {
      setMsg({ title: "Acceso revocado", body: "Este acceso ya no está vigente. Escribe a la mesa vecinal si crees que es un error." });
      return;
    }
    pending.current = fn;
    setReg({ mode: "register", intro: "Regístrate para ver esta sección. Confirmamos edificio, departamento y contacto." });
  };

  const ensureParticipation = (actionLabel, fn) => {
    if (!isActiveUser(user)) { ensureAccess(fn); return; }
    if (user.phone) { fn && fn(); return; }
    pending.current = fn;
    setPhoneAsk({ actionLabel });
  };

  const finishReg = (data, meta) => {
    setReg(null);
    if (data) setUser(data);
    if (meta && meta.loggedIn) {
      const fn = pending.current; pending.current = null;
      setTimeout(() => fn && fn(), 50);
      return;
    }
    if (meta && meta.needAdmin) {
      setMsg({ title: "Registro recibido", body: meta.message || "La mesa vecinal activará tu acceso al confirmar el teléfono." });
      pending.current = null;
      return;
    }
    if (meta && meta.needVerify) {
      const body = meta.emailSent
        ? "Revisa tu correo y abre el enlace de confirmación."
        : (meta.verifyUrl
          ? "Confirma tu registro con este enlace (copia y pégalo mientras el correo no esté configurado): " + meta.verifyUrl
          : (meta.message || "Confirma tu correo para activar el acceso."));
      setMsg({ title: "Casi listo", body });
      pending.current = null;
      return;
    }
    if (meta && meta.existing && data && data.status === "pendiente") {
      setMsg({ title: "Ya estás en el padrón", body: "Tu registro sigue pendiente de confirmación o aprobación." });
      pending.current = null;
      return;
    }
    const fn = pending.current; pending.current = null;
    if (isActiveUser(data)) setTimeout(() => fn && fn(), 50);
  };

  const finishPhone = (phone) => {
    setUser((u) => ({ ...u, phone })); setPhoneAsk(null);
    const fn = pending.current; pending.current = null;
    setTimeout(() => fn && fn(), 50);
  };
  const logout = () => {
    window.CupaAPI && window.CupaAPI.setSession(null);
    setUser(null);
  };

  const joinOrg = (orgName) => ensureParticipation("unirte a esta organización", () =>
    setMsg({ title: "¡Bienvenida al equipo!", body: `Te sumaste a "${orgName}". Te escribiremos por WhatsApp para los próximos pasos.` }));
  const contact = (vecino) => ensureParticipation("contactar a este vecino", () =>
    setMsg({ title: "Contacto enviado", body: `Le avisamos a ${vecino} que quieres contactarle. Te conectará por WhatsApp.` }));
  const subscribe = () => ensureAccess(() =>
    setMsg({ title: "¡Quedaste en la lista!", body: "Cuando salga la próxima Gaceta, te llega al correo del padrón. Mientras, léela aquí en la web." }));
  const projVote = (id, v) => ensureParticipation("votar este proyecto", () =>
    setProjVotes((s) => ({ ...s, [id]: s[id] === v ? undefined : v })));
  const initVote = (id, v) => ensureParticipation("votar esta iniciativa", () =>
    setInitVotes((s) => ({ ...s, [id]: s[id] === v ? undefined : v })));
  const addComment = (id, c) => ensureParticipation("comentar", () =>
    setComments((s) => ({ ...s, [id]: [...(s[id] || []), c] })));

  const { path } = parseHashRoute(route);
  let page;
  if (path.startsWith("/verificar")) {
    page = (
      <div className="wrap" style={{ padding: "120px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: 17, color: C.brown }}>{verifying ? "Confirmando tu registro…" : "Verificando…"}</p>
      </div>
    );
  }   else if (path.startsWith("/avisos")) page = <AvisosPage go={go} onRegister={() => openRegister()} />;
  else if (path.startsWith("/oficios")) page = <OficiosPage go={go} onContact={contact} onRegister={() => openRegister()} />;
  else if (path.startsWith("/propuestas")) page = isActiveUser(user)
    ? <PropuestasPage user={user} votes={initVotes} onVote={initVote} comments={comments} onComment={addComment} />
    : <GateScreen title="Propuestas del CUPA" intro="Para seguir iniciativas y sumarte, regístrate como vecino. Confirmamos edificio y contacto." onRegister={() => ensureAccess(() => go("#/propuestas"))} />;
  else if (path.startsWith("/comunidad/emprendimiento") || path.startsWith("/comunidad/comercio")) page = <OficiosPage go={go} onContact={contact} onRegister={() => openRegister()} />;
  else if (path.startsWith("/comunidad")) page = <EcologiaPage go={go} onJoin={joinOrg} />;
  else if (path.startsWith("/proyectos")) page = isActiveUser(user)
    ? <ProyectosPage user={user} votes={projVotes} onVote={projVote} />
    : <GateScreen title="Proyectos de la comunidad" intro="Solo vecinos activos del padrón. Regístrate y confirma tu correo (o espera aprobación si solo diste teléfono)." onRegister={() => ensureAccess(() => go("#/proyectos"))} />;
  else if (path.startsWith("/iniciativas")) page = isActiveUser(user)
    ? <IniciativasPage user={user} votes={initVotes} onVote={initVote} comments={comments} onComment={addComment} />
    : <GateScreen title="Iniciativas en desarrollo" intro="Solo vecinos activos. Regístrate para sumarte a los grupos, votar y comentar." onRegister={() => ensureAccess(() => go("#/iniciativas"))} />;
  else if (path.startsWith("/gaceta")) page = <GacetaPage onSubscribe={subscribe} />;
  else if (path.startsWith("/privacidad")) page = <LegalPage kind="privacidad" go={go} />;
  else if (path.startsWith("/terminos")) page = <LegalPage kind="terminos" go={go} />;
  else page = <HomePage go={go} onRegister={() => openRegister()} />;

  const isHome = path === "/" || path === "";
  return (
    <React.Fragment>
      <Nav route={route} go={go} user={user} onRegister={() => openRegister()} onLogin={openLogin} onLogout={logout} />
      <main style={{ paddingTop: isHome ? 0 : 76 }}>{page}</main>
      <Footer go={go} />
      <RegisterModal open={!!reg} onClose={() => { setReg(null); pending.current = null; }} onDone={finishReg} intro={reg && reg.intro} mode={reg && reg.mode} go={go} />
      <PhoneModal open={!!phoneAsk} onClose={() => { setPhoneAsk(null); pending.current = null; }} onDone={finishPhone} actionLabel={phoneAsk && phoneAsk.actionLabel} />
      <MessageModal data={msg} onClose={() => setMsg(null)} />
    </React.Fragment>
  );
}

function mountCupa() {
  // Relee gaceta desde content/ si el loader ya resolvió
  if (typeof resolveGaceta === "function") {
    window.GACETA = resolveGaceta();
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}

if (window.__CUPA_CONTENT__ && typeof window.__CUPA_CONTENT__.then === "function") {
  window.__CUPA_CONTENT__.then(mountCupa).catch(mountCupa);
} else {
  mountCupa();
}
