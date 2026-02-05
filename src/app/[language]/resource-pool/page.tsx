import { CheckCircle, Code2, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/section-intro";
import { ContactCTA } from "@/components/contact-cta";
import { InstallationSection } from "@/components/installation-section";
import { getDictionary } from "@/i18n";
import type { LangMap } from "@/i18n/lang-map";
import { CodeExampleSection as Code } from "./code-example-section";

export default async function ResourcePoolPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/resource-pool");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection dictionary={dictionary} />
        <FeaturesSection features={dictionary.features} />
        <APISection api={dictionary.api} />
        <ContactCTA
          title={dictionary.contact.title}
          subtitle={dictionary.contact.description}
          cat={dictionary.contact.getInTouch}
          imgSrc="/placeholder.svg?height=400&width=600"
        />
      </main>
      <SiteFooter />
    </div>
  );
}

function HeroSection({ dictionary }: { dictionary: LangMap["/resource-pool"] }) {
  return (
    <Container
      className="bg-gradient-to-b from-muted/60 to-background md:py-0 lg:py-0"
      id="hero"
    >
      <div className="mx-auto max-w-5xl py-20 md:py-32 flex flex-col gap-8 max-sm:px-2">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Code2 className="h-4 w-4" />
            <span>{dictionary.hero.badge}</span>
          </div>
          <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none">
            {dictionary.hero.title}{" "}
            <span className="text-primary">{dictionary.hero.highlight} 🚀</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            {dictionary.hero.description}
          </p>
          <CodeExampleSection example={dictionary.example} />
        </div>
      </div>
    </Container>
  );
}

function FeaturesSection({
  features,
}: {
  features: LangMap["/resource-pool"]["features"];
}) {
  const featureIcons = [Zap, CheckCircle, Shield, Code2];

  return (
    <Container id="features" className="md:py-0 lg:py-0">
      <SectionIntro title={features.title} subtitle={features.subtitle} />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
        {features.items.map((feature, index) => {
          const Icon = featureIcons[index] ?? Zap;
          return (
            <Card key={feature.title} className="border-muted-foreground/20">
              <CardHeader>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

function CodeExampleSection({
  example,
}: {
  example: LangMap["/resource-pool"]["example"];
}) {
  return (
    <div className="flex flex-col gap-8 max-sm:mt-8 mt-16">
      <InstallationSection title={example.installationTitle} packageName="@lojhan/resource-pool" />
      <Code example={example} />
    </div>
  );
}

function APISection({ api }: { api: LangMap["/resource-pool"]["api"] }) {
  return (
    <Container id="api" className="bg-muted/50">
      <SectionIntro title={api.title} subtitle={api.subtitle} />
      <div className="mx-auto max-w-5xl py-12">
        <div className="space-y-4">
          {api.items.map((apiItem) => (
            <div
              key={apiItem.method}
              className="flex flex-col gap-2 rounded-lg border border-muted-foreground/20 bg-background p-6"
            >
              <code className="text-sm font-mono font-semibold text-primary">
                {apiItem.method}
              </code>
              <p className="text-sm text-muted-foreground">
                {apiItem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
