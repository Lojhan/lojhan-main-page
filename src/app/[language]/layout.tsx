import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { GlobalSearchServer } from "@/components/global-search-server";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const metaMap = {
  "pt-BR": {
    title: "Lojhan - Tech Lead, Mentor e Consultor",
    description:
      "Tech Lead, Mentor e Consultor. Ajudo empresas a alcançarem seus objetivos através de soluções tecnológicas inovadoras.",
  },
  "en-US": {
    title: "Lojhan - Tech Lead Specialist, Mentor, and Consultant",
    description:
      "Tech Lead Specialist, Mentor, and Consultant. I help companies achieve their goals through innovative technological solutions.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}): Promise<Metadata> {
  const { language } = await params;
  const metadata = metaMap[language ?? "pt-BR"];
  return {
    ...metadata,
    creator: "Lojhan",
    applicationName: metadata.title,

    category: "technology",

    keywords: [
      "vinicius",
      "lojhan",
      "vinicius lojhan",
      "tech lead",
      "software engineer",
      "software architect",
      "mentor",
      "consultant",

      "mentoring",
      "technology mentoring",
      "software development mentoring",
      "software architecture mentoring",
      "leadership mentoring",

      "mentoria de tecnologia",
      "mentoria de desenvolvimento de software",
      "mentoria de arquitetura de software",
      "mentoria de liderança",

      "consulting",
      "technology consulting",
      "software development consulting",
      "software architecture consulting",
      "leadership consulting",

      "consultoria",
      "consultoria de tecnologia",
      "consultoria de desenvolvimento de software",
      "consultoria de arquitetura de software",
      "consultoria de liderança",

      "technology",
      "software",
      "software engineering",
      "software development",
      "software architecture",
      "leadership",
      "innovation",
    ],

    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },

    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: "https://www.lojhan.com",
      siteName: metadata.title,
      images: [
        {
          url: "https://www.lojhan.com/lojhan-photo-home.png",
          width: 1200,
          height: 630,
          alt: "Lojhan - Tech Lead, Mentor e Consultor",
        },
      ],
    },
    alternates: {
      canonical: "https://www.lojhan.com/pt-BR",
      languages: {
        "en-US": "https://www.lojhan.com/en-US",
        "pt-BR": "https://www.lojhan.com/pt-BR",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    language: "en-US" | "pt-BR";
  }>;
}>) {
  const { language } = await params;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader>
            <GlobalSearchServer language={language} />
          </SiteHeader>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
