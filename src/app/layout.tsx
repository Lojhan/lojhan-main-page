import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

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
  params: { language: "en-US" | "pt-BR" };
}): Promise<Metadata> {
  const { language } = params;
  const metadata = metaMap[language ?? "pt-BR"];
  return {
    ...metadata,
    creator: "Lojhan",
    applicationName: "Lojhan",

    category: "technology",

    keywords: [
      "lojhan",
      "tech lead",
      "mentor",
      "consultant",
      "software engineer",
      "technology",
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
      siteName: "Lojhan",
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
      canonical: "https://www.lojhan.com",
      languages: {
        "en-US": "/en-US",
        "pt-BR": "/pt-BR",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
