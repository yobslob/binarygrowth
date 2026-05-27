"use client";

const row1 = [
  { name: "Andy Stauring", image: "/andy.jpg", abbr: "AS" },
  { name: "Phoebe", image: "/phoebe.jpg", abbr: "PH" },
  { name: "Alec Burcham", image: "/alec.jpg", abbr: "AB" },
  { name: "David Ambhorgini", image: "/david.jpg", abbr: "DA" },
  { name: "Serge Gatauri", image: "/serge.jpg", abbr: "SG" },
  { name: "Ankit Arora", image: "/ankit.jpg", abbr: "AA" },
  { name: "Kenneth Corbin", image: "/kenneth.jpg", abbr: "KC" },
  { name: "Dominy kas", image: "/dominy.jpg", abbr: "DK" },
  { name: "Yorgen", image: "/yorgen.jpg", abbr: "YG" },
  { name: "Naz", image: "/naz.jpg", abbr: "NZ" },
  { name: "Omar", image: "/omar.jpg", abbr: "OM" },
];

const row2 = [
  { name: "Wilbe Engine Limited", image: "/wilbe.png", abbr: "WE" },
  { name: "Impact venture capitals", image: "/ivc.jpg", abbr: "IV" },
  { name: "Ambitious minds podcast", image: "/amp.jpg", abbr: "AM" },
];

function LogoItem({ name, abbr, image }: { name: string; abbr?: string; image?: string }) {
  return (
    <div
      className="marquee-item"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = "1";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = "0.65";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      <div className="marquee-logo-box">
        {image ? (
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          abbr
        )}
      </div>
      <span className="marquee-logo-text">
        {name}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "var(--border-strong)",
        flexShrink: 0,
        alignSelf: "center",
      }}
    />
  );
}

export function MarqueeSection() {
  const finalRow1 = [...row1, ...row1, ...row1, ...row1];
  const finalRow2 = [...row2, ...row2, ...row2, ...row2, ...row2, ...row2];

  return (
    <section
      style={{
        padding: "3rem 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "100%",
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "100%",
          background: "linear-gradient(to left, var(--bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        Trusted by the best
      </div>

      {/* Row 1 — left */}
      <div style={{ overflow: "hidden", marginBottom: "0.75rem" }}>
        <div className="marquee-track-left">
          {finalRow1.map((logo, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <LogoItem {...logo} />
              {i < finalRow1.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track-right">
          {finalRow2.map((logo, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <LogoItem {...logo} />
              {i < finalRow2.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem 2.5rem;
          flex-shrink: 0;
          opacity: 0.90;
          transition: opacity 0.3s ease, transform 0.3s ease;
          cursor: default;
        }
        .marquee-logo-box {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .marquee-logo-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--text-primary);
          white-space: nowrap;
          text-align: center;
        }
        @media (max-width: 768px) {
          .marquee-item {
            gap: 0.6rem;
            padding: 0.75rem 1.25rem;
          }
          .marquee-logo-box {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            font-size: 1.15rem;
          }
          .marquee-logo-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
