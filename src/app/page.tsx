import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { VideoSection } from "@/components/VideoSection";
import { ServicesSection } from "@/components/ServicesSection";

import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="page-glow" style={{ minHeight: "100vh", position: "relative" }}>
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeSection />
          <VideoSection />
          <ServicesSection />

          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
