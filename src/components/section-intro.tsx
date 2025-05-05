type SectionIntroProps = {
  title: string;
  subtitle: string;
};

export function SectionIntro({ title, subtitle }: SectionIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
