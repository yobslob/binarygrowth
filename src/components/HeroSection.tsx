"use client";

import { useState } from "react";

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(true);
  const [fadeVideoOut, setFadeVideoOut] = useState(false);

  const handleVideoEnd = () => {
    setFadeVideoOut(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 500);
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >

      {showVideo && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            transition: "opacity 0.5s ease",
            opacity: fadeVideoOut ? 0 : 1,
            width: "100%",
            maxWidth: "800px",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              background: "var(--border)",
            }}
          >
            <video
              src="/Intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              style={{
                width: "100%",
                height: "auto",
                display: "block"
              }}
            />
          </div>
        </div>
      )}

      {!showVideo && (
        <>
          {/* Radial glow behind text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "900px",
              height: "600px",
              background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
              animation: "heroFadeIn 2s ease-in forwards",
              opacity: 0
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "900px",
              padding: "0 1.5rem",
            }}
          >
            {/* Main headline */}
            <h1
              style={{
                fontFamily: "'ethereal', serif",
                fontSize: "clamp(2.2rem, 8vw, 4.0rem)",
                fontWeight: 100,
                lineHeight: 1.05,
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ animation: "heroFadeIn 1.8s ease-in forwards", opacity: 0 }}>
                Grow with
              </span>{" "}
              <span
                className="text-gradient-custom"
                style={{
                  animation: "heroFadeIn 2.2s ease-in forwards",
                  opacity: 0,
                  display: "inline-block"
                }}
              >
                Binary
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "clamp(0.8rem, 2vw, 1.0rem)",
                color: "var(--text-secondary)",
                maxWidth: "580px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.65,
                fontWeight: 400,
                animation: "heroFadeIn 2.8s ease-in forwards",
                opacity: 0
              }}
            >
              We help Entrepreneurs start and grow their personal brands, whether by starting a new brand or optimizing an existing one.
            </p>
          </div>
        </>
      )}

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
