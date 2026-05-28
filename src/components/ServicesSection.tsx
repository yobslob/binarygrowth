"use client";

import { useEffect, useRef, useState } from "react";
import Video from "next-video";
import Link from "next/link";

import he1 from "../../videos/he1_the_real_me.mp4.json";
import he2 from "../../videos/he2_whyre_u_always_smiling.mp4.json";
import he4 from "../../videos/Brez V4.mp4.json"

import pod1 from "../../videos/pod1_Ben_Chestnut.mp4.json";
import pod4 from "../../videos/pod4_the_ambitious_mind_trailer.mp4.json";
import pod5 from "../../videos/pod5_trailer_Impact_venture_capital.mp4.json";
import pod6 from "../../videos/Wilbe Trailer.mp4.json"

import lun1 from "../../videos/aiff.mp4.json";

const metrics = [
  { value: "86", label: "Videos Created" },
  { value: "400M+", label: "Engagement Pool" },
  { value: "288k+", label: "Hours of watchtime" },
];

const services = [
  {
    num: "01",
    title: "Podcasting",
    videos: [pod1, pod6, pod4, pod5],
    layout: "2x2",
    subheading: "Show up, speak, and leave the rest to us. We handle the research, production, and distribution so you can focus entirely on the conversation."
  },
  {
    num: "02",
    title: "Brand Launch Videos",
    videos: [lun1],
    layout: "1x1",
    subheading: "High-stakes visuals for high-stakes moments. We engineer cinematic launch assets designed to close rounds, capture markets, and freeze the timeline."
  },
  {
    num: "03",
    title: "Content Clipping",
    videos: [he1, he2, he4],
    layout: "3x1",
    subheading: "Maximum yield from every recording. We turn one hour of your time into a month's worth of relentless, high-performing social distribution."
  },
];

