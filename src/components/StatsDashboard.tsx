"use client";

import { useEffect, useState } from "react";

export function StatsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [session, setSession] = useState({ duration: 0, pageViews: 0 });
  const [liveUsers, setLiveUsers] = useState(12);

  // Sync state with LocalStorage when open
  const loadStats = () => {
    if (typeof window !== "undefined") {
      const storedEvents = JSON.parse(localStorage.getItem("bg_analytics_events") || "[]");
      const storedSession = JSON.parse(localStorage.getItem("bg_analytics_session") || "{}");
      setEvents([...storedEvents].reverse()); // Newest first
      setSession({
        duration: storedSession.duration || 0,
        pageViews: storedSession.pageViews || 0,
      });
    }
  };

  useEffect(() => {
    // Listen for Ctrl+Shift+A key combo
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Listen for manual trigger events (e.g. from footer)
    const handleOpenTrigger = () => {
      setIsOpen(true);
    };

    // Listen for analytics changes to refresh real-time log
    const handleAnalyticsUpdate = () => {
      if (isOpen) loadStats();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-stats-dashboard", handleOpenTrigger);
    window.addEventListener("bg_analytics_update", handleAnalyticsUpdate);

    // Randomly fluctuate live users to simulate real-time activity
    const liveInterval = setInterval(() => {
      setLiveUsers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.max(5, Math.min(25, prev + change));
      });
    }, 4000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-stats-dashboard", handleOpenTrigger);
      window.removeEventListener("bg_analytics_update", handleAnalyticsUpdate);
      clearInterval(liveInterval);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      loadStats();
      document.body.style.overflow = "hidden"; // Lock page scroll
    } else {
      document.body.style.overflow = ""; // Unlock
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleClearLogs = () => {
    if (window.bgAnalytics) {
      window.bgAnalytics.clearEvents();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(3, 3, 3, 0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(1rem, 4vw, 2.5rem)",
        overflowY: "auto",
        animation: "dashFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Top bar header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "1.25rem",
          marginBottom: "2rem",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.25rem",
              fontWeight: 400,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Binary Growth <span style={{ fontStyle: "italic", color: "var(--accent, #c9a84c)" }}>Console</span>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "99px",
              padding: "0.2rem 0.65rem",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#4ade80",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                animation: "dashPulse 2s infinite",
              }}
            />
            LIVE MONITOR
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            padding: "0.5rem 1.1rem",
            borderRadius: "99px",
            fontSize: "0.72rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          Close Console [ESC]
        </button>
      </header>

      {/* Main dashboard stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
          flexShrink: 0,
        }}
      >
        {/* Metric 1: Live Sessions */}
        <div className="dash-card">
          <span className="dash-card-label">Active Creators</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="dash-card-value">{liveUsers}</span>
            <span style={{ color: "#4ade80", fontSize: "0.75rem", fontWeight: 600 }}>Simulated live</span>
          </div>
          {/* Custom micro SVG graph */}
          <svg viewBox="0 0 100 20" style={{ width: "100%", height: "20px", marginTop: "0.75rem", stroke: "#4ade80", strokeWidth: 1.5, fill: "none" }}>
            <path d="M0,10 Q10,15 20,8 T40,12 T60,5 T80,15 T100,8" />
          </svg>
        </div>

        {/* Metric 2: Page Views */}
        <div className="dash-card">
          <span className="dash-card-label">Core Page Views</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="dash-card-value">{session.pageViews}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              (Total: {(session.pageViews * 118 + 14450).toLocaleString()})
            </span>
          </div>
          <svg viewBox="0 0 100 20" style={{ width: "100%", height: "20px", marginTop: "0.75rem", stroke: "var(--accent, #c9a84c)", strokeWidth: 1.5, fill: "none" }}>
            <path d="M0,18 L15,14 L30,15 L45,9 L60,11 L75,5 L90,6 L100,2" />
          </svg>
        </div>

        {/* Metric 3: Active Time */}
        <div className="dash-card">
          <span className="dash-card-label">Active Session Duration</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="dash-card-value">{formatDuration(session.duration)}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>MM:SS</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", height: "4px", borderRadius: "99px", width: "100%", marginTop: "1.25rem", overflow: "hidden" }}>
            <div style={{ background: "var(--accent, #c9a84c)", height: "100%", width: `${Math.min(100, (session.duration / 300) * 100)}%`, transition: "width 0.5s ease" }} />
          </div>
        </div>

        {/* Metric 4: Simulated Conversions */}
        <div className="dash-card">
          <span className="dash-card-label">Conversion Rate</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="dash-card-value">4.82%</span>
            <span style={{ color: "#a855f7", fontSize: "0.75rem", fontWeight: 600 }}>+1.2% MoM</span>
          </div>
          <svg viewBox="0 0 100 20" style={{ width: "100%", height: "20px", marginTop: "0.75rem", stroke: "#a855f7", strokeWidth: 1.5, fill: "none" }}>
            <path d="M0,15 Q20,15 40,11 T80,4 T100,2" />
          </svg>
        </div>
      </div>

      {/* Grid: Events log vs charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "1.5rem",
          flexGrow: 1,
          minHeight: "350px",
        }}
      >
        {/* Left Column: Live event logs */}
        <div
          style={{
            background: "rgba(12,12,12,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "500px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
              Real-Time Interaction Logs
            </h3>
            <button
              onClick={handleClearLogs}
              style={{
                background: "transparent",
                border: "none",
                color: "#ef4444",
                fontSize: "0.7rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Clear Local Logs
            </button>
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              paddingRight: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {events.length === 0 ? (
              <div style={{ margin: "auto", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center" }}>
                No events captured yet. <br />
                <span style={{ fontSize: "0.72rem" }}>Scroll the page or click links to log events.</span>
              </div>
            ) : (
              events.map((evt) => {
                const time = new Date(evt.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={evt.id}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.03)",
                      borderRadius: "8px",
                      padding: "0.6rem 0.8rem",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)" }}>
                      <span>[{time}]</span>
                      <span
                        style={{
                          fontWeight: 700,
                          color:
                            evt.name === "Page View"
                              ? "#3b82f6"
                              : evt.name === "Scroll Depth"
                              ? "#10b981"
                              : "#a855f7",
                        }}
                      >
                        {evt.name.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.85)" }}>
                      {evt.name === "CTA Click" ? (
                        <span>
                          Clicked <strong>{evt.data.text}</strong> ({evt.data.element}) → {evt.data.destination}
                        </span>
                      ) : evt.name === "Scroll Depth" ? (
                        <span>Reached {evt.data.depth} of page length</span>
                      ) : evt.name === "Page View" ? (
                        <span>Loaded route {evt.data.path} (Referrer: {evt.data.referrer})</span>
                      ) : (
                        <span>{JSON.stringify(evt.data)}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Corporate Growth Analytics */}
        <div
          style={{
            background: "rgba(12,12,12,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            overflowY: "auto",
            maxHeight: "500px",
          }}
        >
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", margin: 0 }}>
            Enterprise Growth Metrics (Mock Corporate Stats)
          </h3>

          {/* Traffic growth curve */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>Traffic Growth (Last 6 Months)</span>
              <span style={{ fontSize: "0.72rem", color: "#4ade80", fontWeight: 600 }}>+42.8% Average</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "10px", padding: "0.5rem" }}>
              <svg viewBox="0 0 300 80" style={{ width: "100%", height: "80px", overflow: "visible" }}>
                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent, #c9a84c)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent, #c9a84c)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
                
                {/* Area path */}
                <path d="M 0 70 Q 50 65 100 50 T 200 35 T 300 15 L 300 80 L 0 80 Z" fill="url(#gradient-area)" />
                {/* Line path */}
                <path d="M 0 70 Q 50 65 100 50 T 200 35 T 300 15" fill="none" stroke="var(--accent, #c9a84c)" strokeWidth="2.5" />
                
                {/* Nodes */}
                <circle cx="0" cy="70" r="3.5" fill="#000" stroke="var(--accent, #c9a84c)" strokeWidth="1.5" />
                <circle cx="100" cy="50" r="3.5" fill="#000" stroke="var(--accent, #c9a84c)" strokeWidth="1.5" />
                <circle cx="200" cy="35" r="3.5" fill="#000" stroke="var(--accent, #c9a84c)" strokeWidth="1.5" />
                <circle cx="300" cy="15" r="3.5" fill="#000" stroke="var(--accent, #c9a84c)" strokeWidth="1.5" />

                {/* X labels */}
                <text x="5" y="78" fill="rgba(255,255,255,0.4)" fontSize="7">Dec</text>
                <text x="102" y="78" fill="rgba(255,255,255,0.4)" fontSize="7">Feb</text>
                <text x="202" y="78" fill="rgba(255,255,255,0.4)" fontSize="7">Apr</text>
                <text x="275" y="78" fill="rgba(255,255,255,0.4)" fontSize="7">Current</text>
              </svg>
            </div>
          </div>

          {/* Traffic Sources Horizontal Bars */}
          <div>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "0.6rem" }}>
              Traffic Acquisition Sources
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { name: "Organic Search", percent: 45, color: "#c9a84c" },
                { name: "Direct Traffic", percent: 28, color: "#a855f7" },
                { name: "Social Media", percent: 15, color: "#3b82f6" },
                { name: "Ref / Other", percent: 12, color: "#10b981" },
              ].map((src) => (
                <div key={src.name} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{src.name}</span>
                    <span style={{ fontWeight: 600 }}>{src.percent}%</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", height: "5px", borderRadius: "99px", width: "100%", overflow: "hidden" }}>
                    <div style={{ background: src.color, height: "100%", width: `${src.percent}%`, borderRadius: "99px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>    </div>
  );
}
