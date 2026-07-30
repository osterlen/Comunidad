/* CUPA Inspira — vistas de página */
const { useState: useStateP, useEffect: useEffectP } = React;

/* ====================================================== */
/*  HOME — 3 puertas (design system)                      */
/* ====================================================== */
function HomePage({ go, onRegister }) {
  const ahora = window.AHORA || [];
  const avisos = (window.AVISOS || []).slice(0, 3);
  return (
    <React.Fragment>
      <section style={{ position: "relative", minHeight: "78vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "linear-gradient(140deg, #5e0f0c 0%, #7a1410 38%, #0d3e23 100%)" }}>
        <image-slot id="hero" shape="rect" placeholder="Fachada del Centro Urbano Presidente Alemán"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}></image-slot>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(94,15,12,.35) 0%, rgba(94,15,12,.45) 40%, rgba(94,15,12,.92) 100%)" }} />
        <div className="wrap" style={{ position: "relative", paddingTop: 120, paddingBottom: 52 }}>
          <div style={{ maxWidth: 640, animation: "floatUp .7s ease both" }}>
            <Eyebrow color="rgba(251,243,220,.85)">CUPA · Del Valle, CDMX</Eyebrow>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: C.cream, margin: "18px 0 0", textWrap: "balance" }}>
              El punto de encuentro <span style={{ fontStyle: "italic" }}>del CUPA</span>
            </h1>
            <p style={{ fontFamily: "var(--sans)", fontSize: 19, lineHeight: 1.55, color: "rgba(251,243,220,.88)", maxWidth: 480, margin: "20px 0 0" }}>
              Aquí te enteras de lo que pasa, avisas a tus vecinos y encuentras quién puede ayudarte.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
              <Btn variant="creamSolid" size="lg" onClick={() => go("#/avisos")}>Ver avisos</Btn>
              <Btn variant="ghostCream" size="lg" onClick={() => go("#/oficios")} icon={false}>Buscar oficio</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Tres puertas */}
      <section style={{ padding: "48px 0 28px" }}>
        <div className="wrap">
          <Eyebrow>¿Qué necesitas?</Eyebrow>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 40px)", color: C.red, margin: "12px 0 0" }}>Tres maneras de entrar</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 26 }}>
            {[
              { q: "¿Qué está pasando?", title: "Avisos", hint: "Juntas, Poposta, agua, gaceta.", href: "#/avisos", cta: "Ver avisos", variant: "primary" },
              { q: "¿Quién hace qué?", title: "Oficios", hint: "Chambas, comida, locales, servicios.", href: "#/oficios", cta: "Buscar oficio", variant: "green" },
              { q: "¿Qué queremos hacer?", title: "Propuestas", hint: "Ideas e iniciativas en curso.", href: "#/propuestas", cta: "Ver propuestas", variant: "outline" },
            ].map((d) => (
              <article key={d.title} style={{ background: "#fffdf7", border: "1px solid var(--line)", borderRadius: 20, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 200 }}>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brown-soft)" }}>{d.q}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 28, color: C.red, margin: 0, lineHeight: 1.1 }}>{d.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 17, lineHeight: 1.45, color: C.brown, margin: 0, flex: 1 }}>{d.hint}</p>
                <div style={{ marginTop: 8 }}>
                  <Btn variant={d.variant} size="lg" icon={false} onClick={() => go(d.href)}>{d.cta}</Btn>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lo de hoy — lista tipográfica */}
      <section style={{ padding: "36px 0 72px" }}>
        <div className="wrap">
          <Eyebrow>Lo de hoy</Eyebrow>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 40px)", color: C.red, margin: "12px 0 0" }}>Avisos recientes</h2>
          <div style={{ marginTop: 8, borderTop: "1px solid var(--line)" }}>
            {(ahora.length ? ahora.map((card) => ({
              id: card.id, when: card.eyebrow || "Ahora", title: card.title, body: card.body,
              href: card.cta_href || "#/avisos", label: card.cta_label || "Ver", tone: card.tone,
            })) : avisos.map((a) => ({
              id: a.id, when: a.tag || "Aviso", title: a.title, body: a.body, href: "#/avisos", label: "Ver", tone: "cream",
            }))).map((row) => (
              <div key={row.id} style={{ display: "grid", gridTemplateColumns: "minmax(72px,auto) 1fr auto", gap: "10px 18px", alignItems: "center", padding: "20px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: "var(--brown-soft)" }}>{row.when}</div>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red, lineHeight: 1.15 }}>{row.title}</div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, lineHeight: 1.45, color: C.brown, margin: "6px 0 0" }}>{row.body}</p>
                </div>
                <Btn variant={row.tone === "green" ? "green" : "outline"} size="sm" icon={false}
                  onClick={() => { if ((row.href || "").startsWith("http")) window.open(row.href, "_blank"); else go(row.href); }}>
                  {row.label}
                </Btn>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Btn variant="primary" size="lg" icon={false} onClick={() => go("#/avisos")}>Todos los avisos</Btn>
            <Btn variant="outline" size="lg" icon={false} onClick={onRegister}>Registrarme como vecino</Btn>
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

/* ====================================================== */
/*  AVISOS                                                */
/* ====================================================== */
function AvisosPage({ go, onRegister }) {
  const ahora = window.AHORA || [];
  const avisos = window.AVISOS || [];
  const convocatorias = (window.CONVOCATORIAS || []).filter((c) => c.status === "abierta");
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Avisos" title="¿Qué está pasando en el CUPA?"
          intro="Lo urgente y lo próximo: proyectos en marcha, juntas y la Gaceta." />

        {ahora.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 36 }}>
            {ahora.map((card) => (
              <article key={card.id} style={{ background: card.tone === "green" ? C.green : "#fffdf7", border: card.tone === "green" ? "none" : "1px solid var(--line)", borderRadius: 20, padding: "26px 24px", color: card.tone === "green" ? C.cream : C.brown }}>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75 }}>{card.eyebrow}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, margin: "10px 0 0", color: card.tone === "green" ? C.cream : C.red, lineHeight: 1.15 }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, lineHeight: 1.5, margin: "10px 0 0", opacity: card.tone === "green" ? 0.9 : 1 }}>{card.body}</p>
                <div style={{ marginTop: 18 }}>
                  <Btn variant={card.tone === "green" ? "creamSolid" : "green"} size="sm" icon={false}
                    onClick={() => { if ((card.cta_href || "").startsWith("http")) window.open(card.cta_href, "_blank"); else go(card.cta_href || "#/gaceta"); }}>
                    {card.cta_label || "Ver"}
                  </Btn>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, borderTop: "1px solid var(--line)" }}>
          {avisos.map((a) => (
            <div key={a.id} style={{ padding: "22px 0", borderBottom: "1px solid var(--line)" }}>
              <Tag color={C.green}>{a.tag || "Aviso"}</Tag>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, color: C.red, margin: "10px 0 0", lineHeight: 1.15 }}>{a.title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 17, lineHeight: 1.5, color: C.brown, margin: "8px 0 0", maxWidth: 640 }}>{a.body}</p>
            </div>
          ))}
          {!avisos.length && !ahora.length && (
            <p style={{ fontFamily: "var(--sans)", fontSize: 17, color: "var(--brown-soft)", marginTop: 24 }}>Pronto habrá avisos aquí.</p>
          )}
        </div>

        {convocatorias.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <Eyebrow>Cómo sumarte</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {convocatorias.map((c) => (
                <div key={c.id} style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", background: "#fffdf7", border: "1px solid var(--line)", borderRadius: 16, padding: "18px 22px" }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <Tag color={C.green}>{c.tag}</Tag>
                    <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red, marginTop: 8 }}>{c.title}</div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: C.brown, margin: "6px 0 0", lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                  <Btn variant="green" size="lg" icon={false}
                    onClick={() => {
                      if ((c.cta_href || "").startsWith("http")) window.open(c.cta_href, "_blank");
                      else if (c.cta_href === "#/registro") onRegister();
                      else go(c.cta_href || "#/");
                    }}>{c.cta_label}</Btn>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 36 }}>
          <Btn variant="outline" size="lg" icon={false} onClick={() => go("#/gaceta")}>Abrir La Gaceta</Btn>
        </div>
      </div>
    </div>
  );
}

