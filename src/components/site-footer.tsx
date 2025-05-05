import Link from "next/link";

const links = [
  {
    title: "GitHub",
    href: "https://www.github.com/lojhan",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/lojhan/",
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Lojhan. All rights reserved.
        </p>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
