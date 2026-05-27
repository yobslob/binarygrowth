const testimonials = [
  {
    quote:
      "His music selection and the standard of his editing skills are far superior to any other editor that I've ever worked with!",
    name: "Phoebe kuhn",
    role: "Founder, Writer, Human Design and Crypto Coach",
    videoUrl: "https://player.vimeo.com/video/1145460765?title=0&byline=0&portrait=0&badge=0&loop=1&quality=1080p",
  },
  {
    quote:
      "We've seen an exponential growth which is bringing in consistent leads.",
    name: "Alec Burcham",
    role: "D1 Baseball Coach",
    videoUrl: "https://player.vimeo.com/video/1195794515?title=0&byline=0&portrait=0&badge=0&loop=1&quality=1080p",
  },
  {
    quote:
      "His Attention to details, creativity and ability to understand my vision are unmatched.",
    name: "Ankit Arora",
    role: "CEO, Deployemnt.io",
    videoUrl: "https://player.vimeo.com/video/1195794514?title=0&byline=0&portrait=0&badge=0&loop=1&quality=1080p",
  },
];

export function TestimonialsSection() {
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
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="card testimonial-card testimonial-card-inner"
          >
            {/* Left: Video Placeholder */}
            <div className="testimonial-video-container">
              <iframe
                src={t.videoUrl}
                allow="autoplay; fullscreen; picture-in-picture"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block"
                }}
                title={`${t.name} Testimonial Video`}
              />
            </div>

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
        ))}
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
          background: var(--bg);
          position: relative;
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
