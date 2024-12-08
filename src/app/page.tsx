import { Logo } from "@/components/Logo";
import { Typography } from "./typography";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="container place-self-center h-[100vh] grid grid-cols-1 items-center">
      <HomeLogo />
      <Typography.Span className={cn("text-center")}>
        Under construction
      </Typography.Span>
    </main>
  );
}

const HomeLogo = () => (
  <Logo.WhiteGreenArrowsSubtitle
    className={cn(
      "place-self-center",
      "w-[80%]",
      "md:w-1/2",
      "lg:w-1/3",
      "xl:w-1/4",
    )}
  />
);
