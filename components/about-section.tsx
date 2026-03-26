"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquareIcon, CodeIcon, PaintbrushIcon, GamepadIcon } from "lucide-react";

export function AboutSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative h-[700px] w-full">
            <div className="absolute inset-4 border-4 border-primary z-0"></div>
            <div className="absolute inset-0 pixel-card overflow-hidden">
              <Image
                src="/allanzinho.jpg"
                alt="Allan Rodrigues Portrait"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Hi, I&apos;m Creative Developer</h3>

          <p className="text-lg">
            I&apos;m a multidisciplinary developer with a background in both software development and graphic design. That combination shaped the way I build software — always focused on meeting core requirements while keeping the user experience at the center of every decision.
          </p>

          <p className="text-lg">
            I&apos;ve been passionate about games since I was 10, and that passion drives everything: from studying old console architectures to understand computing at its limits, to crafting immersive Games and Software solutions.
          </p>

          <div className="space-y-4 mt-8">
            <h4 className="text-xl font-bold">My Skills</h4>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="space-y-6">
                {[
                  { name: "Web Development", icon: <CodeIcon className="h-5 w-5" />, level: 100 },
                  { name: "UI/UX Design", icon: <PaintbrushIcon className="h-5 w-5" />, level: 100 },
                  { name: "Game Development", icon: <GamepadIcon className="h-5 w-5" />, level: 100 },
                  { name: "Communication", icon: <MessageSquareIcon className="h-5 w-5" />, level: 100 },
                ].map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 border-2 border-foreground px-3 h-10 bg-primary/10">
                      <span className="text-primary flex-shrink-0">{skill.icon}</span>
                      <span className="font-medium text-base">{skill.name}</span>
                    </div>
                    <div className="h-3 w-full bg-foreground/10 border-2 border-foreground dark:bg-foreground/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { name: "Reverse Engineering", icon: "🔍", level: 100 },
                  { name: "C++", icon: "⚙️", level: 100 },
                  { name: "Photoshop", icon: "🎨", level: 100 },
                  { name: "Pixel Art", icon: "🕹️", level: 100 },
                ].map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 border-2 border-foreground px-3 h-10 bg-primary/10">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-sm leading-none">{skill.icon}</span>
                      <span className="font-medium text-base">{skill.name}</span>
                    </div>
                    <div className="h-3 w-full bg-foreground/10 border-2 border-foreground dark:bg-foreground/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
