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

function getLanguage() {
  if (typeof window === "undefined") {
    return "pt-BR";
  }

  const languageFromStorage = localStorage.getItem("language");
  if (languageFromStorage) {
    return languageFromStorage;
  }

  const languageFromCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("language="))
    ?.split("=")[1];

  if (languageFromCookie) {
    return languageFromCookie;
  }

  const languageFromPathname = window.location.pathname.split("/")[1];

  if (languageFromPathname === "pt-BR" || languageFromPathname === "en-US") {
    return languageFromPathname;
  }

  const browserLanguage = window.navigator.language;
  const language = browserLanguage.split("-")[0];
  if (language === "pt") {
    return "pt-BR";
  }
  if (language === "en") {
    return "en-US";
  }
  return "pt-BR";
}

type Lang = "pt-BR" | "en-US";
type SetLang = (arg0: Lang) => void;

export function useLanguage(): readonly [Lang, SetLang] {
  if (typeof window === "undefined") {
    return ["pt-BR", () => {}] as const;
  }

  // sync with localStorage :language
  const languageFromStorage = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => getLanguage(),
    () => getLanguage()
  );

  const [language, setLanguage] = useState(languageFromStorage as Lang);
  const pathname = window.location.pathname;
  return [
    language,
    (newLanguage: Lang) => {
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
