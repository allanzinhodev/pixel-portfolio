import Image from "next/image";
import { PixelSeparator } from "@/components/pixel-separator";
import { AboutSection } from "@/components/about-section";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My Journey</h2>

            <p className="text-lg">
              I'm a developer with a multidisciplinary background in software development and graphic design. I've been creating games since I was 10 years old, and that passion has only grown stronger over the years. Now at 31, I focus on building immersive online game experiences using C++.
            </p>

            <p className="text-lg">
              Games have always been the foundation of everything I've learned. In art, my references were always game artists — from pixel art pioneers to concept artists shaping modern titles. In programming, I've always been drawn to understanding how games were built, studying the history and mechanics behind them since the very beginning of the medium. Every skill I've developed traces back to that same core passion.
            </p>

            <p className="text-lg">
              My approach to computer science is deeply rooted in the past. Old consoles and their hardware architecture are my greatest source of study — understanding how those machines worked at their limits is what drives my curiosity and shapes the way I think about software, performance, and design to this day.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 pixel-card overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Working on designs"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <div className="relative h-48 pixel-card overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Coding session"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <div className="relative h-48 pixel-card overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Design workshop"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <div className="relative h-48 pixel-card overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Speaking at conference"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}