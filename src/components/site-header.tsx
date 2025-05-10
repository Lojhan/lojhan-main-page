"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SiteHeaderMenu } from "./site-header-menu";
import { navItems } from "../../nav_items";

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const [language, activePath] = usePathname().split("/").slice(1);

  // after some scroll, hide the header
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(
    typeof window === "undefined" ? 0 : window?.scrollY,
  );

  useEffect(() => {
    if (!activePath?.includes("content")) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setIsVisible(!isScrollingDown);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activePath, lastScrollY]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isVisible ? "translate-y-0" : "-translate-y-full",
        "transition-all duration-100 ease-in-out",
      )}
    >
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
        <SiteHeaderMenu>{children}</SiteHeaderMenu>
      </div>
    </header>
  );
}
