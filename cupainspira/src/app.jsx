/* CUPA Inspira — router, navegación, sesión y modales */
const { useState, useEffect, useRef } = React;

const GOAL = 250;

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
function Nav({ route, go, user, onRegister, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [openCom, setOpenCom] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const comRef = useRef(null);
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
  useEffect(() => {
    const close = (e) => { if (comRef.current && !comRef.current.contains(e.target)) setOpenCom(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // sobre el hero (home, sin scroll, menú cerrado) el nav es claro
  const overHero = onHome && !scrolled && !openMenu;
  const fg = overHero ? "#fbf3dc" : C.brown;
  const isActive = (h) => route.startsWith(h);

  const navItem = (label, href, opts = {}) => {
    const active = isActive(href);
    return (
      <button key={label} onClick={opts.onClick || (() => go(href))} disabled={opts.disabled}
        style={{ position: "relative", background: "none", border: "none", cursor: opts.disabled ? "default" : "pointer", padding: "8px 2px", fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15, color: opts.disabled ? (overHero ? "rgba(251,243,220,.5)" : "var(--brown-soft)") : fg, opacity: 1, display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
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
        <nav style={{ display: "flex", alignItems: "center", gap: 24, overflowX: "auto", flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
          {/* Comunidad dropdown */}
          <div ref={comRef} style={{ position: "relative" }}>
            <button onClick={() => setOpenCom((o) => !o)}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "8px 2px", fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15, color: isActive("#/comunidad") ? fg : fg, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Comunidad
              <svg width="11" height="11" viewBox="0 0 12 12" style={{ transform: openCom ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M2 4l4 4 4-4" stroke={fg} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {isActive("#/comunidad") && <span style={{ position: "absolute", left: 0, right: 17, bottom: -2, height: 2, background: overHero ? C.cream : C.red, borderRadius: 99 }} />}
            </button>
            {openCom && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", left: -8, background: C.cream, border: "1px solid var(--line)", borderRadius: 14, padding: 8, minWidth: 200, boxShadow: "0 20px 45px -20px rgba(91,74,54,.5)", animation: "floatUp .2s ease both" }}>
                {[["Ecología", "#/comunidad/ecologia", "Jardines, composta y reciclaje"], ["Emprendimiento", "#/comunidad/emprendimiento", "Vecinos que venden"], ["Comercio", "#/comunidad/comercio", "Locales del conjunto"]].map(([t, h, d]) => (
                  <button key={h} onClick={() => { setOpenCom(false); go(h); }}
                    style={{ display: "block", width: "100%", textAlign: "left", background: route === h ? "rgba(122,20,16,.06)" : "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 9, transition: "background .15s" }}
                    onMouseEnter={(e) => { if (route !== h) e.currentTarget.style.background = "rgba(91,74,54,.05)"; }}
                    onMouseLeave={(e) => { if (route !== h) e.currentTarget.style.background = "none"; }}>
                    <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14.5, color: C.red }}>{t}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 12.5, color: "var(--brown-soft)", marginTop: 1 }}>{d}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {navItem("Proyectos", "#/proyectos")}
          {navItem("Iniciativas", "#/iniciativas")}
          {navItem("Votación", "#/votacion", { disabled: true, badge: true })}
          {navItem("Gaceta", "#/gaceta")}
          {navItem("Fotos", "ig", { external: true, onClick: () => window.open("https://instagram.com/cupainspira", "_blank") })}
        </nav>
        )}

        {/* sesión + menú — pinned, fuera del scroll */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 14, marginLeft: narrow ? "auto" : 0 }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: fg }}>
                <span style={{ width: 30, height: 30, borderRadius: 99, background: C.green, color: C.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{user.name[0]}</span>
                <span style={{ whiteSpace: "nowrap" }}>{user.name.split(" ")[0]}</span>
              </span>
              <button onClick={onLogout} title="Cerrar sesión" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: 13, color: overHero ? "rgba(251,243,220,.7)" : "var(--brown-soft)", textDecoration: "underline", whiteSpace: "nowrap" }}>Salir</button>
            </div>
          ) : (
            <Btn variant={overHero ? "creamSolid" : "primary"} size="sm" icon={false} onClick={onRegister}>Registrarme</Btn>
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
            <div style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brown-soft)", padding: "8px 0 4px" }}>Comunidad</div>
            {[["Ecología", "#/comunidad/ecologia"], ["Emprendimiento", "#/comunidad/emprendimiento"], ["Comercio", "#/comunidad/comercio"]].map(([t, h]) => (
              <button key={h} onClick={() => go(h)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 9, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: route === h ? C.red : C.brown }}>{t}</button>
            ))}
            <div style={{ height: 1, background: "var(--line)", margin: "8px 0" }} />
            {[["Proyectos", "#/proyectos"], ["Iniciativas", "#/iniciativas"], ["Gaceta", "#/gaceta"]].map(([t, h]) => (
              <button key={h} onClick={() => go(h)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 9, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: route.startsWith(h) ? C.red : C.brown }}>{t}</button>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px" }}>
              <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: "var(--brown-soft)" }}>Votación</span>
              <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 10.5, color: "#b5701a", background: "rgba(181,112,26,.14)", padding: "3px 8px", borderRadius: 999, letterSpacing: "0.05em" }}>PRÓXIMAMENTE</span>
            </div>
            <a href="https://instagram.com/cupainspira" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 12px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: C.brown }}><IconInstagram size={18} /> Fotos · Instagram</a>
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
          <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, color: "rgba(251,243,220,.72)", marginTop: 18, maxWidth: 280, lineHeight: 1.55 }}>
            Plataforma vecinal del Centro Urbano Presidente Alemán (CUPA), Del Valle, Ciudad de México. Una comunidad con más de 75 años de historia.
          </p>
        </div>
        {[["Comunidad", [["Ecología", "#/comunidad/ecologia"], ["Emprendimiento", "#/comunidad/emprendimiento"], ["Comercio", "#/comunidad/comercio"]]],
          ["Participa", [["Proyectos", "#/proyectos"], ["Iniciativas", "#/iniciativas"], ["La Gaceta", "#/gaceta"]]]].map(([title, links]) => (
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
          <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,243,220,.5)" }}>Síguenos</div>
          <ul style={{ listStyle: "none", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
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

/* registro vecinal — pide teléfono si requirePhone */
function RegisterModal({ open, onClose, onDone, requirePhone, intro }) {
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [apt, setApt] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => { if (open) { setName(""); setBuilding(""); setApt(""); setPhone(""); } }, [open]);
  if (!open) return null;
  const valid = name.trim() && building && apt.trim() && (!requirePhone || phone.trim().length >= 8);
  const submit = (e) => { e.preventDefault(); if (!valid) return; onDone({ name, building, apt, phone: phone || undefined }); };
  return (
    <Overlay onClose={onClose}>
      <Logo variant="mark" size={44} />
      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 27, color: C.red, margin: "16px 0 6px" }}>Confírmanos que eres del CUPA</h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: C.brown, lineHeight: 1.5 }}>{intro || "Con tu nombre, edificio y departamento validamos que vives en el conjunto. Si los datos no corresponden a un vecino, el acceso se retira."}</p>
      <form onSubmit={submit} style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Nombre completo" value={name} onChange={setName} placeholder="Ej. Mariana Reyes" />
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
          <SelectField label="Edificio" value={building} onChange={setBuilding} options={BUILDINGS} placeholder="Selecciona" />
          <Field label="Departamento" value={apt} onChange={setApt} placeholder="Ej. 304" />
        </div>
        {requirePhone && (
          <div style={{ animation: "floatUp .25s ease both" }}>
            <Field label="Teléfono (para participar)" value={phone} onChange={setPhone} placeholder="Ej. 55 1234 5678" type="tel" />
            <p style={{ fontFamily: "var(--sans)", fontSize: 12.5, color: "var(--brown-soft)", marginTop: 6, lineHeight: 1.45 }}>Lo pedimos solo para coordinar la participación por WhatsApp. No se publica.</p>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 6, alignItems: "center" }}>
          <Btn variant="green" icon={false}>{requirePhone ? "Registrarme y participar" : "Entrar"}</Btn>
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

/* ====================================================== */
/*  APP                                                   */
/* ====================================================== */
function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [user, setUser] = useLocal("cupa_user", null);
  const [signCount, setSignCount] = useLocal("cupa_signs", 184);
  const [projVotes, setProjVotes] = useLocal("cupa_projvotes", {});
  const [initVotes, setInitVotes] = useLocal("cupa_initvotes", {});
  const [comments, setComments] = useLocal("cupa_comments", {});

  // modales
  const [reg, setReg] = useState(null);        // { requirePhone, intro }
  const [phoneAsk, setPhoneAsk] = useState(null); // { actionLabel }
  const [msg, setMsg] = useState(null);
  const pending = useRef(null);

  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash || "#/"); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (h) => { if (window.location.hash === h) { window.scrollTo({ top: 0, behavior: "smooth" }); } else { window.location.hash = h; } };

  // registro simple (solo acceso a páginas)
  const openRegister = (opts = {}) => setReg({ requirePhone: false, ...opts });

  // garantiza sesión válida; luego corre fn
  const ensureAccess = (fn) => {
    if (user) { fn && fn(); }
    else { pending.current = fn; setReg({ requirePhone: false, intro: "Regístrate para ver esta sección. Solo confirmamos que vives en el CUPA." }); }
  };

  // garantiza sesión + teléfono (participación activa); luego corre fn
  const ensureParticipation = (actionLabel, fn) => {
    if (user && user.phone) { fn && fn(); return; }
    pending.current = fn;
    if (!user) setReg({ requirePhone: true, intro: `Para ${actionLabel} confirma que eres del CUPA y déjanos un teléfono de contacto.` });
    else setPhoneAsk({ actionLabel });
  };

  const finishReg = (data) => {
    setUser(data); setReg(null);
    const fn = pending.current; pending.current = null;
    setTimeout(() => fn && fn(), 50);
  };
  const finishPhone = (phone) => {
    setUser((u) => ({ ...u, phone })); setPhoneAsk(null);
    const fn = pending.current; pending.current = null;
    setTimeout(() => fn && fn(), 50);
  };
  const logout = () => { setUser(null); };

  // acciones
  const sign = () => ensureParticipation("firmar por la composta", () => {
    setSignCount((c) => c + 1);
    setMsg({ title: "¡Gracias por firmar!", body: "Tu firma ya cuenta para instalar la composta vecinal. Nos vemos en la próxima jornada." });
  });
  const joinOrg = (orgName) => ensureParticipation("unirte a esta organización", () =>
    setMsg({ title: "¡Bienvenida al equipo!", body: `Te sumaste a "${orgName}". Te escribiremos por WhatsApp para los próximos pasos.` }));
  const contact = (vecino) => ensureParticipation("contactar a este vecino", () =>
    setMsg({ title: "Contacto enviado", body: `Le avisamos a ${vecino} que quieres contactarle. Te conectará por WhatsApp.` }));
  const subscribe = () => ensureParticipation("suscribirte a La Gaceta", () =>
    setMsg({ title: "¡Suscripción lista!", body: "Recibirás La Gaceta cada quincena. Gracias por apoyar la cuota de recuperación." }));
  const projVote = (id, v) => ensureParticipation("votar este proyecto", () =>
    setProjVotes((s) => ({ ...s, [id]: s[id] === v ? undefined : v })));
  const initVote = (id, v) => ensureParticipation("votar esta iniciativa", () =>
    setInitVotes((s) => ({ ...s, [id]: s[id] === v ? undefined : v })));
  const addComment = (id, c) => ensureParticipation("comentar", () =>
    setComments((s) => ({ ...s, [id]: [...(s[id] || []), c] })));

  /* ---- render de página por ruta ---- */
  let page;
  if (route.startsWith("#/comunidad/emprendimiento")) page = <EmprendimientoPage go={go} onContact={contact} />;
  else if (route.startsWith("#/comunidad/comercio")) page = <ComercioPage go={go} />;
  else if (route.startsWith("#/comunidad")) page = <EcologiaPage go={go} onJoin={joinOrg} />;
  else if (route.startsWith("#/proyectos")) page = user
    ? <ProyectosPage user={user} votes={projVotes} onVote={projVote} />
    : <GateScreen title="Proyectos de la comunidad" intro="Esta sección es para vecinos registrados. Regístrate para ver y votar las propuestas en aprobación." onRegister={() => ensureAccess(() => go("#/proyectos"))} />;
  else if (route.startsWith("#/iniciativas")) page = user
    ? <IniciativasPage user={user} votes={initVotes} onVote={initVote} comments={comments} onComment={addComment} />
    : <GateScreen title="Iniciativas en desarrollo" intro="Esta sección es para vecinos registrados. Regístrate para sumarte a los grupos, votar y comentar." onRegister={() => ensureAccess(() => go("#/iniciativas"))} />;
  else if (route.startsWith("#/gaceta")) page = <GacetaPage onSubscribe={subscribe} />;
  else page = <HomePage go={go} signCount={signCount} goal={GOAL} onSign={sign} />;

  const isHome = route === "#/" || route === "" || route === "#";
  return (
    <React.Fragment>
      <Nav route={route} go={go} user={user} onRegister={() => openRegister()} onLogout={logout} />
      <main style={{ paddingTop: isHome ? 0 : 76 }}>{page}</main>
      <Footer go={go} />
      <RegisterModal open={!!reg} onClose={() => { setReg(null); pending.current = null; }} onDone={finishReg} requirePhone={reg && reg.requirePhone} intro={reg && reg.intro} />
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
