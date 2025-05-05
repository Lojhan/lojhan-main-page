import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { ExpertiseCard } from "@/components/expertise-card";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/section-intro";
import { getDictionary } from "@/i18n";
import { LangMap } from "@/i18n/lang-map";
import { default as convert } from "xml-js";

export default async function Home({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutSection about={dictionary.about} />
        <ExpertiseSection expertise={dictionary.expertise} />
        <ServicesSection services={dictionary.services} />
        <BlogSection blog={dictionary.blog} />
        <ContactCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutSection({ about }: { about: LangMap["/"]["about"] }) {
  return (
    <>
      <span className="hidden" id="about" />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {about.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {about.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[600px]:flex-row">
              <Button asChild>
                <Link href="/contact">
                  {about.contact} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/lojhan-photo-home.png"
            width={550}
            height={550}
            alt="Tech Lead"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </Container>
    </>
  );
}

function ExpertiseSection({
  expertise,
}: {
  expertise: LangMap["/"]["expertise"];
}) {
  return (
    <>
      <span className="hidden" id="expertise" />
      <Container className="bg-muted">
        <SectionIntro
          title={expertise.title}
          subtitle={expertise.description}
        />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {expertise.areas.map((expertise, index) => (
            <ExpertiseCard key={index} {...expertise} />
          ))}
        </div>
      </Container>
    </>
  );
}

function ServicesSection({ services }: { services: LangMap["/"]["services"] }) {
  return (
    <>
      <span className="hidden" id="services" />
      <Container>
        <SectionIntro title={services.title} subtitle={services.description} />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          {services.items.map((service) => (
            <Card key={service.title} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {service.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={service.href}>{services.learnMore}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

async function BlogSection({ blog }: { blog: LangMap["/"]["blog"] }) {
  const rssData = await fetch("https://blog.lojhan.com/rss.xml", {
    method: "GET",
    headers: {
      "Content-Type": "application/rss+xml",
    },
  }).then((res) => res.text());

  const json = convert.xml2js(rssData, {
    compact: true,
    alwaysArray: false,
    alwaysChildren: true,
  }) as unknown as {
    rss: {
      channel: {
        item: [
          {
            title: { _cdata: string };
            link: { _text: string };
            description: { _cdata: string };
            category: { _cdata: string }[] | { _cdata: string };
          }
        ];
      };
    };
  };

  const posts = json.rss.channel.item
    .map((p) => ({
      title: p.title._cdata,
      link: p.link._text,
      description: p.description._cdata,
      tags: Array.isArray(p.category)
        ? p.category.map((c) => c._cdata)
        : [p.category._cdata],
    }))
    .slice(0, 3);

  return (
    <>
      <span className="hidden" id="blog" />
      <Container className="bg-muted">
        <SectionIntro title={blog.title} subtitle={blog.description} />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 items-center">
          {posts.map((post) => (
            <Link key={post.title} href={post.link}>
              <Card className="overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt={post.title}
                  className="aspect-video object-cover w-full"
                />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    {post.tags.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="https://blog.lojhan.com">{blog.viewAll}</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}

function ContactCTA() {
  return (
    <>
      <span className="hidden" id="contact" />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="Contact"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s Work Together
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Whether you need mentorship, consulting, or a tech lead for your
                project, I&apos;m here to help you succeed.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[600px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