export function ServicesSection() {
  const [activeCard, setActiveCard] = useState<string>("01");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isMetricsVisible, setIsMetricsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const cards = sectionRef.current.querySelectorAll('.card');
          if (cards.length >= 2) {
            const viewportCenter = window.innerHeight / 2;
            const centers = Array.from(cards).map(card => {
              const rect = card.getBoundingClientRect();
              return rect.top + rect.height / 2;
            });

            let progress = 0;
            const numCards = centers.length;

            if (viewportCenter <= centers[0]) {
              progress = 0;
            } else if (viewportCenter >= centers[numCards - 1]) {
              progress = 1;
            } else {
              for (let i = 0; i < numCards - 1; i++) {
                if (viewportCenter > centers[i] && viewportCenter <= centers[i + 1]) {
                  const segmentProgress = (viewportCenter - centers[i]) / (centers[i + 1] - centers[i]);
                  progress = (i + segmentProgress) / (numCards - 1);
                  break;
                }
              }
            }
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsSectionVisible(true);
          }, 150);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSectionVisible) {
      const scrollerTimer = setTimeout(() => {
        setIsScrollerVisible(true);
      }, 300);
      const metricsTimer = setTimeout(() => {
        setIsMetricsVisible(true);
      }, 1000);

      return () => {
        clearTimeout(scrollerTimer);
        clearTimeout(metricsTimer);
      };
    }
  }, [isSectionVisible]);

  return (
    <section ref={sectionRef} id="services" style={{ position: "relative" }}>
      {/* Sticky Background, Header, and Scroller Container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Centered Background & Text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          {/* Subtle background glow for the sticky area */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "500px",
              background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 60%)",
            }}
          />

          <div style={{
            marginBottom: "1rem",
            opacity: isSectionVisible ? 1 : 0,
            transform: isSectionVisible ? "scale(1)" : "scale(1.5)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <span
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              What We Do
            </span>
          </div>

          {/* <h2
            className="serif-heading"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "600px",
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}
          >
            Services Built for{" "}
            <em className="text-gradient-custom" style={{ fontStyle: "italic" }}>
              Scale
            </em>
          </h2> */}
          {/* <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "450px",
              lineHeight: 1.65,
            }}
          >
            Every service is engineered to produce compounding returns — not just
            vanity metrics. Keep scrolling to explore.
          </p> */}
        </div>

        {/* Left-side Sticky Scroller */}
        <div
          className="services-scroller"
          style={{
            opacity: isScrollerVisible ? 1 : 0,
          }}
        >
          {(() => {
            const maxIndex = services.length - 1;
            const x = scrollProgress * maxIndex;
            let topX = 0;
            let bottomX = 0;

            if (x <= 0.5) {
              topX = 0;
              bottomX = x * 2;
            } else if (x >= maxIndex - 0.5) {
              topX = maxIndex - (maxIndex - x) * 2;
              bottomX = maxIndex;
            } else {
              topX = x - 0.5;
              bottomX = x + 0.5;
            }

            const topPercent = topX / maxIndex;
            const bottomPercent = bottomX / maxIndex;

            return (
              <>
                {/* Background Track */}
                <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "22px", bottom: "22px", width: "2px", backgroundColor: "var(--border)", zIndex: 0 }} />
                {/* Foreground Track (Golden) */}
                <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: `calc(22px + (100% - 44px) * ${topPercent})`, height: `calc((100% - 44px) * ${bottomPercent - topPercent})`, width: "2px", backgroundColor: "var(--accent)", zIndex: 1 }} />

                {services.map((svc, index) => {
                  const nodePercent = index / maxIndex;
                  const isActive = nodePercent >= topPercent - 0.001 && nodePercent <= bottomPercent + 0.001;
                  return (
                    <div
                      key={svc.num}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: isActive ? "2px solid var(--accent)" : "2px solid var(--border)",
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                        backgroundColor: "var(--bg)",
                        boxShadow: isActive ? "0 0 15px rgba(201,168,76,0.4)" : "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        transition: "all 0.5s ease",
                      }}
                    >
                      {parseInt(svc.num)}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>

        {/* Right-side Sticky Metrics */}
        {/* <div
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            pointerEvents: "auto",
            opacity: isMetricsVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {metrics.map((m, i) => {
            const isVisible = parseInt(activeCard) >= i + 1;
            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  minWidth: "220px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  className="stat-number text-gradient-custom"
                  style={{
                    marginBottom: "0.25rem",
                    fontSize: "2.8rem",
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em"
                  }}
                >
                  {m.label}
                </div>
              </div>
            );
          })}
        </div> */}
      </div>

      {/* Scrolling Cards Container */}
      {/* Scrolling Cards Container */}
      <div className="services-cards-container">
        {services.map((svc) => (
          <ServiceCard key={svc.num} {...svc} onActive={setActiveCard} />
        ))}
      </div>
      <style>{`
        .services-scroller {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          pointer-events: auto;
          z-index: 10;
          transition: opacity 0.7s ease;
        }
        .services-cards-container {
          position: relative;
          z-index: 10;
          margin-top: 20vh;
          padding-bottom: 20vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15vh;
        }
        @media (max-width: 1024px) {
          .services-scroller {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .services-cards-container {
            margin-top: 10vh;
            padding-bottom: 10vh;
            gap: 8vh;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({
  num,
  title,
  videos,
  layout,
  subheading,
  onActive,
}: {
  num: string;
  title: string;
  videos: any[];
  layout?: string;
  subheading?: string;
  onActive: (num: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onActive(num);
            videoRefs.current.forEach((v) => v?.play().catch(() => { }));
          } else {
            videoRefs.current.forEach((v) => v?.pause());
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [num, onActive]);

  return (
    <div
      ref={containerRef}
      className="card service-card"
    >
      <div className="service-card-header">
        <h3 className="serif-heading service-card-title">
          {title}
        </h3>
        <span className="service-card-num">{num}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Videos Container */}
        <div className={`video-layout-${layout}`}>
          {videos.map((videoObj, i) => (
            <div
              key={i}
              className={`video-wrapper-${layout}`}
            >
              <Video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={videoObj}
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>
          ))}
        </div>

        {subheading && (
          <div
            style={{
              textAlign: "left",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 400,
              color: "#9f9f9f",
              marginTop: "0.5rem"
            }}
          >
            {subheading}
          </div>
        )}
        <div style={{ marginTop: "1.2rem", textAlign: "left" }}>
          <Link
            href={
              num === "01"
                ? "/podcasting"
                : num === "02"
                ? "/launch-videos"
                : "/clipping"
            }
            className="view-more-link"
          >
            View More
            <span className="arrow-icon">↗</span>
          </Link>
        </div>
      </div>

      <style>{`
        .view-more-link {
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          gap: 0.4rem;
          cursor: pointer;
        }
        .view-more-link:hover {
          color: #ffffff;
        }
        .view-more-link:hover .arrow-icon {
          transform: translate(2px, -2px);
        }
        .arrow-icon {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .service-card {
          width: 90%;
          max-width: 900px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
          overflow: hidden;
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 0 5px rgba(254, 254, 254, 0.3), 0 30px 60px rgba(0,0,0,0.5);
          border: 0.5px solid #3f3f3f;
          border-radius: 24px;
        }
        .service-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }
        .service-card-title {
          font-family: 'Ethereal', serif;
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.06em;
          color: var(--text-primary);
        }
        .service-card-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.5rem;
          color: #9e7e13;
          font-weight: 600;
        }
        
        /* Layout classes */
        .video-layout-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          width: 100%;
        }
        .video-layout-1x1 {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .video-layout-3x1 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
        }

        .video-wrapper-2x2 {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: var(--bg);
          position: relative;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .video-wrapper-1x1 {
          width: 75%;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: var(--bg);
          position: relative;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .video-wrapper-3x1 {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 9/16;
          background: var(--bg);
          position: relative;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }

        @media (max-width: 768px) {
          .service-card {
            padding: 2rem;
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .service-card {
            width: 95%;
            padding: 1.25rem;
            gap: 1.25rem;
            border-radius: 16px;
          }
          .service-card-header {
            padding-bottom: 1rem;
          }
          .service-card-title {
            font-size: 1.45rem;
          }
          .service-card-num {
            font-size: 1.2rem;
          }
          .video-layout-2x2 {
            grid-template-columns: 1fr;
          }
          .video-layout-3x1 {
            gap: 0.5rem;
          }
          .video-wrapper-1x1 {
            width: 100%;
          }
          .video-wrapper-2x2, .video-wrapper-1x1, .video-wrapper-3x1 {
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
}
