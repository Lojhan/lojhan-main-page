import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { Fragment } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { navItems } from "../../nav_items";
import Link from "next/link";

export function SiteHeaderMenu({ children }: { children?: React.ReactNode }) {
  const [language, activePath] = usePathname().split("/").slice(1);

  return (
    <Fragment>
      <DesktopMenu language={language} activePath={activePath} />
      <div className="flex items-center gap-2">
        {children}
        <ThemeToggle className="max-sm:hidden" />
        <LanguageToggle className="max-sm:hidden" x />
        <MobileMenu language={language} activePath={activePath} />
      </div>
    </Fragment>
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
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Toggle menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerTitle className="hidden">header menu</DrawerTitle>
        <DrawerDescription className="hidden">header menu</DrawerDescription>
        <DrawerContent>
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <DrawerClose key={item.href} asChild>
                <Link
                  href={item.href}
                  onClick={() => {}}
                  className={`text-sm font-medium ${
                    item.href.replace("/", "") === (activePath || "")
                      ? "transition-colors hover:text-primary"
                      : "text-muted-foreground transition-colors hover:text-primary"
                  }`}
                >
                  {item.title[language]}
                </Link>
              </DrawerClose>
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
