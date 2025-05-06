"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./Logo";

interface NavItem {
  title: { [language: string]: string };
  href: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  {
    title: {
      "pt-BR": "Início",
      "en-US": "Home",
    },
    href: "/",
  },
  {
    title: {
      "pt-BR": "Blog",
      "en-US": "Blog",
    },
    href: "https://blog.lojhan.com",
  },
  {
    title: {
      "pt-BR": "Mentoria",
      "en-US": "Mentorship",
    },
    href: "/mentorship",
  },
  {
    title: {
      "pt-BR": "Consultoria",
      "en-US": "Consulting",
    },
    href: "/consulting",
  },
  {
    title: {
      "pt-BR": "Contato",
      "en-US": "Contact",
    },
    href: "/contact",
  },
];

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, activePath] = usePathname().split("/").slice(1);

  useEffect(() => {
    const handleDocumentScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("scroll", handleDocumentScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener("scroll", handleDocumentScroll);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto flex h-16 items-center justify-between min-w-[300px]">
        <Link
          href="/"
          aria-label={navItems[0].title[language]}
          className="flex items-center gap-2 font-bold text-xl"
        >
          <Logo.DarkArrows
            width={100}
            className="dark:[&_path]:fill-[#EAF5FC] light:[&_path]:fill-[#121F2B]"
          />
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.title[language]}
              className={`text-sm font-medium ${
                item.href.replace("/", "") === (activePath || "")
                  ? "transition-colors hover:text-primary"
                  : "text-muted-foreground transition-colors hover:text-primary"
              }`}
            >
              {item.title[language]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {children}
          <ThemeToggle />
          <LanguageToggle />
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
            {menuOpen && (
              <div className="absolute top-16 left-0 w-full bg-background shadow-md">
                <nav className="flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-sm font-medium ${
                        item.href.replace("/", "") === (activePath || "")
                          ? "transition-colors hover:text-primary"
                          : "text-muted-foreground transition-colors hover:text-primary"
                      }`}
                    >
                      {item.title[language]}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
