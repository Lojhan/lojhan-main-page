export interface NavItem {
  title: { [language: string]: string };
  href: string;
  isActive?: boolean;
}

export const navItems: NavItem[] = [
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
      "pt-BR": "Conteúdos",
      "en-US": "Content",
    },
    href: "/content",
  },
  {
    title: {
      "pt-BR": "Contato",
      "en-US": "Contact",
    },
    href: "/contact",
  },
];
