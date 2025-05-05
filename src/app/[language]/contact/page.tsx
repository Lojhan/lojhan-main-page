import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SiteFooter } from "@/components/site-footer";
import { Octokit } from "octokit";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n";
import { LangMap } from "@/i18n/lang-map";
async function createGithubIssue(formData: FormData) {
  "use server";
  const issueSubject = formData.get("subject")!.toString();
  const issueBody = formData.get("message")!.toString();
  const issueName = formData.get("name")!.toString();
  const issueEmail = formData.get("email")!.toString();

  const issueBodyContent = `## Contact Form Submission
  **Name:** ${issueName}
  **Email:** ${issueEmail}
  **Message:** ${issueBody}`;

  const issueTitleContent = `[${issueSubject}] Contact Form Submission from ${issueName}`;

  const clientSecret = process.env.GITHUB_TOKEN;

  const octokit = new Octokit({
    auth: clientSecret,
  });

  await octokit.rest.issues.create({
    owner: "Lojhan",
    repo: "lojhan-contact-issues",
    title: issueTitleContent,
    body: issueBodyContent,
    labels: [issueSubject],
  });
}

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
        <Container>
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
    <>
      <span className="hidden" id="about" />
      <Container className="bg-muted">
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
    </>
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
      <span className="hidden" id="contact-info" />
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

function ContactFormSection({
  contactMe,
}: {
  contactMe: LangMap["/contact"]["contactMe"];
}) {
  const { email, message, subject, name, ...contactForm } =
    contactMe.contactForm;
  return (
    <>
      <span className="hidden" id="contact-form" />
      <Card>
        <CardHeader>
          <CardTitle>{contactForm.title}</CardTitle>
          <CardDescription>{contactForm.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={createGithubIssue}>
            <div className="grid gap-2">
              <Label htmlFor="name">{name.label}</Label>
              <Input id="name" name="name" placeholder={name.placeholder} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{email.label}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">{subject.label}</Label>
              <Select name="subject" defaultValue={subject.options[0].value}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder={subject.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {subject.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">{message.label}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder={message.placeholder}
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full">
              {contactForm.sendMessage}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
