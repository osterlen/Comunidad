/* CUPA Inspira — logotipo
   Marca: retoño de dos hojas en los colores de la gaceta (#7a1410 rojo, #0d3e23 verde).
   Wordmark: "CUPA" (serif, peso) + "Inspira" (serif italic).
   Variantes: horizontal (nav), stacked (hero/footer), mark (solo símbolo). */

function SproutMark({ size = 44, red = "#7a1410", green = "#0d3e23", stem }) {
  const stemColor = stem || green;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      {/* stem */}
      <path d="M24 43 C24 36 23.4 30 23.6 24.5" stroke={stemColor} strokeWidth="2.6" strokeLinecap="round" />
      {/* left leaf — rojo */}
      <path d="M23.4 27.2 C16.8 28.6 10.6 25.2 7.2 17.8 C14.6 15.4 21.4 18.6 23.4 27.2 Z" fill={red} />
      {/* right leaf — verde */}
      <path d="M23.8 24.2 C23.2 16.4 27 9.2 35.6 7 C37.8 15.2 33.6 23 23.8 24.2 Z" fill={green} />
      {/* seed dot */}
      <circle cx="23.8" cy="42.4" r="1.9" fill={stemColor} />
    </svg>
  );
}

function Logo({ variant = "horizontal", onCream = true, mono, size }) {
  // color resolution
  const red = mono || "#7a1410";
  const green = mono || "#0d3e23";
  const word1Color = mono || "#7a1410";
  const word2Color = mono || "#0d3e23";

  if (variant === "mark") {
    return <SproutMark size={size || 48} red={red} green={green} mono={mono} />;
  }

  if (variant === "stacked") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <SproutMark size={size || 66} red={red} green={green} />
        <div style={{ textAlign: "center", lineHeight: 0.92 }}>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: (size || 66) * 0.46, letterSpacing: "0.02em", color: word1Color }}>CUPA</div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, fontSize: (size || 66) * 0.42, color: word2Color, marginTop: 2 }}>Inspira</div>
        </div>
      </div>
    );
  }

  // horizontal
  const fs = size || 24;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: fs * 0.42 }}>
      <SproutMark size={fs * 1.7} red={red} green={green} />
      <div style={{ display: "flex", alignItems: "baseline", gap: fs * 0.28, lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: fs, letterSpacing: "0.02em", color: word1Color }}>CUPA</span>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, fontSize: fs * 0.96, color: word2Color }}>Inspira</span>
      </div>
    </div>
  );
}

Object.assign(window, { SproutMark, Logo });
