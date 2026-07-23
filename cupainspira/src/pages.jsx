/* CUPA Inspira — vistas de página */
const { useState: useStateP, useEffect: useEffectP } = React;

/* ====================================================== */
/*  HOME                                                  */
/* ====================================================== */
function HomePage({ go, onRegister }) {
  const ahora = window.AHORA || [];
  const convocatorias = (window.CONVOCATORIAS || []).filter((c) => c.status === "abierta");
  return (
    <React.Fragment>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: 560, display: "flex", alignItems: "flex-end", overflow: "hidden", background: "linear-gradient(140deg, #5e0f0c 0%, #7a1410 38%, #0d3e23 100%)" }}>
        <image-slot id="hero" shape="rect" placeholder="Fachada del Centro Urbano Presidente Alemán"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}></image-slot>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(94,15,12,.42) 0%, rgba(94,15,12,.4) 42%, rgba(94,15,12,.88) 100%)" }} />
        <div className="wrap" style={{ position: "relative", paddingTop: 110, paddingBottom: 56 }}>
          <div style={{ maxWidth: 660, animation: "floatUp .7s ease both" }}>
            <Eyebrow color="rgba(251,243,220,.85)">CUPA · Del Valle, Ciudad de México</Eyebrow>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(42px, 5.4vw, 72px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: C.cream, margin: "20px 0 0", textWrap: "balance" }}>
              75 años de vecindad,<br />una comunidad que <span style={{ fontStyle: "italic" }}>se organiza</span>.
            </h1>
            <p style={{ fontFamily: "var(--sans)", fontSize: 19, lineHeight: 1.58, color: "rgba(251,243,220,.86)", maxWidth: 520, margin: "24px 0 0" }}>
              Canal vecinal del Centro Urbano Presidente Alemán: proyectos en curso, directorio y gaceta — más de mil departamentos.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
              <Btn variant="creamSolid" size="lg" onClick={() => go("#/proyectos")}>Ver qué está pasando</Btn>
              <Btn variant="ghostCream" size="lg" onClick={onRegister} icon={false}>Registrarme como vecino</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* AHORA EN EL CUPA */}
      <section style={{ padding: "64px 0 24px" }}>
        <div className="wrap">
          <Eyebrow>Ahora en el CUPA</Eyebrow>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 40px)", color: C.red, margin: "14px 0 0" }}>Lo que está en marcha</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 28 }}>
            {ahora.map((card) => (
              <article key={card.id} style={{ background: card.tone === "green" ? C.green : C.cream, border: card.tone === "green" ? "none" : "1px solid var(--line)", borderRadius: 20, padding: "28px 26px", color: card.tone === "green" ? C.cream : C.brown }}>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75 }}>{card.eyebrow}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, margin: "12px 0 0", color: card.tone === "green" ? C.cream : C.red, lineHeight: 1.15 }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.55, margin: "12px 0 0", opacity: card.tone === "green" ? 0.88 : 1 }}>{card.body}</p>
                <div style={{ marginTop: 20 }}>
                  <Btn variant={card.tone === "green" ? "creamSolid" : "green"} size="sm" icon={false}
                    onClick={() => { if ((card.cta_href || "").startsWith("http")) window.open(card.cta_href, "_blank"); else go(card.cta_href || "#/"); }}>
                    {card.cta_label || "Ver más"}
                  </Btn>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONVOCATORIAS */}
      {convocatorias.length > 0 && (
      <section style={{ padding: "40px 0 24px" }}>
        <div className="wrap">
          <Eyebrow>Convocatorias</Eyebrow>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 32, color: C.red, margin: "14px 0 0" }}>Cómo sumarte</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
            {convocatorias.map((c) => (
              <div key={c.id} style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", background: C.cream, border: "1px solid var(--line)", borderRadius: 16, padding: "18px 22px" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <Tag color={C.green}>{c.tag}</Tag>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red, marginTop: 8 }}>{c.title}</div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, color: C.brown, margin: "6px 0 0", lineHeight: 1.5 }}>{c.desc}</p>
                </div>
                <Btn variant="green" size="sm" icon={false}
                  onClick={() => {
                    if ((c.cta_href || "").startsWith("http")) window.open(c.cta_href, "_blank");
                    else if (c.cta_href === "#/registro") onRegister();
                    else go(c.cta_href || "#/");
                  }}>{c.cta_label}</Btn>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ACCESOS */}
      <section style={{ padding: "48px 0 84px" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <Eyebrow>Explora</Eyebrow>
              <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 40px)", color: C.red, margin: "14px 0 0" }}>Comunidad en acción</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 36 }}>
            <NavCard icon={<IconLeaf size={24} color={C.green} />} title="Comunidad" desc="Ecología, emprendimiento y comercio." onClick={() => go("#/comunidad/ecologia")} cta="Ver comunidad" />
            <NavCard icon={<IconCheck size={24} color={C.red} />} title="Proyectos" desc="Poposta y propuestas en curso." onClick={() => go("#/proyectos")} cta="Ver proyectos" locked />
            <NavCard icon={<IconNews size={24} color={C.green} />} title="La Gaceta" desc="El boletín quincenal." onClick={() => go("#/gaceta")} cta="Leer la Gaceta" />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function NavCard({ icon, title, desc, onClick, href, cta, locked, disabled }) {
  const [h, setH] = useStateP(false);
  const El = href ? "a" : "div";
  return (
    <El href={href} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined}
      onClick={disabled ? undefined : onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", background: C.cream, border: "1px solid var(--line)", borderRadius: 20, padding: "26px 26px 24px", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.62 : 1, transition: "transform .25s ease, box-shadow .25s ease", transform: h && !disabled ? "translateY(-3px)" : "none", boxShadow: h && !disabled ? "0 18px 38px -22px rgba(91,74,54,.55)" : "0 1px 0 rgba(91,74,54,.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(91,74,54,.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
        {locked && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 11.5, color: "var(--brown-soft)", letterSpacing: "0.04em" }}><IconLock size={13} /> Registro</span>}
        {disabled && <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 11, color: "#b5701a", background: "rgba(181,112,26,.12)", padding: "4px 9px", borderRadius: 999, letterSpacing: "0.04em" }}>PRÓXIMAMENTE</span>}
      </div>
      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, color: C.red, margin: "16px 0 0" }}>{title}</h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.5, color: C.brown, margin: "8px 0 0" }}>{desc}</p>
      <span style={{ marginTop: "auto", paddingTop: 18, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14.5, color: disabled ? "var(--brown-soft)" : C.green }}>
        {cta} {!disabled && <IconArrow size={15} color={C.green} />}
      </span>
    </El>
  );
}

