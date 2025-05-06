import { SectionIntro } from "./section-intro";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Container } from "./ui/container";

export type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title: string;
  subtitle: string;
  questions: readonly FAQ[];
  className?: string;
};

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Have a question? We have answers.",
  questions = [],
  className = "",
}: FAQSectionProps) {
  return (
    <Container className={className} id="faq">
      <SectionIntro title={title} subtitle={subtitle} />
      <div className="mx-auto grid max-w-5xl gap-8 py-12">
        {questions.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
