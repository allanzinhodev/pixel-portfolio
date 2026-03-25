import Image from "next/image";
import Link from "next/link";
import { PixelSeparator } from "@/components/pixel-separator";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechStackDiagram } from "@/components/tech-stack-diagram";

// Sample works data (in a real app, this would come from a database)
const works = {
  "sertania-online": {
    title: "Sertania Online",
    description: "A custom multiplayer online RPG built on open-source technologies.",
    content: "",
    imageUrl: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["C++", "Game Server", "MMORPG"],
    link: "https://sertania.example.com"
  },
  "burger-bytes": {
    title: "Burger Bytes",
    description: "A fast-food ordering system with a delightful pixel art interface.",
    content: `
      Burger Bytes is a modern food ordering platform that stands out with its unique pixel art interface, making the ordering process both fun and efficient.

      The project demonstrates how retro-style visuals can enhance user experience in practical applications, creating memorable interactions for customers.

      Key Features:

      1. Interactive Menu
      2. Real-time Order Tracking
      3. Custom Order Builder
      4. Loyalty Program
      5. Mobile-first Design

      Technical Stack:

      - Next.js for the frontend
      - Supabase for backend services
      - Stripe for payments
      - PWA support
      - Real-time notifications
    `,
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["UI/UX", "React", "Ecommerce"],
    link: "https://burger-bytes.example.com"
  }
};

export function generateStaticParams() {
  return Object.keys(works).map((slug) => ({
    slug,
  }));
}

export default function WorksPost({ params }: { params: { slug: string } }) {
  const work = works[params.slug as keyof typeof works];

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button asChild variant="outline" className="pixel-button">
            <Link href="/works">
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to Works
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-grid min-h-screen">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="outline" className="pixel-button mb-8">
            <Link href="/works" className="flex items-center">
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to Works
            </Link>
          </Button>

          <div>
            <h1 className="text-4xl font-bold mb-6">{work.title}</h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary text-foreground px-3 py-1 text-sm font-medium border-2 border-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative h-[400px] w-full mb-8">
              <div className="absolute inset-4 border-4 border-foreground bg-primary/20 z-0"></div>
              <div className="absolute inset-0 pixel-card overflow-hidden">
                <Image
                  src={work.imageUrl}
                  alt={work.title}
                  fill
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </div>

            <PixelSeparator />

            {params.slug === "sertania-online" && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">Technology Stack</h2>
                <TechStackDiagram />
              </div>
            )}

            {params.slug === "sertania-online" ? (
              <div className="mt-8 space-y-4 text-lg leading-relaxed">
                <h2 className="text-2xl font-bold text-foreground">Sertania Online</h2>
                <p>Sertania Online is a custom multiplayer online RPG built on top of open-source technologies, combining deep game mechanics with a fully customized world — from the map and sprites to server logic and web infrastructure.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Server</h3>
                <p><strong className="text-primary">The Forgotten Server 1.4.2</strong><br />The core engine of the game, written in C++. Responsible for all game logic, including monster behavior, NPC interactions, and map loading. Every gameplay mechanic runs through this layer.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Database</h3>
                <p><strong className="text-primary">MySQL</strong><br />Handles all persistent data storage — player accounts, character progression, inventory, and world state. Both the game server and the website communicate directly with this database.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Web &amp; Account System</h3>
                <p><strong className="text-primary">NGINX + MyAcc (Gesior)</strong><br />The website is powered by the open-source MyAcc panel by Gesior, served through NGINX. Players can create accounts, manage characters, and access game information through this interface.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Game Client</h3>
                <p><strong className="text-primary">OTClient by MEHAH</strong><br />The open-source game client used by players to connect to the server. It communicates with The Forgotten Server via <strong className="text-primary">TCP protocol on port 7171</strong>, sending and receiving real-time game packets for movement, combat, chat, and all in-game interactions.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Development Tools</h3>
                <p><strong className="text-primary">RME — Map Editor</strong><br />Used to design and edit the entire game world. Map files are exported directly and loaded by the server.</p>
                <p><strong className="text-primary">Object Builder</strong><br />Used to create and manage all visual assets — sprites and object definitions (.spr / .dat). These files are used by both the server and the client to render the game world correctly.</p>

                <hr className="border-t-2 border-foreground/20 my-4" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Tech Stack</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border-2 border-foreground text-sm">
                    <thead className="bg-primary text-black">
                      <tr>
                        <th className="border border-foreground px-4 py-2 text-left">Layer</th>
                        <th className="border border-foreground px-4 py-2 text-left">Technology</th>
                        <th className="border border-foreground px-4 py-2 text-left">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Game Engine", "TFS 1.4.2 (C++)", "Core game logic"],
                        ["Database", "MySQL", "Data persistence"],
                        ["Web Server", "NGINX", "Serves the website"],
                        ["Website", "MyAcc (Gesior)", "Account management"],
                        ["Game Client", "OTClient (MEHAH)", "Player interface"],
                        ["Map Editing", "RME", "World design"],
                        ["Asset Creation", "Object Builder", "Sprites & objects"],
                      ].map(([layer, tech, role]) => (
                        <tr key={layer} className="border-b border-foreground/30 even:bg-foreground/5">
                          <td className="border border-foreground/30 px-4 py-2">{layer}</td>
                          <td className="border border-foreground/30 px-4 py-2 text-primary font-bold">{tech}</td>
                          <td className="border border-foreground/30 px-4 py-2">{role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg dark:prose-invert mt-8 space-y-6">
                {work.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}

            <PixelSeparator />

            <div className="mt-8 text-center">
              <Button asChild className="pixel-button text-lg py-6">
                <a href={work.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Visit Project
                  <ExternalLinkIcon className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}