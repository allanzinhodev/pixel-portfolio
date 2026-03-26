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
    imageUrl: "/capas/sertania.png",
    tags: ["C++", "Game Server", "MMORPG"],
    link: "https://sertania.example.com"
  },
  "pokeai": {
    title: "PokeAI",
    description: "An AI-powered Pokédex that analyzes and generates competitive Pokémon strategies.",
    content: "",
    imageUrl: "/capas/pokeai.png",
    tags: ["AI/ML", "React", "Next.js"],
    link: "https://pokeai.example.com"
  },
  "pixel-art-portfolio": {
    title: "Pixel Art Portfolio",
    description: "A portfolio template for digital artists featuring a pixel art aesthetic.",
    content: "This is a digital portfolio specifically crafted to highlight pixel art and retro aesthetics. It uses custom CSS components and animations to evoke a sense of nostalgia while maintaining modern web standards.",
    imageUrl: "/capas/pixelfolio.gif",
    tags: ["Web Design", "Next.js", "Portfolio"],
    link: "https://github.com/allanzinhodev/pixel-portfolio"
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
            ) : params.slug === "pokeai" ? (
              <div className="mt-8 space-y-4 text-lg leading-relaxed">
                <h2 className="text-2xl font-bold text-foreground">When AI Learns to Play Pokémon: Meet FireredBOT and PokeAI</h2>
                
                <div className="my-8 aspect-video w-full border-4 border-foreground">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/Oeq3j_WG5BQ" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                <p>What if a bot could play Pokémon from start to finish — with zero human intervention? That's exactly the challenge behind two experimental projects: <strong>FireredBOT</strong> and <strong>PokeAI</strong>. Together, they push the boundaries of automation, contextual intelligence, and computational vision applied to classic games.</p>

                <hr className="border-t-2 border-foreground/20 my-6" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">FireredBOT — The Bot That Plays Pokémon FireRed on Its Own</h3>
                <p className="flex items-center space-x-2 text-primary overflow-hidden text-ellipsis whitespace-nowrap">
                  🔗 <a href="https://github.com/allanzinhodev/fireredBOT" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/allanzinhodev/fireredBOT</a>
                </p>

                <p>FireredBOT is a Python-based automation system capable of playing Pokémon FireRed fully autonomously. No direct commands, no human input — the bot makes every decision on its own.</p>

                <h4 className="text-lg font-bold mt-6 mb-2">What it does</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Explores maps automatically using a custom pathfinding system that identifies walkable paths, entrances, exits, and territory boundaries</li>
                  <li>Battles strategically, prioritizing moves based on type effectiveness, base damage, and remaining PP</li>
                  <li>Automatically catches Pokémon, expanding the Pokédex without any human help</li>
                  <li>Manages the inventory and returns to the Pokémon Center whenever needed</li>
                  <li>Reads emulator memory (VBA-RR or mGBA) in real time, tracking HP, player position, wild Pokémon IDs, and game state</li>
                </ul>

                <h4 className="text-lg font-bold mt-6 mb-2">Twitch Integration</h4>
                <p>One of the most creative features is the Twitch API integration: viewers can send commands in the chat and influence the bot's behavior in real time — switching between exploration, catching, battling modes, or even daring the bot to take risks. It's automation with a layer of live interactivity.</p>
                
                <p className="bg-primary/10 p-4 border-l-4 border-primary italic">✅ Goal achieved: the bot works as intended, handles complex tasks, and makes context-aware decisions. The project is complete and will not receive further updates.</p>

                <hr className="border-t-2 border-foreground/20 my-6" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">PokeAI — Pokémon Crystal Automation in Pure Lua</h3>
                <p className="flex items-center space-x-2 text-primary overflow-hidden text-ellipsis whitespace-nowrap">
                  🔗 <a href="https://github.com/allanzinhodev/pokeAI" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/allanzinhodev/pokeAI</a>
                </p>

                <p>PokeAI grew out of the same experiments but took a completely different direction — focused on Pokémon Crystal and rebuilt from scratch in pure Lua, running directly inside the VBA-RR emulator with no Python dependencies.</p>

                <h4 className="text-lg font-bold mt-6 mb-2">A "computational vision" through memory</h4>
                <p>Instead of capturing screenshots or using vision models, PokeAI reads tile offsets directly from the game's RAM, building a real-time representation of the world. This allows the bot to identify:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Collisions, walls, and obstacles</li>
                  <li>Doors and building entrances</li>
                  <li>NPCs and available interactions</li>
                  <li>The current battle menu state (Fight, Pokémon, Pack, Run)</li>
                </ul>

                <h4 className="text-lg font-bold mt-6 mb-2">System features</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adaptive navigation with natural obstacle avoidance</li>
                  <li>Automatic Pokémon catching system</li>
                  <li>Automatic Pokémon and move switching in battle</li>
                  <li>Anti-freeze systems to keep the bot running smoothly</li>
                  <li>Battle intelligence script for wild encounters and trainer fights</li>
                  <li>Modular Lua architecture: <code className="bg-foreground/10 px-1 py-0.5 rounded text-sm font-mono">main.lua</code>, <code className="bg-foreground/10 px-1 py-0.5 rounded text-sm font-mono">battle.lua</code>, <code className="bg-foreground/10 px-1 py-0.5 rounded text-sm font-mono">move.lua</code>, <code className="bg-foreground/10 px-1 py-0.5 rounded text-sm font-mono">map.lua</code></li>
                </ul>

                <p className="bg-green-500/10 p-4 border-l-4 border-green-500 italic mt-4">The project is in active experimental phase, and future improvements may include OCR, neural networks, or Python reintegration for more complex analysis. You can follow the development live on <a href="https://twitch.tv/allaorodrigues" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">twitch.tv/allaorodrigues</a>.</p>

                <hr className="border-t-2 border-foreground/20 my-6" />

                <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-1">Why These Projects Matter</h3>
                <p>Beyond being fascinating projects in their own right, FireredBOT and PokeAI showcase concepts with real-world applications: memory reading and manipulation, contextual decision systems, pathfinding, complex task automation, and live platform integration. They are educational experiments that show how software engineering can turn a nostalgic game into an AI laboratory.</p>

                <div className="mt-8 p-4 border-2 border-foreground text-center bg-foreground/5 text-sm sm:text-base">
                  <p>Developed by Allan Rodrigues — <a href="https://linkedin.com/in/allanzinho" className="text-primary hover:underline break-all" target="_blank" rel="noopener noreferrer">linkedin.com/in/allanzinho</a></p>
                  <p>Watch it live at <a href="https://twitch.tv/allaorodrigues" className="text-primary hover:underline break-all" target="_blank" rel="noopener noreferrer">twitch.tv/allaorodrigues</a></p>
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