"use client";

import { motion } from "framer-motion";

type EventType = "Project" | "Award" | "Education" | "Job" | "Freelance" | "Career Gap" | "Contract";

interface TimelineEvent {
  year: string;
  type: EventType;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  { year: "2006", type: "Project", title: "First Steps in Game Dev", description: "First experiences with game development using RPG Maker 2003 and RPG Maker XP (Ruby RGSS3)." },
  { year: "2009", type: "Award", title: "OBI — Brazilian Olympiad in Informatics", description: "Ranked in the top 10% of scores nationwide." },
  { year: "2009", type: "Project", title: "Dark Naruto Online", description: "Built a fully custom Open Tibia server themed around the Naruto anime. Peak of 60 simultaneous players online. Original server files preserved to this day." },
  { year: "2010 – 2013", type: "Education", title: "IFS — Instituto Federal de Sergipe", description: "High School with Technical Degree in Systems Development — Integrated program (3/4 completed, incomplete)." },
  { year: "2013 – 2016", type: "Education", title: "Universidade Tiradentes (UNIT)", description: "Bachelor's Degree in Graphic Design." },
  { year: "2013 – 2014", type: "Job", title: "I2 Consult — Trainee Web Designer", description: "Responsive design prototyping, branding, and front-end development with Bootstrap." },
  { year: "2015 – 2016", type: "Job", title: "AvatarB2B — Trainee Web Designer", description: "WordPress, PHP, responsive design prototyping, branding, and front-end development with Bootstrap." },
  { year: "2016", type: "Job", title: "MA9 — Trainee Web Designer", description: "Social media management, WordPress, PHP, responsive design prototyping, branding, and front-end development with Bootstrap." },
  { year: "2017", type: "Job", title: "AvatarB2B — Contract Web Designer", description: 'Interactive website for "O Melhor Bolo do Mundo" — heavy JavaScript, branding, and advertising campaigns.' },
  { year: "2018 – 2019", type: "Job", title: "SETUR-SE — Web Designer", description: 'Lead developer for the "Sergipe Sinta de Perto" tourism project. Stack: PHP, WordPress, Bootstrap.' },
  { year: "2020 – 2022", type: "Career Gap", title: "Professional Tattoo Artist", description: "Dedicated exclusively to a career as a professional tattoo artist." },
  { year: "2023 – 2024", type: "Education", title: "Alura — Tech Extension Courses", description: "One year of technology extension courses covering modern web development and software engineering." },
  { year: "2024", type: "Education", title: "Universidade Tiradentes", description: "Systems Analysis & Development — In Progress" },
  { year: "2025", type: "Freelance", title: "MazeOT", description: "Reverse engineering for the creation of an Open Tibia automation bot." },
  { year: "2025", type: "Contract", title: "Causso IT Solutions — Drakmora", description: "Open Tibia server development using TFS/OTX. Stack: C++, Lua, MySQL, Pixel Art." },
  { year: "2026", type: "Freelance", title: "Divine Gaming", description: "Pixel art creation — props, characters, and items." },
  { year: "2026", type: "Job", title: "Prefeitura Municipal de Aracaju — Current", description: "Developer and UI/UX Prototype Designer for municipal technology initiatives." },
];

const typeMeta: Record<EventType, { label: string; color: string; dot: string }> = {
  Project: { label: "Project", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500", dot: "bg-cyan-400" },
  Award: { label: "Award", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500", dot: "bg-yellow-400" },
  Education: { label: "Education", color: "bg-purple-500/20 text-purple-400 border-purple-500", dot: "bg-purple-400" },
  "Career Gap": { label: "Career Gap", color: "bg-foreground/10 text-foreground/50 border-foreground/30", dot: "bg-foreground/40" },
  Job: { label: "Job", color: "bg-primary/20 text-primary border-primary", dot: "bg-primary" },
  Freelance: { label: "Freelance", color: "bg-green-500/20 text-green-400 border-green-500", dot: "bg-green-400" },
  Contract: { label: "Contract", color: "bg-orange-500/20 text-orange-400 border-orange-500", dot: "bg-orange-400" },
};

const WORK_TYPES: EventType[] = ["Job", "Contract", "Freelance"];
const isWork = (t: EventType) => WORK_TYPES.includes(t);

export function CareerTimeline() {
  return (
    <div className="space-y-12">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs justify-center mb-12">
        {(Object.entries(typeMeta) as [EventType, typeof typeMeta[EventType]][]).map(([type, meta]) => (
          <span key={type} className={`px-2 py-0.5 border font-bold tracking-widest uppercase ${meta.color}`}>
            {meta.label}
          </span>
        ))}
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* The center line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[4px] bg-foreground/10 md:-translate-x-1/2" />

        <div className="space-y-8">
          {events.map((event, i) => {
            const isWorkEvent = isWork(event.type);
            const meta = typeMeta[event.type];

            return (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative flex items-center justify-between md:justify-normal w-full"
              >
                {/* Dot - Mobile is left-aligned, Desktop is centered */}
                <div
                  className={`absolute left-[7.5px] md:left-1/2 w-5 h-5 border-4 border-background ${meta.dot} md:-translate-x-1/2 z-10`}
                  style={{ boxShadow: "0 0 0 2px currentColor" }}
                />

                {/* Content wrapper */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isWorkEvent ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <div className={`border-2 border-foreground/20 p-5 bg-background/80 backdrop-blur hover:border-primary/50 transition-colors ${!isWorkEvent ? 'md:text-right' : 'text-left'}`}>

                    <div className={`flex flex-wrap items-center gap-2 mb-2 ${!isWorkEvent ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="font-bold text-primary font-mono text-sm">{event.year}</span>
                      <span className={`text-xs px-2 py-0.5 border font-bold tracking-widest uppercase ${meta.color}`}>
                        {meta.label}
                      </span>
                    </div>

                    <p className="font-bold text-foreground text-lg leading-snug mb-2">{event.title}</p>
                    <p className="text-foreground/70 text-sm leading-relaxed">{event.description}</p>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
