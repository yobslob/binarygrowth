"use client";

import { useState, useRef, useEffect } from "react";
import Video from "next-video";
import glimpse from "../../videos/Glimpse.mp4.json";

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.warn("Autoplay with audio blocked by browser, muting and playing:", error);
                setIsMuted(true);
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.play().catch(() => {});
                }
              });
            }
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <section
      className="section-pad video-section"
      style={{
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        ref={containerRef}
        className="card video-card"
        style={{
          position: "relative",
          cursor: "pointer",
        }}
        onClick={toggleMute}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Video
          ref={videoRef}
          src={glimpse as any}
          muted={isMuted}
          playsInline
          controls={false}
          autoPlay
          loop
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "16/9",
            objectFit: "cover",
            background: "var(--bg-card)",
          }}
        />

        {/* Volume button overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "1.5rem",
            background: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "0.6rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            backdropFilter: "blur(4px)",
          }}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </div>
      </div>
      <style>{`
        .video-section {
          max-width: 900px;
          margin: 0 auto;
        }
        .video-card {
          padding: 0;
          overflow: hidden;
          border-radius: 20px;
          position: relative;
        }
        @media (max-width: 640px) {
          .video-card {
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}
