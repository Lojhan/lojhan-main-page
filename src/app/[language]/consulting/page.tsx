import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { SectionIntro } from "@/components/section-intro";
import { Container } from "@/components/ui/container";
import { ExpertiseCard } from "@/components/expertise-card";
import { FAQSection } from "@/components/faq-section";
import { ContactCTA } from "@/components/contact-cta";
import { getDictionary } from "@/i18n";
import type { LangMap } from "@/i18n/lang-map";
import { EngagementSection } from "@/components/engagement-methods";

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/consulting");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutSection about={dictionary.about} />
        <ExpertiseSection expertise={dictionary.expertise} />
        <EngagementModelsSection
          engagementModels={dictionary.engagementModels}
        />
        {/* <ContactSuccessStoriesSection /> */}
        <FAQSection
          title={dictionary.faq.title}
          subtitle={dictionary.faq.description}
          questions={dictionary.faq.items}
          // className="bg-muted"
        />
        <span className="hidden" id="contact" />
        <ContactCTA
          className="bg-muted"
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

function AboutSection({ about }: { about: LangMap["/consulting"]["about"] }) {
  return (
    <Container className="bg-muted" id="about">
      <div className="mx-auto max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 flex flex-col max-sm:px-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          {about.title}
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          {about.description}
        </p>
        <div className="flex flex-col gap-2 min-[600px]:flex-row">
          <Button asChild size="lg">
            <Link href="#engagement-models">
              {about.exploreServices} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">{about.requestConsultation}</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

function ExpertiseSection({
  expertise,
}: {
  expertise: LangMap["/consulting"]["expertise"];
}) {
  return (
    <Container id="consulting-services">
      <SectionIntro title={expertise.title} subtitle={expertise.description} />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {expertise.areas.map((expertise) => (
          <ExpertiseCard key={expertise.title} {...expertise} />
        ))}
      </div>
    </Container>
  );
}

const EngagementModelsSection = ({
  engagementModels,
}: {
  engagementModels: LangMap["/consulting"]["engagementModels"];
}) => <EngagementSection {...engagementModels} id="engagement-models" />;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ContactSuccessStoriesSection() {
  return (
    <Container id="client-success-stories">
      <SectionIntro
        title="Client Success Stories"
        subtitle="Real results from our consulting engagements."
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Image
              src="/placeholder-logo.svg"
              width={120}
              height={60}
              alt="Client Logo"
              className="mb-4"
            />
            <CardTitle>E-commerce Platform Optimization</CardTitle>
            <CardDescription>Fintech Startup</CardDescription>
          </CardHeader>
          <div className="flex-col">
            <CardContent className="flex-1/3">
              <p className="text-sm text-muted-foreground">
                &quot;We were experiencing significant performance issues during
                peak traffic. The architecture review and optimization
                recommendations reduced our server load by 70% and cut response
                times in half.&quot;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="font-medium">Results:</div>
                <div className="text-sm text-muted-foreground">
                  70% reduced server load, 50% faster response times
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <Image
              src="/placeholder-logo.svg"
              width={120}
              height={60}
              alt="Client Logo"
              className="mb-4"
            />
            <CardTitle>Microservices Migration</CardTitle>
            <CardDescription>Enterprise SaaS Company</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              &quot;Our monolithic application was becoming unmaintainable. The
              consulting engagement provided a clear migration strategy to
              microservices that minimized disruption while enabling our team to
              ship features faster.&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="font-medium">Results:</div>
              <div className="text-sm text-muted-foreground">
                40% faster deployment cycles, improved team autonomy
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Image
              src="/placeholder-logo.svg"
              width={120}
              height={60}
              alt="Client Logo"
              className="mb-4"
            />
            <CardTitle>Database Optimization</CardTitle>
            <CardDescription>Healthcare Analytics Platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              &quot;Our analytics queries were taking minutes to complete. After
              the database optimization engagement, the same queries now
              complete in seconds, dramatically improving our user
              experience.&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="font-medium">Results:</div>
              <div className="text-sm text-muted-foreground">
                95% reduction in query times, improved data scalability
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Image
              src="/placeholder-logo.svg"
              width={120}
              height={60}
              alt="Client Logo"
              className="mb-4"
            />
            <CardTitle>Development Process Improvement</CardTitle>
            <CardDescription>Media Technology Company</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              &quot;Our development process was chaotic, with frequent bugs
              making it to production. The consulting engagement helped us
              implement CI/CD, automated testing, and code review processes that
              dramatically improved our code quality.&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="font-medium">Results:</div>
              <div className="text-sm text-muted-foreground">
                80% reduction in production bugs, faster release cycles
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
