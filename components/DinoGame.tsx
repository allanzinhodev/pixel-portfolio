"use client";

import dynamic from "next/dynamic";
import "react-chrome-dino-ts/index.css";

// The Chrome Dino requires window/document to work, so we import it dynamically
// disabling Server-Side Rendering (SSR).
const DinoGameComponent = dynamic(() => import("react-chrome-dino-ts").then(mod => mod.default), {
  ssr: false,
});

export function DinoGame() {
  return (
    <div className="flex items-center justify-center min-h-[600px] bg-neutral-100 dark:bg-neutral-900 w-full rounded-none">
      <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl border-2 border-primary">
        <h2 className="text-3xl font-bold text-center mb-4 text-black dark:text-white">🦕 T-Rex Game</h2>
        
        <p className="text-center mb-8 text-neutral-600 dark:text-neutral-400">
          Pressione <kbd className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md font-mono text-sm mx-1 text-black dark:text-white">Espaço</kbd> para pular
        </p>

        <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white w-full flex justify-center py-6 md:py-10">
          <DinoGameComponent />
        </div>
      </div>
    </div>
  );
}
