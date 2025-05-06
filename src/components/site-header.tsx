"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./Logo";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
import { Menu } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";

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
  const [language, activePath] = usePathname().split("/").slice(1);
  const isMobile = useIsMobile();

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
            className="dark:[&_path]:fill-[#EAF5FC] light:[&_path]:fill-[#121F2B] mx-4"
          />
        </Link>
        <DesktopMenu language={language} activePath={activePath} />

        <div className="flex items-center gap-2">
          {children}
          {isMobile ? null : <ThemeToggle />}
          {isMobile ? null : <LanguageToggle />}
          <MobileMenu language={language} activePath={activePath} />
        </div>
      </div>
    </header>
  );
}

function DesktopMenu({
  language,
  activePath,
}: {
  language: string;
  activePath: string;
}) {
  return (
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
  );
}

function MobileMenu({
  language,
  activePath,
}: {
  language: string;
  activePath: string;
}) {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Toggle menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {}}
                className={`text-sm font-medium ${
                  item.href.replace("/", "") === (activePath || "")
                    ? "transition-colors hover:text-primary"
                    : "text-muted-foreground transition-colors hover:text-primary"
                }`}
              >
                <DrawerClose>{item.title[language]}</DrawerClose>
              </Link>
            ))}
          </div>

          <DrawerFooter>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
