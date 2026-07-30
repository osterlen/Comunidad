/* CUPA Inspira — páginas con acceso restringido + Gaceta */
const { useState: useStateG } = React;

/* ====================================================== */
/*  PANTALLA DE ACCESO (gate)                             */
/* ====================================================== */
function GateScreen({ title, intro, onRegister }) {
  return (
    <div style={{ paddingTop: 56, paddingBottom: 100 }}>
      <div className="wrap">
        <div style={{ maxWidth: 560, margin: "40px auto 0", background: C.cream, border: "1px solid var(--line)", borderRadius: 22, padding: "44px 40px", textAlign: "center", boxShadow: "0 20px 50px -30px rgba(91,74,54,.5)" }}>
          <span style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(122,20,16,.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}><IconLock size={26} color={C.red} /></span>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 32, color: C.red, margin: "0 0 10px", lineHeight: 1.1 }}>{title}</h1>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, lineHeight: 1.55, color: C.brown, maxWidth: 400, margin: "0 auto 8px" }}>{intro}</p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--brown-soft)", margin: "14px auto 26px", maxWidth: 380 }}>
            Solo pedimos tu nombre, edificio y departamento para confirmar que eres del CUPA. Tus datos no se comparten.
          </p>
          <Btn variant="primary" size="lg" onClick={onRegister}>Registrarme como vecino</Btn>
        </div>
      </div>
    </div>
  );
}

/* ====================================================== */
/*  PROYECTOS                                             */
/* ====================================================== */
function ProyectosPage({ user }) {
  const list = window.PROYECTOS || [];
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Proyectos" title="Lo que estamos sacando adelante"
          intro="Iniciativas vecinales con estatus claro. Poposta ya cerró firmas y va en gestión con la alcaldía." />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontFamily: "var(--sans)", fontSize: 14, color: C.green }}>
          <IconCheck size={16} color={C.green} /> Sesión como <strong style={{ marginLeft: 2 }}>{user.name}</strong> · {user.building} {user.apt}
          {user.status && user.status !== "activo" && (
            <span style={{ marginLeft: 8, color: "#b5701a" }}>({user.status})</span>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginTop: 36 }}>
          {list.map((p) => (
            <article key={p.id} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
              <Tag color={p.phase === "gestion" ? C.green : "#b5701a"}>{p.status}</Tag>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 27, color: C.red, margin: "16px 0 0", lineHeight: 1.08 }}>{p.title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.56, color: C.brown, margin: "10px 0 0" }}>{p.desc}</p>
              {p.update && (
                <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, lineHeight: 1.5, color: "var(--brown-soft)", margin: "12px 0 0", padding: "12px 14px", background: "rgba(13,62,35,.06)", borderRadius: 12 }}>
                  {p.update}
                </p>
              )}
              {p.signatures_closed && (
                <div style={{ marginTop: 14, fontFamily: "var(--sans)", fontSize: 13.5, color: C.green, fontWeight: 600 }}>
                  Firmas cerradas{p.signatures_final ? ` · ${p.signatures_final} vecinas/os` : ""}
                </div>
              )}
              {p.cta_label && (
                <div style={{ marginTop: 20 }}>
                  <Btn variant="green" size="sm" icon={false}
                    onClick={() => { if ((p.cta_href || "").startsWith("http")) window.open(p.cta_href, "_blank"); }}>
                    {p.cta_label}
                  </Btn>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoteBtn({ active, color, label, onClick, down }) {
  const [h, setH] = useStateG(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 14px", borderRadius: 12, cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14.5, transition: "all .2s",
        background: active ? color : (h ? "rgba(91,74,54,.06)" : "transparent"),
        color: active ? C.cream : color, border: `1.5px solid ${active ? color : "rgba(91,74,54,.25)"}` }}>
      <IconThumb size={16} color={active ? C.cream : color} down={down} /> {label}
    </button>
  );
}

