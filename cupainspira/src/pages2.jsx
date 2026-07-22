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
function ProyectosPage({ user, votes, onVote }) {
  return (
    <div style={{ paddingTop: 56, paddingBottom: 90 }}>
      <div className="wrap">
        <PageHead eyebrow="Proyectos" title="Propuestas en aprobación"
          intro="Proyectos elaborados por vecinos, en espera del visto bueno de la comunidad. Tu voto ayuda a decidir cuáles avanzan." />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontFamily: "var(--sans)", fontSize: 14, color: C.green }}>
          <IconCheck size={16} color={C.green} /> Sesión iniciada como <strong style={{ marginLeft: 2 }}>{user.name}</strong> · {user.building} {user.apt}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 24, marginTop: 36 }}>
          {PROYECTOS.map((p) => {
            const v = votes[p.id];
            const favor = p.favor + (v === "favor" ? 1 : 0);
            const contra = p.contra + (v === "contra" ? 1 : 0);
            const total = favor + contra;
            const pct = Math.round((favor / total) * 100);
            return (
              <article key={p.id} style={{ background: C.cream, border: "1px solid var(--line)", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 1px 0 rgba(91,74,54,.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Tag color="#b5701a">{p.status}</Tag>
                  <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--brown-soft)" }}>{total} votos</span>
                </div>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 27, color: C.red, margin: "16px 0 0", lineHeight: 1.08 }}>{p.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.56, color: C.brown, margin: "10px 0 0" }}>{p.desc}</p>
                {/* barra favor/contra */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
                    <span style={{ color: C.green }}>A favor {pct}%</span>
                    <span style={{ color: C.red }}>En contra {100 - pct}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: "rgba(122,20,16,.18)", overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${pct}%`, background: C.green, transition: "width .5s ease" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <VoteBtn active={v === "favor"} color={C.green} label="A favor" onClick={() => onVote(p.id, "favor")} />
                  <VoteBtn active={v === "contra"} color={C.red} label="En contra" down onClick={() => onVote(p.id, "contra")} />
                </div>
              </article>
            );
          })}
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

Object.assign(window, { GateScreen, ProyectosPage, IniciativasPage, GacetaPage, VoteBtn, VotePill, IniciativaCard });
