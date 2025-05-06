import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section
      id={id}
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
    >
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}
