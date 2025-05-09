import { Mail, MapPin, Phone } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n";
import { LangMap } from "@/i18n/lang-map";
import { ContactFormSection } from "./form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ language: "en-US" | "pt-BR" }>;
}) {
  const { language } = await params;
  const dictionary = await getDictionary(language, "/contact");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutSection about={dictionary.about} />
        <Container id="contact-form">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <ContactInfoSection contactMe={dictionary.contactMe} />
            <ContactFormSection contactMe={dictionary.contactMe} />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutSection({ about }: { about: LangMap["/contact"]["about"] }) {
  return (
    <Container className="bg-muted" id="about">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            {about.getInTouch}
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {about.description}
          </p>
        </div>
      </div>
    </Container>
  );
}

function ContactInfoSection({
  contactMe,
}: {
  contactMe: LangMap["/contact"]["contactMe"];
}) {
  const { contactInfo } = contactMe;
  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            {contactMe.letsConnect}
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {contactMe.description}
          </p>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="p-4 flex flex-row items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-base">{contactInfo.email}</CardTitle>
                <CardDescription>{contactInfo.emailValue}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4 flex flex-row items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-base">{contactInfo.phone}</CardTitle>
                <CardDescription>{contactInfo.phoneValue}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4 flex flex-row items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-base">
                  {contactInfo.location}
                </CardTitle>
                <CardDescription>{contactInfo.locationValue}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
