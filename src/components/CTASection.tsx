"use client";

import Script from "next/script";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CTASection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only apply dark mode filter once the client has mounted and if resolvedTheme is dark
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section id="contact" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          className="serif-heading"
          style={{
            fontFamily: "'ethereal', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          Book a call
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            marginTop: "0.5rem",
          }}
        >
          Let's talk about how we can help you grow and distribute better.
        </p>
      </div>
      <div className="cta-widget-container">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/team-binarygrowth/30min?hide_gdpr_banner=1"
          style={{
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <style>{`
        .cta-widget-container {
          background: #ffffff;
          border-radius: 50px;
          max-width: 1060px;
          width: 70%;
          height: 660px;
          margin: 0 auto;
          overflow: hidden;
        }
        @media (max-width: 850px) {
          .cta-widget-container {
            width: 90%;
            border-radius: 28px;
            height: 600px;
          }
        }
        @media (max-width: 480px) {
          .cta-widget-container {
            width: 100%;
            border-radius: 16px;
            height: 560px;
          }
        }
      `}</style>
    </section>
  );
}
