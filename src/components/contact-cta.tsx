import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui/container";

type ContactCTAProps = {
  title: string;
  subtitle: string;
  cat: string;
  imgSrc: string;
  className?: string;
};

export function ContactCTA({
  title,
  subtitle,
  cat,
  className,
}: ContactCTAProps) {
  return (
    <Container id="how-i-can-help-you" className={className}>
      <div className="mx-auto max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 flex flex-col max-sm:px-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          {title}
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          {subtitle}
        </p>
        <div className="flex flex-col gap-2 min-[600px]:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">
              {cat} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
