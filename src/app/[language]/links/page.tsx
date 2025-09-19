import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Linkedin,
  BookOpen,
  Code,
  Users,
  FileText,
  Instagram,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDictionary } from "@/i18n";
import type { LangMap } from "@/i18n/lang-map";
import { ContactCTA } from "@/components/contact-cta";

export default async function LinksPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/links");

  return (
    <main className="flex-1">
      <HeroSection hero={dictionary.hero} />
      <LinksSection links={dictionary.links} />
        <ContactCTA
        title={dictionary.contact.title}
        subtitle={dictionary.contact.description}
        cat={dictionary.contact.getInTouch}
        imgSrc="/placeholder.svg?height=400&width=600"
      />
    </main>
  );
}

function HeroSection({ hero }: { hero: LangMap["/links"]["hero"] }) {
  return (
    <div className="w-full py-6 md:py-12 bg-muted" id="hero">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-6">
            <div className="mx-auto h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full">
              <Image
                src="/lojhan-photo-home.webp"
                alt="Lojhan"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl">
                {hero.title}
              </h1>
              <p className="max-w-[500px] text-muted-foreground text-sm sm:text-base lg:text-lg">
                {hero.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinksSection({ links }: { links: LangMap["/links"]["links"] }) {
  const linkCategories = [
    {
      title: links.categories.social.title,
      description: links.categories.social.description,
      items: [
        {
          title: "LinkedIn",
          description: links.categories.social.items.linkedin,
          href: "https://linkedin.com/in/lojhan",
          icon: Linkedin,
          external: true,
        },
        {
          title: "GitHub",
          description: links.categories.social.items.github,
          href: "https://github.com/lojhan",
          icon: Github,
          external: true,
        },
        {
          title: "Instagram",
          description: links.categories.social.items.instagram,
          href: "https://instagram.com/lojhan.dev",
          icon: Instagram,
          external: true,
        },
      ],
    },
    {
      title: links.categories.professional.title,
      description: links.categories.professional.description,
      items: [
        {
          title: links.categories.professional.items.blog.title,
          description: links.categories.professional.items.blog.description,
          href: "https://blog.lojhan.com",
          icon: BookOpen,
          external: true,
        },
        {
          title: links.categories.professional.items.mentorship.title,
          description:
            links.categories.professional.items.mentorship.description,
          href: "/mentorship",
          icon: Users,
          external: false,
        },
        {
          title: links.categories.professional.items.consulting.title,
          description:
            links.categories.professional.items.consulting.description,
          href: "/consulting",
          icon: Code,
          external: false,
        },
        {
          title: links.categories.professional.items.content.title,
          description: links.categories.professional.items.content.description,
          href: "/content",
          icon: FileText,
          external: false,
        },
      ],
    },
   
  ];

  return (
    <div className="w-full py-6 md:py-12" id="links">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="space-y-8 md:space-y-12">
          {linkCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4 md:space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl">
                  {category.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {category.description}
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <LinkCard key={itemIndex} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external: boolean;
}

function LinkCard({
  title,
  description,
  href,
  icon: Icon,
  external,
}: LinkCardProps) {
  const CardWrapper = external ? "a" : Link;
  const cardProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <CardWrapper {...cardProps} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                {title}
                {external && (
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-xs sm:text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
