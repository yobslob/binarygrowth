const metrics = [
  {
    value: "2B+",
    label: "Views Generated",
    detail: "Across all client channels combined",
  },
  {
    value: "30K+",
    label: "Videos Produced",
    detail: "Long-form, short-form, and everything in between",
  },
  {
    value: "480+",
    label: "Relationships Built",
    detail: "Creators, brands, and partners in our network",
  },
];

export function MetricsSection() {
  return (
    <section
      id="about"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, var(--glow), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg)",
              padding: "3rem 2rem",
              textAlign: "center",
              position: "relative",
              transition: "background 0.3s",
            }}
            className="metric-card"
          >
            <div className="stat-number text-gradient-gold" style={{ marginBottom: "0.5rem" }}>
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {m.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
