import { CheckCircle, Code2, Shield, Wrench, Zap } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/section-intro";
import { ContactCTA } from "@/components/contact-cta";
import { getDictionary } from "@/i18n";
import type { LangMap } from "@/i18n/lang-map";
import { InstallationSection } from "./installation-section";

export default async function CientistaPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/cientista");

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

function HeroSection({ dictionary }: { dictionary: LangMap["/cientista"] }) {
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
            <span className="text-primary">{dictionary.hero.highlight} 🧪</span>
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
  features: LangMap["/cientista"]["features"];
}) {
  const featureIcons = [Zap, Wrench, Shield, CheckCircle];

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
  example: LangMap["/cientista"]["example"];
}) {
  const codeString = `import { Cientista } from 'cientista';

// Define base implementation
function fibonacciBase(n: number): number {
  if (n <= 1) return n;
  return fibonacciBase(n - 1) + fibonacciBase(n - 2);
}

// Define optimized implementation
function fibonacciOptimized(n: number): number {
  let a = 0, b = 1, f = 1;
  for (let i = 2; i <= n; i++) {
    f = a + b;
    [a, b] = [b, f];
  }
  return f;
}

// Create experiment
const experiment = new Cientista(fibonacciBase, "Fibonacci");
experiment.withTest('optimized', fibonacciOptimized);

// Handle results
experiment.onSuccess((key, result) => {
  console.log(\`\${key}: \${result}\`);
});

experiment.onError((key, error) => {
  console.error(\`Error in \${key}: \${error}\`);
});

// Run the experiment
await experiment.run(10);`;

  return (
    <div className="flex flex-col gap-8 max-sm:mt-8 mt-16">
      <InstallationSection title={example.installationTitle} />

      {/* Code Example */}
      <div className="overflow-hidden rounded-lg border border-muted-foreground/20">
        <div className="bg-slate-900 px-6 py-3 border-b border-slate-700">
          <span className="text-sm font-medium text-slate-400">
            {example.codeFileName}
          </span>
        </div>
        <SyntaxHighlighter
          language="typescript"
          style={atomOneDark}
          customStyle={{
            padding: "1.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            backgroundColor: "#0d1117",
          }}
          wrapLines
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function APISection({ api }: { api: LangMap["/cientista"]["api"] }) {
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
