/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useSyncExternalStore } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function useLanguage() {
  if (typeof window === "undefined") {
    return ["pt-BR", () => {}] as const;
  }

  // sync with localStorage :language
  const languageFromStorage = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => localStorage.getItem("language") || "en-US"
  );

  const [language, setLanguage] = useState(languageFromStorage);
  const pathname = window.location.pathname;
  return [
    language,
    (newLanguage: string) => {
      setLanguage(newLanguage);
      localStorage.setItem("language", newLanguage);
      window.history.pushState(
        {},
        "",
        pathname.replace(/\/[a-z]{2}-[A-Z]{2}/, `/${newLanguage}`)
      );
      window.dispatchEvent(new Event("storage"));
      window.location.reload();
      // set cookie
      document.cookie = `language=${newLanguage}; path=/; max-age=31536000;`;
    },
  ] as const;
}

const flagEmojiMap: Record<string, string> = {
  "en-US": "🇺🇸",
  "pt-BR": "🇧🇷",
};

export function LanguageToggle() {
  const [language, setLanguage] = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {flagEmojiMap[language]}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt-BR")}>
          Português 🇧🇷
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en-US")}>
          English 🇺🇸
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