/* ====================================================== */
/*  INICIATIVAS                                           */
/* ====================================================== */
function IniciativasPage({ user, votes, onVote, comments, onComment }) {
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Iniciativas en desarrollo" title="Ideas que se están cocinando"
          color={C.green}
          intro="Propuestas vecinales que aún toman forma. Únete al grupo de WhatsApp, deja tu voto y aporta en los comentarios." />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontFamily: "var(--sans)", fontSize: 14, color: C.green }}>
          <IconCheck size={16} color={C.green} /> Sesión iniciada como <strong style={{ marginLeft: 2 }}>{user.name}</strong> · {user.building} {user.apt}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36 }}>
          {INICIATIVAS.map((it) => (
            <IniciativaCard key={it.id} it={it} vote={votes[it.id]} onVote={onVote}
              extraComments={comments[it.id] || []} onComment={onComment} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IniciativaCard({ it, vote, onVote, extraComments, onComment, user }) {
  const [open, setOpen] = useStateG(false);
  const [txt, setTxt] = useStateG("");
  const up = it.up + (vote === "up" ? 1 : 0);
  const down = it.down + (vote === "down" ? 1 : 0);
  const allComments = [...it.comments, ...extraComments];
  const submit = (e) => { e.preventDefault(); if (!txt.trim()) return; onComment(it.id, { who: `${user.name}, ${user.building}`, txt }); setTxt(""); };
  return (
    <article style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 20, padding: "28px 30px 24px", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 25, color: C.red, margin: 0, lineHeight: 1.1 }}>{it.title}</h3>
          <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.56, color: C.brown, margin: "10px 0 0", maxWidth: 560 }}>{it.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18, alignItems: "center" }}>
            <Btn variant="green" size="sm" icon={false} href="https://chat.whatsapp.com/cupainspira"><IconWhats size={15} color="#fbf3dc" /> Unirme al grupo</Btn>
            <button onClick={() => setOpen((o) => !o)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: "var(--brown-soft)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              💬 {allComments.length} comentario{allComments.length !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
        {/* votos */}
        <div style={{ display: "flex", gap: 8 }}>
          <VotePill active={vote === "up"} color={C.green} n={up} onClick={() => onVote(it.id, "up")} />
          <VotePill active={vote === "down"} color={C.red} n={down} down onClick={() => onVote(it.id, "down")} />
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 22, borderTop: "1px solid var(--line)", paddingTop: 20, animation: "floatUp .3s ease both" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {allComments.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <span style={{ width: 34, height: 34, borderRadius: 99, background: C.green, color: C.cream, fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.who[0]}</span>
                <div>
                  <div style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, color: C.brown }}>{c.who}</div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 14.5, color: C.brown, marginTop: 2, lineHeight: 1.5 }}>{c.txt}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Escribe un comentario…"
              style={{ flex: 1, fontFamily: "var(--sans)", fontSize: 14.5, color: C.brown, padding: "11px 14px", borderRadius: 11, border: "1.5px solid var(--line-strong)", background: "#fffdf7", outline: "none" }} />
            <Btn variant="outline" size="sm" icon={false}>Enviar</Btn>
          </form>
        </div>
      )}
    </article>
  );
}

function VotePill({ active, color, n, onClick, down }) {
  const [h, setH] = useStateG(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 16px", borderRadius: 13, cursor: "pointer", minWidth: 60, transition: "all .2s",
        background: active ? color : (h ? "rgba(91,74,54,.06)" : "transparent"), border: `1.5px solid ${active ? color : "rgba(91,74,54,.22)"}` }}>
      <IconThumb size={18} color={active ? C.cream : color} down={down} />
      <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, color: active ? C.cream : color }}>{n}</span>
    </button>
  );
}

/* ====================================================== */
/*  GACETA                                                */
/* ====================================================== */
function GacetaPage({ onSubscribe }) {
  const g = window.GACETA || GACETA;
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow={`La Gaceta · ${g.issue}`} title="El boletín de la comunidad" color={C.green}
          intro={`Cada quince días te contamos lo que pasa en el CUPA: acuerdos, vecinos y lo que viene. Edición del ${g.date}.`} />

        {/* portada destacada */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 0, marginTop: 40, background: C.green, borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 50px -30px rgba(13,62,35,.6)" }}>
          <div style={{ padding: "46px 44px", color: C.cream, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(251,243,220,.7)" }}>Portada · {g.issue}</span>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 3.2vw, 40px)", color: C.cream, margin: "16px 0 0", lineHeight: 1.1 }}>{g.headline}</h2>
            <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: "rgba(251,243,220,.8)", margin: "16px 0 0", lineHeight: 1.55, maxWidth: 420 }}>
              {g.lede}
            </p>
          </div>
          <image-slot id="gaceta-cover" shape="rect" placeholder="Portada de La Gaceta" style={{ width: "100%", minHeight: 300 }}></image-slot>
        </div>

        {/* artículos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 30 }}>
          {g.articles.map((a, i) => (
            <article key={i} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
              <image-slot id={`gnote-${i}`} shape="rect" placeholder={`Foto ${i + 1}`} style={{ width: "100%", height: 150 }}></image-slot>
              <div style={{ padding: "20px 22px 22px" }}>
                <Tag color={C.red}>{a.tag}</Tag>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 20, color: C.red, margin: "12px 0 0", lineHeight: 1.15 }}>{a.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, lineHeight: 1.55, color: C.brown, margin: "8px 0 0" }}>{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {/* suscripción */}
        <div style={{ marginTop: 30, background: C.cream, border: "1px solid var(--line)", borderRadius: 22, padding: "40px 40px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 28, color: C.red, margin: 0, lineHeight: 1.1 }}>Recibe La Gaceta en tu puerta y tu correo</h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: C.brown, margin: "10px 0 0", maxWidth: 480, lineHeight: 1.55 }}>
              {g.subscribe_note}
            </p>
          </div>
          <Btn variant="green" size="lg" onClick={onSubscribe}>Suscribirme</Btn>
        </div>
      </div>
    </div>
  );
}

