"use client";

import { useState, useRef, useEffect } from "react";
import Video from "next-video";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

import phoebeVideo from "../../videos/phoebe's_testimonial.mp4.json";
import alecVideo from "../../videos/alec_burcham's_testimonial.mp4.json";
import ankitVideo from "../../videos/ankit's_testimonial.mp4.json";

const testimonials = [
  {
    quote:
      "His music selection and the standard of his editing skills are far superior to any other editor that I've ever worked with!",
    name: "Phoebe kuhn",
    role: "Founder, Writer, Human Design and Crypto Coach",
    video: phoebeVideo,
    playbackId: "nIW414nXsAR8TSj003JeHO2EJb2Sl7eAksidBqL01m6uc",
  },
  {
    quote:
      "We've seen an exponential growth which is bringing in consistent leads.",
    name: "Alec Burcham",
    role: "D1 Baseball Coach",
    video: alecVideo,
    playbackId: "01ll3n2odudQZ6kN02NGkOVp4VrHbFVRySJmMksiHIUkk",
  },
  {
    quote:
      "His Attention to details, creativity and ability to understand my vision are unmatched.",
    name: "Ankit Arora",
    role: "CEO, Deployemnt.io",
    video: ankitVideo,
    playbackId: "7QAcpP99eg4MLc3oppZJ3yP6HG02m1tUd5n1CI201f800Q",
  },
];

interface VideoCardProps {
  video: any;
  name: string;
  playbackId: string;
  isActive: boolean;
  isMobile: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

function TestimonialVideoPlayer({
  video,
  name,
  playbackId,
  isActive,
  isMobile,
  onActivate,
  onDeactivate,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Sync play/pause with isActive state (triggered by card hover on desktop or tap on mobile)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      el.play().catch(() => {
        // Fallback to muted autoplay if browser blocks unmuted playback
        el.muted = true;
        setIsMuted(true);
        el.play().catch(() => {});
      });
    } else {
      el.pause();
    }
  }, [isActive]);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=1`;

  return (
    <div
      className="testimonial-video-container"
      onClick={handleVideoClick}
      style={{ cursor: "pointer" }}
    >
      {/* Ambient blurred backdrop for letterboxed videos */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${posterUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(22px) brightness(0.45)",
          transform: "scale(1.2)",
          pointerEvents: "none",
        }}
      />

      {/* Video Element */}
      <Video
        ref={videoRef}
        src={video as any}
        poster={posterUrl}
        muted={isMuted}
        playsInline
        controls={false}
        loop
        onEnded={onDeactivate}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          zIndex: 1,
        }}
      />

      {/* Center Play button: visible by default, smoothly hides when playing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
          opacity: isActive ? 0 : 1,
          transform: isActive ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(10, 10, 10, 0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Play size={20} fill="currentColor" style={{ marginLeft: "3px" }} />
        </div>
      </div>

      {/* Mute/Unmute Toggle in bottom right when video is active */}
      {isActive && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "0.75rem",
            right: "0.75rem",
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "white",
            padding: "0.45rem",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}
    </div>
  );
}

export function TestimonialsSection() {
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || window.matchMedia("(hover: none)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="work"
      className="section-pad"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9f9f9f",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Client Stories
        </span>
        <h2
          className="serif-heading"
          style={{
            fontFamily: "'ethereal', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "0.07em",
          }}
        >
          What Our Clients{" "}
          <em className="say-gradient" style={{ fontStyle: "italic" }}>
            Say
          </em>
        </h2>
      </div>

      <div className="testimonial-list">
        {testimonials.map((t, i) => {
          const isCardActive = activePlayingIndex === i;

          return (
            <div
              key={i}
              className={`card testimonial-card testimonial-card-inner ${isCardActive ? "active" : ""}`}
              onMouseEnter={() => {
                if (!isMobile) {
                  setActivePlayingIndex(i);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  if (activePlayingIndex === i) {
                    setActivePlayingIndex(null);
                  }
                }
              }}
            >
              {/* Left: Video Card */}
              <TestimonialVideoPlayer
                video={t.video}
                name={t.name}
                playbackId={t.playbackId}
                isActive={isCardActive}
                isMobile={isMobile}
                onActivate={() => setActivePlayingIndex(i)}
                onDeactivate={() => {
                  if (activePlayingIndex === i) setActivePlayingIndex(null);
                }}
              />

              {/* Right: Review Content */}
              <div className="testimonial-content-container">
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .testimonial-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .testimonial-card-inner {
          padding: 1.5rem;
          display: flex;
          flex-direction: row;
          gap: 2rem;
          align-items: stretch;
        }
        .testimonial-video-container {
          width: 240px;
          aspect-ratio: 9/16;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-content-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .testimonial-card-inner {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            text-align: center;
          }
          .testimonial-video-container {
            width: 100%;
            max-width: 260px;
          }
          .testimonial-content-container {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
