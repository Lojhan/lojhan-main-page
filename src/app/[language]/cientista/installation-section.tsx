"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function InstallationSection({ title }: { title: string }) {
  const [packageManager, setPackageManager] = useState<
    "npm" | "pnpm" | "yarn" | "bun"
  >("npm");

  const installCommands = {
    npm: "npm install cientista",
    pnpm: "pnpm add cientista",
    yarn: "yarn add cientista",
    bun: "bun add cientista",
  };

  return (
    <div className="overflow-hidden rounded-lg border border-muted-foreground/20 h-min">
      <div className="bg-slate-900 px-6 py-3 border-b border-slate-700 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <div className="flex gap-2">
          {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
            <button
              type="button"
              key={pm}
              onClick={() => setPackageManager(pm)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                packageManager === pm
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      <SyntaxHighlighter
        language="bash"
        style={atomOneDark}
        customStyle={{
          padding: "1.5rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          backgroundColor: "#0d1117",
        }}
      >
        {installCommands[packageManager]}
      </SyntaxHighlighter>
    </div>
  );
}