function LegalPage({ kind, go }) {
  const isPriv = kind === "privacidad";
  const title = isPriv ? "Política de privacidad" : "Términos de uso";
  return (
    <div className="wrap" style={{ padding: "48px 32px 80px", maxWidth: 720 }}>
      <button type="button" onClick={() => go("#/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 14, color: C.green, marginBottom: 24, padding: 0 }}>← Inicio</button>
      <Eyebrow>CUPA Inspira</Eyebrow>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", color: C.red, margin: "12px 0 0" }}>{title}</h1>
      <div style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.65, color: C.brown, marginTop: 28 }}>
        {isPriv ? (
          <React.Fragment>
            <p>CUPA Inspira (Visiones AC) trata datos del padrón del Centro Urbano Presidente Alemán con el mínimo necesario.</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Qué datos pedimos</h2>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Nombre, edificio (letra), departamento y/o número de local.</li>
              <li>Correo o teléfono (al menos uno) para verificar y contactar.</li>
              <li>Si optas: si ofreces algo a la comunidad (directorio).</li>
            </ul>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Para qué</h2>
            <p>Confirmar que formas parte del CUPA (vecino, comercio o ambos), dar acceso a secciones de comunidad y, más adelante, la Gaceta por correo.</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Quién ve tus datos</h2>
            <p>Solo la mesa / Visiones en el panel interno. No publicamos departamento ni teléfono. El directorio solo muestra lo que tú marcas como oferta.</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Baja</h2>
            <p>Puedes pedir baja escribiendo a la mesa. También podemos revocar accesos que no correspondan al conjunto.</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>CUPA Inspira es un canal vecinal voluntario del Multifamiliar Presidente Alemán, impulsado por Visiones AC. No es el órgano de administración condominial oficial.</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Uso</h2>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>El registro es para vecinas/os, comercios del conjunto, o ambos.</li>
              <li>Debes dar datos veraces; accesos falsos pueden revocarse.</li>
              <li>Las secciones de comunidad requieren estatus activo.</li>
            </ul>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.red, margin: "28px 0 10px" }}>Responsabilidad</h2>
            <p>Las opiniones y ofertas entre vecinos son de quien las publica. Visiones AC facilita el canal; no garantiza tratos comerciales privados.</p>
          </React.Fragment>
        )}
        <p style={{ marginTop: 32, fontSize: 13.5, color: "var(--brown-soft)" }}>Actualizado julio 2026.</p>
      </div>
    </div>
  );
}

function PropuestasPage({ user, votes, onVote, comments, onComment }) {
  const list = window.PROYECTOS || [];
  const ideas = window.INICIATIVAS || [];
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Propuestas" title="¿Qué queremos hacer juntos?"
          intro="Proyectos en marcha e ideas que se están cocinando. Súmate o sigue el avance." />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontFamily: "var(--sans)", fontSize: 15, color: C.green }}>
          <IconCheck size={16} color={C.green} /> Sesión como <strong style={{ marginLeft: 2 }}>{user.name}</strong> · {user.building} {user.apt}
        </div>

        {list.length > 0 && (
          <React.Fragment>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, color: C.red, margin: "36px 0 0" }}>En marcha</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18, marginTop: 18 }}>
              {list.map((p) => (
                <article key={p.id} style={{ background: "#fffdf7", border: "1px solid var(--line)", borderRadius: 18, padding: "24px" }}>
                  <Tag color={p.phase === "gestion" ? C.green : "#b5701a"}>{p.status}</Tag>
                  <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, color: C.red, margin: "12px 0 0", lineHeight: 1.1 }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 16.5, lineHeight: 1.5, color: C.brown, margin: "10px 0 0" }}>{p.desc}</p>
                  {p.update && (
                    <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.45, color: "var(--brown-soft)", margin: "12px 0 0", padding: "12px 14px", background: "rgba(13,62,35,.06)", borderRadius: 12 }}>{p.update}</p>
                  )}
                  {p.cta_label && (
                    <div style={{ marginTop: 16 }}>
                      <Btn variant="green" size="sm" icon={false}
                        onClick={() => { if ((p.cta_href || "").startsWith("http")) window.open(p.cta_href, "_blank"); }}>
                        {p.cta_label}
                      </Btn>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </React.Fragment>
        )}

        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, color: C.red, margin: "44px 0 0" }}>Ideas en cocina</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 18 }}>
          {ideas.map((it) => (
            <IniciativaCard key={it.id} it={it} vote={votes[it.id]} onVote={onVote}
              comments={comments[it.id] || it.comments || []} onComment={onComment} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GateScreen, ProyectosPage, IniciativasPage, GacetaPage, LegalPage, VoteBtn, VotePill, IniciativaCard, PropuestasPage });