function SignatureBar({ count, goal, onSign }) {
  const pct = Math.min(100, (count / goal) * 100);
  return (
    <div style={{ marginTop: 22, maxWidth: 460 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 26, color: C.green }}>{count}</span>
          <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--brown-soft)" }}>firmas de {goal}</span>
        </div>
        <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: C.green }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: "rgba(91,74,54,.14)", marginTop: 11, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: C.green, borderRadius: 99, transition: "width .6s cubic-bezier(.2,.7,.3,1)" }} />
      </div>
      <div style={{ marginTop: 18 }}><Btn variant="green" onClick={onSign}>Firmar por la composta</Btn></div>
    </div>
  );
}

/* ====================================================== */
/*  COMUNIDAD — layout con sub-tabs                       */
/* ====================================================== */
function ComunidadLayout({ tab, go, children }) {
  const tabs = [["ecologia", "Ecología"], ["emprendimiento", "Emprendimiento"], ["comercio", "Comercio"]];
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Comunidad CUPA" title="La vida del conjunto" intro="Lo que cultivamos, lo que emprendemos y lo que da servicio adentro del CUPA. Todo hecho por vecinas y vecinos." />
        <div style={{ display: "flex", gap: 6, marginTop: 34, borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
          {tabs.map(([id, label]) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => go(`#/comunidad/${id}`)}
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "12px 18px", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: active ? C.red : "var(--brown-soft)", transition: "color .2s" }}>
                {label}
                <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2.5, background: active ? C.red : "transparent", borderRadius: 99 }} />
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 36 }}>{children}</div>
      </div>
    </div>
  );
}

function EcologiaPage({ go, onJoin }) {
  return (
    <ComunidadLayout tab="ecologia" go={go}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 22 }}>
        {ECOLOGIA.map((o) => (
          <article key={o.id} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 18, padding: "24px 24px 22px", display: "flex", flexDirection: "column", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(13,62,35,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><IconLeaf size={22} color={C.green} /></span>
              <StatusBadge status={o.status} />
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 23, color: C.red, margin: "16px 0 0", lineHeight: 1.1 }}>{o.name}</h3>
            <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, color: "var(--brown-soft)", marginTop: 5 }}>{o.lead}</div>
            <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.55, color: C.brown, margin: "10px 0 0" }}>{o.desc}</p>
            <div style={{ marginTop: "auto", paddingTop: 18 }}>
              <Btn variant={o.status === "activo" ? "outline" : "green"} size="sm" icon={false} onClick={() => onJoin(o.name)}>Unirme</Btn>
            </div>
          </article>
        ))}
      </div>
    </ComunidadLayout>
  );
}

function EmprendimientoPage({ go, onContact }) {
  return (
    <ComunidadLayout tab="emprendimiento" go={go}>
      <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, color: C.brown, maxWidth: 620, marginBottom: 28, lineHeight: 1.55 }}>
        Vecinas y vecinos que venden desde su departamento. Apóyalos: cada compra se queda en la comunidad.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 22 }}>
        {EMPRENDIMIENTO.map((v) => (
          <article key={v.id} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 18, padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
            <div style={{ fontSize: 34, lineHeight: 1 }}>{v.emoji}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red, margin: "14px 0 0", lineHeight: 1.12 }}>{v.product}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--brown-soft)" }}>
              <span style={{ fontWeight: 600, color: C.brown }}>{v.vecino}</span>
              <span>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBuilding size={14} /> {v.edif}</span>
            </div>
            <div style={{ marginTop: 18 }}>
              <Btn variant="green" size="sm" icon={false} onClick={() => onContact(v.vecino)}><IconWhats size={15} color="#fbf3dc" /> Contactar</Btn>
            </div>
          </article>
        ))}
      </div>
    </ComunidadLayout>
  );
}

function ComercioPage({ go }) {
  return (
    <ComunidadLayout tab="comercio" go={go}>
      <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, color: C.brown, maxWidth: 620, marginBottom: 28, lineHeight: 1.55 }}>
        Los locales y servicios que viven dentro del conjunto. Lo que necesitas, sin salir del CUPA.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {COMERCIO.map((c) => (
          <article key={c.id} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 18, padding: "22px 24px", display: "flex", gap: 16, alignItems: "flex-start", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(122,20,16,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconPin size={22} color={C.red} /></span>
            <div>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 21, color: C.red, margin: 0, lineHeight: 1.12 }}>{c.name}</h3>
              <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, color: C.green, marginTop: 6 }}>{c.type}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--brown-soft)", marginTop: 4 }}>{c.loc}</div>
            </div>
          </article>
        ))}
      </div>
    </ComunidadLayout>
  );
}

Object.assign(window, { HomePage, EcologiaPage, EmprendimientoPage, ComercioPage, ComunidadLayout, NavCard, SignatureBar });