/* ====================================================== */
/*  OFICIOS — directorio unificado                        */
/* ====================================================== */
function OficiosPage({ go, onContact, onRegister }) {
  const oficios = window.EMPRENDIMIENTO || [];
  const locales = window.COMERCIO || [];
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Oficios" title="¿Quién hace qué en el CUPA?"
          intro="Vecinos que ofrecen un servicio y locales del conjunto. Lo que necesitas, cerca." />

        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 28, color: C.red, margin: "36px 0 0" }}>Vecinos y oficios</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 20 }}>
          {oficios.map((v) => (
            <article key={v.id} style={{ background: "#fffdf7", border: "1px solid var(--line)", borderRadius: 18, padding: "22px 22px 20px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red, margin: 0, lineHeight: 1.15 }}>{v.product}</h3>
              <div style={{ fontFamily: "var(--sans)", fontSize: 15, color: "var(--brown-soft)", marginTop: 10 }}>
                <strong style={{ color: C.brown }}>{v.vecino}</strong> · {v.edif}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 16 }}>
                <Btn variant="green" size="sm" icon={false} onClick={() => onContact(v.vecino)}>Contactar</Btn>
              </div>
            </article>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 28, color: C.red, margin: "48px 0 0" }}>Locales y servicios</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginTop: 20 }}>
          {locales.map((c) => (
            <article key={c.id} style={{ background: "#fffdf7", border: "1px solid var(--line)", borderRadius: 18, padding: "20px 22px" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 21, color: C.red, margin: 0, lineHeight: 1.15 }}>{c.name}</h3>
              <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 15, color: C.green, marginTop: 6 }}>{c.type}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 15, color: "var(--brown-soft)", marginTop: 4 }}>{c.loc}</div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "24px 26px", background: "rgba(13,62,35,.06)", borderRadius: 18, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, color: C.red }}>¿Ofreces algo a la comunidad?</div>
            <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: C.brown, margin: "6px 0 0" }}>Regístrate y marca que cocinas, reparas, das clases o un servicio.</p>
          </div>
          <Btn variant="green" size="lg" icon={false} onClick={onRegister}>Registrarme</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, EcologiaPage, EmprendimientoPage, ComercioPage, ComunidadLayout, NavCard, SignatureBar, AvisosPage, OficiosPage });
