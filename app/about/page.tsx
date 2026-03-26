import { PixelSeparator } from "@/components/pixel-separator";
import { AboutSection } from "@/components/about-section";
import { CareerTimeline } from "@/components/career-timeline";

export default function AboutPage() {
  return (
    <div className="pixel-grid min-h-screen">
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Get to know the person behind these pixels.
          </p>
        </div>

        <PixelSeparator />

        <AboutSection />

        <PixelSeparator />

        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">My Journey</h2>
            <p className="text-lg text-foreground/70">
              From RPG Maker maps to municipal tech — a timeline of passion, persistence, and pixels.
            </p>
          </div>
          <CareerTimeline />
        </div>
      </section>
    </div>
  );
}