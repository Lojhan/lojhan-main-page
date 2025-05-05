import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type ContactCTAProps = {
  title: string;
  subtitle: string;
  cat: string;
  imgSrc: string;
};

export function ContactCTA({ title, subtitle, cat, imgSrc }: ContactCTAProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {title}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[600px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  {cat} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src={imgSrc}
            width={600}
            height={400}
            alt="Call to action"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
