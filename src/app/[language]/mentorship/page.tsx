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
import { ContactCTA } from "@/components/contact-cta";
import { SectionIntro } from "@/components/section-intro";
import { ExpertiseCard } from "@/components/expertise-card";
import { Container } from "@/components/ui/container";
import { FAQSection } from "@/components/faq-section";
import { getDictionary } from "@/i18n";
import type { LangMap } from "@/i18n/lang-map";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EngagementSection } from "@/components/engagement-methods";

export default async function MentorshipPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/mentorship");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutSection about={dictionary.about} />
        <HowICanHelpYouSection expertise={dictionary.expertise} />
        <MentorshipPlansSection mentorshipPlans={dictionary.mentorshipPlans} />
        <SuccessStoriesSection successStories={dictionary.successStories} />
        <span className="hidden" id="frequently-asked-questions" />
        <FAQSection
          className="bg-muted"
          title={dictionary.faq.title}
          subtitle={dictionary.faq.description}
          questions={dictionary.faq.items}
        />
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

function AboutSection({ about }: { about: LangMap["/mentorship"]["about"] }) {
  return (
    <Container id="how-i-can-help-you" className="bg-muted relative">
      <Image
        src="/background_1_extended.webp"
        alt="Mentorship Hero"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-transparent" />
      <div className="relative z-10">
        <div className="mx-auto max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 flex flex-col max-sm:px-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            {about.title}
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            {about.description}
          </p>
          <div className="flex flex-col gap-2 min-[600px]:flex-row">
            <Button asChild size="lg">
              <Link href="#plans">
                {about.exploreMentorshipPlans}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/contact">{about.requestMentorship}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

function HowICanHelpYouSection({
  expertise,
}: {
  expertise: LangMap["/consulting"]["expertise"];
}) {
  return (
    <Container id="how-i-can-help-you">
      <SectionIntro title={expertise.title} subtitle={expertise.description} />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {expertise.areas.map((expertise) => (
          <ExpertiseCard {...expertise} key={expertise.title} />
        ))}
      </div>
    </Container>
  );
}

const MentorshipPlansSection = ({
  mentorshipPlans,
}: {
  mentorshipPlans: LangMap["/mentorship"]["mentorshipPlans"];
}) => <EngagementSection {...mentorshipPlans} id="plans" />;

function SuccessStoriesSection({
  successStories,
}: {
  successStories: LangMap["/mentorship"]["successStories"];
}) {
  return (
    <Container id="success-stories">
      <SectionIntro
        title={successStories.title}
        subtitle={successStories.description}
      />
      <div
        className={cn(
          "mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {successStories.items.map((item) => (
          <SuccessStoryCase key={item.name} story={item} />
        ))}
      </div>
    </Container>
  );
}

function SuccessStoryCase({
  story,
}: {
  story: LangMap["/mentorship"]["successStories"]["items"][number];
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="cursor-pointer transition-transform hover:scale-[1.01]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Image
                src={story.photoUrl}
                width={60}
                height={60}
                alt={story.name}
                className="rounded-full object-contain object-center"
              />
              <div>
                <CardTitle className="text-lg text-left">
                  {story.name}
                </CardTitle>
                <CardDescription className="text-left">
                  {story.role}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex bottom-0">
            <p className="text-sm text-muted-foreground text-left line-clamp-3">
              {story.feedback}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-4">
          <Image
            src={story.photoUrl}
            width={60}
            height={60}
            alt={story.name}
            className="rounded-full object-contain object-center"
          />
          <div>
            <CardTitle className="text-lg text-left">{story.name}</CardTitle>
            <CardDescription className="text-left">
              {story.role}
            </CardDescription>
          </div>
        </DialogHeader>
        <DialogDescription className="whitespace-break-spaces">
          {story.feedback.replaceAll(
            "\n",
            `

`
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
